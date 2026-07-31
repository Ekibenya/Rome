/* ============================================================================
   罗马纪 · 酒馆前端垫片
   ----------------------------------------------------------------------------
   目标是「一模一样」，所以这里不改应用的任何一行：主文档、引擎、棋子模块、
   three 全都照原样从 CDN 取，跑的是与线上同一份文件。整份移植的改动量就是这个
   文件——它只做三件事，全部落在 window.fetch 这一个拦截点上：

     1) 神谕请求  发往 <API.base>/chat/completions 的那一发，转给酒馆的
        TavernHelper.generateRaw，再把回复重新封装成 OpenAI 的 SSE 流交回去。
        应用那边 oracleCall 里的续写、空闲看门狗、中断、去重一整套原样生效——
        它根本不知道换了后端。
     2) 资材请求  整包 29.3MB 换成取五个压缩块，当场拼回与原档逐字节相同的字节。
        引擎拿到手的东西跟以前完全一致，所以引擎不用动。
     3) 接线状态  预填 API 三件套，让 apiReady() 为真，走的还是原来的流程。

   跑在酒馆助手的角色脚本里：脚本 content 是 JS，注入进一个带 jQuery 与
   TavernHelper 桥的常驻隐藏 iframe。本文件由那个脚本注入进游戏 iframe。
   ============================================================================ */
(function () {
  'use strict';

  var CFG = window.__ROMA_ST__ || {};
  var BASE = CFG.base || '';                       /* CDN 根，末尾带斜杠 */
  /* 桥不靠注入，自己沿父链往上找：本文档是 srcdoc，与酒馆同源，
     而脚本 iframe 与游戏 iframe 谁先跑不好保证，注入式会有竞态。
     层级是 游戏iframe → 脚本iframe → 酒馆主窗，最多走三层。 */
  function upfind(pick) {
    var w = window;
    for (var i = 0; i < 6; i++) {
      try { var v = pick(w); if (v) return v; } catch (_) { }
      if (w.parent === w) break;
      w = w.parent;
    }
    return null;
  }
  function helper() { return CFG.helper || upfind(function (w) { return w.TavernHelper; }); }
  function events() {
    if (CFG.events) return CFG.events;
    var w = upfind(function (w) { return w.eventOn ? w : null; });
    return w ? { on: w.eventOn.bind(w), off: (w.eventRemoveListener || w.eventOff || function () { }).bind(w) } : null;
  }
  function ievents() {
    return CFG.iframe_events || upfind(function (w) { return w.iframe_events; }) || {
      STREAM_TOKEN_RECEIVED_INCREMENTALLY: 'js_stream_token_received_incrementally',
      STREAM_TOKEN_RECEIVED_FULLY: 'js_stream_token_received_fully',
      GENERATION_ENDED: 'js_generation_ended',
      GENERATION_STARTED: 'js_generation_started',
    };
  }
  var PACKS = CFG.packs || null;                   /* 压缩块清单，没有就走原档 */
  var KEY = CFG.key || '';                         /* 资材异或密钥 */

  /* ------------------------------------------------- 卡内嵌入资材（自包含） ---
     资材与三维引擎以 base64 存在角色卡 data.extensions.roma_assets 里
     （ST 对不认识的 extensions 字段原样保留、也不入提示词）。
     取数路径：先嵌入、后网络——墙内玩家没有 jsDelivr 也能出三维。 */
  var EMB = null;
  function embed() {
    if (EMB !== null) return EMB;
    EMB = false;
    try {
      var top = window, i = 0;
      for (; i < 8 && top.parent && top.parent !== top; i++) top = top.parent;
      var ctx = top.SillyTavern && top.SillyTavern.getContext && top.SillyTavern.getContext();
      if (!ctx || !ctx.characters) return EMB;
      var byId = ctx.characterId != null ? ctx.characters[ctx.characterId] : null;
      var cand = [byId].concat(ctx.characters).filter(Boolean);
      for (var j = 0; j < cand.length; j++) {
        var d = cand[j] && cand[j].data;
        if (d && d.extensions && d.extensions.roma_assets) { EMB = d.extensions.roma_assets; break; }
      }
    } catch (_) { }
    if (EMB) log('卡内嵌入资材已接上', Object.keys(EMB.packs || {}).length + ' 包 / '
                 + Object.keys(EMB.engines || {}).length + ' 引擎');
    return EMB;
  }
  function b64bytes(b64) {
    return fetch('data:application/octet-stream;base64,' + b64)
      .then(function (r) { return r.arrayBuffer(); });
  }
  var log = function () { try { console.log.apply(console, ['[roma·st]'].concat([].slice.call(arguments))); } catch (_) { } };

  /* --------------------------------------------- PNG 数据块直供（v0.0.8） ---
     二进制资材塞进 JSON 要连过两层 base64，白付 78% 的编码税。改为把它们作为
     roMa 私有 ancillary 块附在角色卡 PNG 本体里（PNG 阅览器一律无视私有块，
     封面显示不受影响），运行时把这张卡自己的头像文件取回来按块拆开。
     块载荷：'RMA1' + uint16 名长 + 名(utf8) + 数据。
     遇到会剥私有块的酒馆分叉：取不到就静默落回 CDN——行为等同标准版，不黑屏。 */
  var PNGA = null;                     /* false=不可用；Promise/对象={名:Uint8Array} */
  function avatarUrl() {
    try {
      var top = window, i = 0;
      for (; i < 8 && top.parent && top.parent !== top; i++) top = top.parent;
      var ctx = top.SillyTavern && top.SillyTavern.getContext && top.SillyTavern.getContext();
      if (!ctx || !ctx.characters) return null;
      var byId = ctx.characterId != null ? ctx.characters[ctx.characterId] : null;
      var cand = [byId].concat(ctx.characters).filter(Boolean);
      /* 文档头上有 <base href=CDN>，根相对路径会被解析到 CDN 去——
         必须拼酒馆主窗的绝对 origin。 */
      var org = '';
      try { org = top.location.origin || ''; } catch (_) { }
      if (!/^http/.test(org)) return null;
      for (var j = 0; j < cand.length; j++) {
        var c = cand[j], d = c && c.data;
        if (d && d.extensions && d.extensions.roma_assets && c.avatar)
          return org + '/characters/' + String(c.avatar).split('/').map(encodeURIComponent).join('/');
      }
    } catch (_) { }
    return null;
  }
  function parsePngChunks(ab) {
    var u = new Uint8Array(ab), dv = new DataView(ab);
    if (u.length < 8 || u[0] !== 0x89 || u[1] !== 0x50) return null;   /* 非 PNG */
    var off = 8, map = {}, dec = new TextDecoder(), hit = 0;
    while (off + 12 <= u.length) {
      var len = dv.getUint32(off), typ = dec.decode(u.subarray(off + 4, off + 8));
      var data = u.subarray(off + 8, off + 8 + len);
      if (typ === 'roMa' && len > 10 &&
          data[0] === 82 && data[1] === 77 && data[2] === 65 && data[3] === 49) { /* RMA1 */
        var nl = data[4] | (data[5] << 8);
        var name = dec.decode(data.subarray(6, 6 + nl));
        map[name] = data.subarray(6 + nl);
        hit++;
      }
      off += 12 + len;
      if (typ === 'IEND') break;
    }
    return hit ? map : null;
  }
  function pngAssets() {
    if (PNGA === false) return Promise.resolve(false);
    if (PNGA) return PNGA.then ? PNGA : Promise.resolve(PNGA);
    if (!CFG.pngAssets) { PNGA = false; return Promise.resolve(false); }
    var url = avatarUrl();
    if (!url) { PNGA = false; return Promise.resolve(false); }
    PNGA = fetch(url).then(function (r) {
      if (!r.ok) throw new Error('avatar HTTP ' + r.status);
      return r.arrayBuffer();
    }).then(function (ab) {
      var m = parsePngChunks(ab);
      PNGA = m || false;
      log(m ? ('PNG 数据块已接上：' + Object.keys(m).length + ' 项')
            : 'PNG 数据块缺席（可能被导入端剥除），转 CDN 兜底');
      return PNGA;
    }).catch(function (e) { log('PNG 数据块取数失败', String(e)); PNGA = false; return false; });
    return PNGA;
  }
  function gunzipBytes(u8) {
    return new Response(new Blob([u8]).stream()
      .pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  }

  /* ---------------------------------------------------------------- 资材 --- */
  function xor(u8) {
    var kl = KEY.length;
    for (var i = 0; i < u8.length; i++) u8[i] ^= (KEY.charCodeAt(i % kl) + ((i * 7) & 0xff)) & 0xff;
    return u8;
  }
  function unpack(u) {
    var dv = new DataView(u.buffer, u.byteOffset, u.byteLength);
    var n = dv.getUint32(4, true), off = 8, metas = [], dec = new TextDecoder();
    for (var j = 0; j < n; j++) {
      var nl = dv.getUint16(off, true); off += 2;
      var name = dec.decode(u.subarray(off, off + nl)); off += nl;
      var len = dv.getUint32(off, true); off += 4;
      metas.push([name, len]);
    }
    var out = [];
    metas.forEach(function (m) { out.push([m[0], u.subarray(off, off + m[1])]); off += m[1]; });
    return out;
  }
  function repack(pairs) {
    var enc = new TextEncoder(), heads = [], hl = 8, bl = 0;
    pairs.forEach(function (p) {
      var nb = enc.encode(p[0]); heads.push(nb); hl += 2 + nb.length + 4; bl += p[1].length;
    });
    var out = new Uint8Array(hl + bl), dv = new DataView(out.buffer);
    out[0] = 90; out[1] = 74; out[2] = 80; out[3] = 49;          /* 'ZJP1' */
    dv.setUint32(4, pairs.length, true);
    var o = 8;
    pairs.forEach(function (p, i) {
      dv.setUint16(o, heads[i].length, true); o += 2;
      out.set(heads[i], o); o += heads[i].length;
      dv.setUint32(o, p[1].length, true); o += 4;
    });
    pairs.forEach(function (p) { out.set(p[1], o); o += p[1].length; });
    return out;
  }
  /* 网络兜底要限时：墙内对 jsDelivr 常常是「连上了不回包」，
     不设超时就永远转圈，玩家只看到三维加载不动。15 秒放弃并报清楚。 */
  function netChunk(name, file) {
    var ac = window.AbortController ? new AbortController() : null;
    var tm = ac ? setTimeout(function () { ac.abort(); }, 15000) : null;
    return fetch(BASE + PACKS.dir + file, ac ? { signal: ac.signal } : {})
      .then(function (r) {
        if (tm) clearTimeout(tm);
        if (!r.ok) throw new Error('chunk ' + name + ' HTTP ' + r.status);
        return r.arrayBuffer();
      }, function (err) {
        if (tm) clearTimeout(tm);
        throw new Error('资材 ' + file + ' 网络取数失败（' +
          (err && err.name === 'AbortError' ? '15 秒超时，可能被墙' : String(err && err.message || err)) +
          '）。此部分三维需要能访问 cdn.jsdelivr.net，或改用完全版角色卡。');
      });
  }
  /* 一块压缩包 → 明文条目。去异或 → gunzip → unpack */
  function takeChunk(name) {
    var file = PACKS.chunks[name].file;
    var e = embed();
    var got;
    if (e && e.packs && e.packs[file]) {
      got = b64bytes(e.packs[file]);
    } else if (CFG.pngAssets) {
      /* PNG 块优先；块被剥了再走下面的 CDN 路（把自己重新调一遍，此时 PNGA=false） */
      got = pngAssets().then(function (m) {
        if (m && m['pack/' + file]) { var u = m['pack/' + file]; return u.slice().buffer; }
        return netChunk(name, file);
      });
    } else {
      got = netChunk(name, file);
    }
    return got.then(function (ab) {
      var plain = xor(new Uint8Array(ab));
      return new Response(new Blob([plain]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
    }).then(function (buf) { return unpack(new Uint8Array(buf)); });
  }
  /* 把若干块拼回「原档那一份」：条目顺序照原档，再异或回去，引擎照旧解 */
  function assemble(groups, order) {
    return Promise.all(groups.map(takeChunk)).then(function (lists) {
      var by = {};
      lists.forEach(function (l) { l.forEach(function (p) { by[p[0]] = p[1]; }); });
      var pairs = order.filter(function (n) { return by[n]; }).map(function (n) { return [n, by[n]]; });
      Object.keys(by).forEach(function (n) {
        if (order.indexOf(n) < 0) pairs.push([n, by[n]]);
      });
      return xor(repack(pairs));
    });
  }

  /* ------------------------------------------------- 引擎脚本 · 卡内直供 ---
     游戏用 <script src> 动态加载 three 与两个三维引擎，标签一插入就开始网络请求，
     fetch 拦截够不着。做法：包一层 appendChild/insertBefore——命中清单的脚本先扣下，
     等嵌入内容 gunzip 成 blob URL 再放行（按扣下顺序放行，加载次序不变）。
     嵌入缺席时原样放行走 CDN，两条路都通。 */
  (function () {
    var MAP = {};        /* basename -> blob URL（就绪后填入） */
    var READY = false, QUEUE = [];
    function base(u) { return String(u || '').split('?')[0].split('/').pop(); }
    function engNames() {
      var e = embed();
      if (e && e.engines && Object.keys(e.engines).length) return Object.keys(e.engines);
      if (CFG.pngAssets && CFG.engs) return CFG.engs.slice();
      return [];
    }
    function toBlobUrl(ab) {
      return new Response(new Blob([ab]).stream()
        .pipeThrough(new DecompressionStream('gzip'))).blob().then(function (bl) {
          return URL.createObjectURL(new Blob([bl], { type: 'text/javascript' }));
        });
    }
    function prep() {
      var e = embed();
      if (e && e.engines && Object.keys(e.engines).length) {
        var names = Object.keys(e.engines);
        Promise.all(names.map(function (n) {
          return b64bytes(e.engines[n]).then(toBlobUrl).then(function (u) { MAP[n] = u; });
        })).then(function () { READY = true; log('引擎已从卡内就位', names); flush(); })
          .catch(function (err) { log('嵌入引擎解压失败，回退 CDN', String(err)); READY = true; flush(); });
        return;
      }
      if (CFG.pngAssets && CFG.engs) {
        pngAssets().then(function (m) {
          if (!m) { READY = true; flush(); return; }        /* 块被剥：原样放行走 CDN */
          return Promise.all(CFG.engs.map(function (n) {
            var d = m['eng/' + n + '.gz'];
            if (!d) return null;
            return toBlobUrl(d.slice().buffer).then(function (u) { MAP[n] = u; });
          })).then(function () { READY = true; log('引擎已从 PNG 块就位', CFG.engs); flush(); });
        }).catch(function (err) { log('PNG 块引擎解压失败，回退 CDN', String(err)); READY = true; flush(); });
        return;
      }
      READY = true; flush();
    }
    function flush() {
      while (QUEUE.length) {
        var q = QUEUE.shift();
        var b = base(q.node.src);
        if (MAP[b]) q.node.src = MAP[b];
        q.insert();
      }
    }
    /* 超低配：引擎脚本一律换成空脚本——不联网、不解压、不初始化。
       MED3D/ZJ3D 从未定义，游戏各处的判空分支自会把三维整层跳过。 */
    var EMPTY_JS = null;
    function emptyJs() {
      if (!EMPTY_JS) EMPTY_JS = URL.createObjectURL(new Blob([''], { type: 'text/javascript' }));
      return EMPTY_JS;
    }
    function wrap(proto, fn) {
      var orig = proto[fn];
      proto[fn] = function (node) {
        var args = arguments;
        try {
          if (node && node.tagName === 'SCRIPT' && node.src) {
            var b = base(node.src);
            if (CFG.no3d && CFG.engs && CFG.engs.indexOf(b) >= 0) {
              node.src = emptyJs();
              return orig.apply(this, args);
            }
            if (engNames().indexOf(b) >= 0) {
              if (!READY) {
                var self = this;
                QUEUE.push({ node: node, insert: function () { orig.apply(self, args); } });
                return node;
              }
              if (MAP[b]) node.src = MAP[b];
            }
          }
        } catch (_) { }
        return orig.apply(this, args);
      };
    }
    wrap(Node.prototype, 'appendChild');
    wrap(Node.prototype, 'insertBefore');
    prep();
  })();

  /* ---------------------------------------------------------------- 神谕 --- */
  var seq = 0;
  function sse(obj) { return 'data: ' + JSON.stringify(obj) + '\n\n'; }

  function oracle(body, signal) {
    var TH = helper();
    if (!TH || !TH.generateRaw) throw new Error('酒馆助手未就位');
    var gid = 'roma-' + (Date.now().toString(36)) + '-' + (++seq);
    var prompts = (body.messages || []).map(function (m) {
      return { role: (m.role === 'assistant' ? 'assistant' : (m.role === 'system' ? 'system' : 'user')), content: String(m.content == null ? '' : m.content) };
    });
    var cfg = {
      generation_id: gid,
      should_stream: !!body.stream,
      should_silence: true,
      /* 只给 ordered_prompts、不带任何占位符：酒馆一个字都不会往里加，
         发出去的就是应用自己拼好的那份提示词。换了后端而提示词不变，
         「一模一样」才谈得上。 */
      ordered_prompts: prompts,
    };
    /* 只把「怎么发起」交出去，不在这里发。监听器必须先挂上：
       generateRaw 一调用就可能同步吐出第一个增量，那时若还没挂监听，
       开头几个字直接丢掉——正文会莫名其妙缺一小截。 */
    return { gid: gid, cfg: cfg, signal: signal, th: TH,
             start: function () { return TH.generateRaw(cfg); } };
  }

  function streamResponse(job) {
    var enc = new TextEncoder(), closed = false, offs = [], gotAny = false;
    var EV = events(), IEV = ievents();
    var stream = new ReadableStream({
      start: function (ctl) {
        function push(s) { if (!closed) try { ctl.enqueue(enc.encode(s)); } catch (_) { } }
        function done() {
          if (closed) return;
          push('data: [DONE]\n\n'); closed = true;
          offs.forEach(function (f) { try { f(); } catch (_) { } });
          try { ctl.close(); } catch (_) { }
        }
        function onInc(text, gid) {
          if (gid !== job.gid) return;                 /* 并发的辅助请求各认各的 */
          gotAny = true;
          push(sse({ choices: [{ delta: { content: text }, index: 0 }] }));
        }
        function onEnd(_text, gid) { if (gid === job.gid) done(); }
        if (EV && EV.on) {
          EV.on(IEV.STREAM_TOKEN_RECEIVED_INCREMENTALLY, onInc);
          EV.on(IEV.GENERATION_ENDED, onEnd);
          offs.push(function () {
            EV.off(IEV.STREAM_TOKEN_RECEIVED_INCREMENTALLY, onInc);
            EV.off(IEV.GENERATION_ENDED, onEnd);
          });
        }
        if (job.signal) job.signal.addEventListener('abort', function () {
          try { job.th.stopGeneration && job.th.stopGeneration(); } catch (_) { }
          if (!closed) { closed = true; offs.forEach(function (f) { try { f(); } catch (_) { } }); try { ctl.error(new DOMException('Aborted', 'AbortError')); } catch (_) { } }
        });
        /* 监听挂好了，现在才发起 */
        var run;
        try { run = job.start(); } catch (e) { try { ctl.error(e); } catch (_) { } return; }
        run.then(function (full) {
          /* 一个增量都没收到（没有事件系统，或后端根本不流式）时兜底：
             把整段当一个 delta 发出去。不能省——应用的空闲看门狗只认「有没有出字」。 */
          if (!closed && !gotAny) push(sse({ choices: [{ delta: { content: String(full || '') }, index: 0 }] }));
          done();
        }, function (e) {
          if (closed) return; closed = true;
          offs.forEach(function (f) { try { f(); } catch (_) { } });
          try { ctl.error(e instanceof Error ? e : new Error(String(e))); } catch (_) { }
        });
      },
    });
    return new Response(stream, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
  }

  function wholeResponse(job) {
    return job.start().then(function (full) {
      return new Response(JSON.stringify({
        id: job.gid, object: 'chat.completion', created: Math.floor(Date.now() / 1000),
        choices: [{ index: 0, message: { role: 'assistant', content: String(full || '') }, finish_reason: 'stop' }],
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    });
  }

  /* ------------------------------------------------------------ 拦截点 --- */
  var _fetch = window.fetch.bind(window);
  window.__ROMA_RAWFETCH__ = _fetch;      /* 未经拦截的原样取——自检用 */
  window.fetch = function (input, init) {
    var url = (typeof input === 'string') ? input : (input && input.url) || '';
    init = init || {};

    /* 1) 神谕 */
    if (/\/chat\/completions(\?|$)/.test(url)) {
      var body = {};
      try { body = JSON.parse((typeof input !== 'string' && input.body) ? input.body : init.body); } catch (_) { }
      var signal = init.signal || (typeof input !== 'string' && input.signal) || null;
      var job;
      try { job = oracle(body, signal); } catch (e) { return Promise.reject(e); }
      try { return body.stream ? Promise.resolve(streamResponse(job)) : wholeResponse(job); }
      catch (e) { return Promise.reject(e); }
    }

    /* 1.5) BGM：卡版不带音乐。47 首 138MB 既进不了卡，墙内取 CDN 又必挂——
       bgmSrc 走的就是这里的 fetch，凡 idx/v1 下不属于三维资材映射的 .dat
       一律就地 404，一个字节也不上网。中原城池包（东征幕用）不在映射里，放行走网络。 */
    var mBgm = url.match(/core\/res\/data\/idx\/v1\/([0-9a-f]+\.dat)/);
    /* 超低配：三维资材（连同 BGM）一律就地 404——引擎本就没装，这里只是把
       任何漏网的 .dat 请求也拦死，保证一个字节不上网、一毫秒不空等。 */
    if (mBgm && CFG.no3d) {
      return Promise.resolve(new Response(null, { status: 404, statusText: 'no3d build' }));
    }
    /* 映射键带 idx/v1/ 前缀，这里拿到的是裸文件名——必须两种形态都查。
       之前只查裸名，查不到就把三维资材包也当 BGM 给 404 了：三维全灭。 */
    if (mBgm && PACKS && !PACKS.map[mBgm[1]] && !PACKS.map['idx/v1/' + mBgm[1]]) {
      return Promise.resolve(new Response(null, { status: 404, statusText: 'bgm absent in card' }));
    }

    /* 2) 资材整包 → 压缩块拼回 */
    if (PACKS) {
      var hit = null;
      Object.keys(PACKS.map).forEach(function (frag) { if (url.indexOf(frag) >= 0) hit = PACKS.map[frag]; });
      if (hit) {
        return assemble(hit.chunks, hit.order).then(function (u8) {
          return new Response(u8, { status: 200, headers: { 'Content-Type': 'application/octet-stream' } });
        });
      }
    }

    return _fetch(input, init);
  };

  /* ------------------------------------------------------------ 接线 --- */
  /* 应用启动时从 localStorage['rome_api'] 读接口配置，apiReady() 只看三项非空。
     所以不必去够 IIFE 里的 API 对象——本文件跑在应用脚本之前，先把值写进存储即可，
     应用一行都不用改。base 里那个 /chat/completions 正好是上面拦截的那条路径。
     真正的地址、密钥、模型由酒馆那边的设置决定，这三个占位值永远不会被发出去。 */
  try {
    var cur = {};
    try { cur = JSON.parse(localStorage.getItem('rome_api') || '{}'); } catch (_) { }
    cur.base = 'https://tavern.helper.local/v1';
    cur.key = 'tavern-helper';
    cur.model = (CFG.model || 'tavern-helper');
    localStorage.setItem('rome_api', JSON.stringify(cur));
  } catch (e) { log('接线失败', e && e.message); }

  log('垫片就位', { base: BASE, helper: !!helper(), packs: !!PACKS });
})();
