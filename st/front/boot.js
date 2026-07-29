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
  var log = function () { try { console.log.apply(console, ['[roma·st]'].concat([].slice.call(arguments))); } catch (_) { } };

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
  /* 一块压缩包 → 明文条目。去异或 → gunzip → unpack */
  function takeChunk(name) {
    return fetch(BASE + PACKS.dir + PACKS.chunks[name].file).then(function (r) {
      if (!r.ok) throw new Error('chunk ' + name + ' HTTP ' + r.status);
      return r.arrayBuffer();
    }).then(function (ab) {
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
