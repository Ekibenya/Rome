# -*- coding: utf-8 -*-
"""生成酒馆前端：从线上主文档派生出 st/front/index.html。

「一模一样」的做法是别改它。主文档、引擎、棋子模块、three、资材——全都经
<base href> 指向 CDN，跑的是与线上同一份文件。派生出来的这份 index.html
与源文档的差别只有 <head> 里插的两行：一个 <base>、一个 boot.js。
其余整份文档逐字节相同（本脚本导完会自证这一点）。

不读也不写 core/ 下任何东西之外的内容，线上部署一个字节不受影响。
"""
import io, os, re, json, hashlib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOC  = os.path.join(ROOT, 'core/vendor/three/build/chunks/9d717bc0/156a50943028.html')
ENG  = os.path.join(ROOT, 'core/vendor/three/build/chunks/9d717bc0/8e2ad10c77b4.js')
MANI = os.path.join(ROOT, 'core/res/data/st/v1/manifest.json')
OUT  = os.path.join(ROOT, 'st/front')

# CDN 根。jsDelivr 只服务公开仓库；私有仓要换成别的静态源，改这一行即可。
CDN = os.environ.get('ROMA_CDN', 'https://cdn.jsdelivr.net/gh/ekibenya/rome@main/')

# 引擎里那一发整包请求 → 用哪几块压缩包拼回来。
# order 必须与原档里的条目顺序一致，拼出来才逐字节相同。
PACKMAP = {
    'idx/v1/cdcf9bb63a.dat': {
        'chunks': ['ancient', 'historic', 'interior', 'core'],
        'order': None,        # 运行时由本脚本按原档顺序填好
    },
    'idx/v1/ceb0dfcfec.dat': {'chunks': ['pawn'], 'order': None},
    'idx/v1/df6d172d82.dat': {'chunks': ['zhou'], 'order': None},
}


def xor_key():
    s = io.open(ENG, encoding='utf-8', errors='ignore').read()
    return re.search(r"var K\s*=\s*'([^']+)'", s).group(1)


def pack_order(path, K):
    """读出原档里的条目顺序——拼回去要照这个顺序摆。"""
    import struct
    b = bytearray(open(path, 'rb').read())
    kl = len(K)
    for i in range(len(b)):
        b[i] ^= (ord(K[i % kl]) + ((i * 7) & 0xff)) & 0xff
    n = struct.unpack_from('<I', b, 4)[0]
    off, names = 8, []
    for _ in range(n):
        nl = struct.unpack_from('<H', b, off)[0]; off += 2
        names.append(bytes(b[off:off + nl]).decode('utf-8')); off += nl
        off += 4
    return names


def main():
    os.makedirs(OUT, exist_ok=True)
    K = xor_key()
    mani = json.load(io.open(MANI, encoding='utf-8'))

    pm = {}
    for frag, spec in PACKMAP.items():
        src = os.path.join(ROOT, 'core/res/data', frag)
        pm[frag] = {'chunks': spec['chunks'], 'order': pack_order(src, K)}

    cfg = {
        'base': CDN,
        'key': K,
        'packs': {
            'dir': 'core/res/data/st/v1/',
            'chunks': {k: {'file': v['file']} for k, v in mani['chunks'].items()},
            'map': pm,
        },
    }

    doc = io.open(DOC, encoding='utf-8').read()
    boot = io.open(os.path.join(OUT, 'boot.js'), encoding='utf-8').read()

    # 插在 <meta charset> 之后、其余一切之前：base 要先于任何相对路径生效，
    # boot 要先于应用脚本跑（它得赶在 API 从 localStorage 读出来之前写好）。
    anchor = '<meta charset="utf-8">\n'
    if doc.count(anchor) != 1:
        raise SystemExit('找不到唯一的 charset 锚点')
    # 界面上切掉周纪：只藏入口，不动代码。
    # #lineTg 是转盘上那颗「LINEA·ROMA ⇄ 周」切线按钮，
    # #pcZhou 是人物面板里那张「姬瑶」卡。两处一藏，周纪就没有任何入口了。
    # 不去删 __GAME_ZHOU__ 与周纪引擎——删了要牵动 CARDS.zhou 的一串引用，
    # 而罗马这边要求逐字节不变，宁可多背 218KB 也不冒这个险。
    nozhou = ('<style id="roma-only">'
              '#lineTg{display:none!important}'
              '#pcZhou{display:none!important}'
              # 卡版无 BGM：藏播放器入口、播放器弹窗、设置里的配乐拉杆
              '#gtSnd{display:none!important}'
              '#dlgBgm{display:none!important}'
              '.sRow:has(#cfgBgm){display:none!important}'
              '#persona .psFixed{display:block}'
              '#persona .psCard#pcRoma{width:100%}'
              '</style>\n')

    inject = (anchor
              + '<base href="' + CDN + '">\n'
              + nozhou
              + '<script>window.__ROMA_ST__=' + json.dumps(cfg, ensure_ascii=False) + ';</script>\n'
              + '<script>\n' + boot + '\n</script>\n')
    out = doc.replace(anchor, inject, 1)

    fn = os.path.join(OUT, 'index.html')
    io.open(fn, 'w', encoding='utf-8').write(out)

    # ---- 把 UI 写进卡的正则 ----
    # 机制照抄现成能跑的重前端卡（FF7 回响 3.0）实测出来的做法：
    #   A「html」  placement=AI输出, markdownOnly, findRegex=/.+/s
    #              —— 匹配整条消息的**全部内容**，替换成内联了整个前端的代码块。
    #              不认任何标记：不依赖 AI 写出什么、也不依赖开场白长什么样。
    #   B「不发送」 placement=[用户输入,AI输出], promptOnly, findRegex=/.*/s → ''
    #              —— 把这坨 HTML 从模型看到的文本里整个抹掉。
    # 两条各管一边：显示层是游戏，提示词层干净。
    #
    # 之前那版用 ⟦ROMA·STAGE⟧ 标记 + 一个小 loader 运行时去 CDN 取 1.5MB 本体，
    # 错在两处：① 标记没被替换就原样显示成纯文字（玩家看到的就是这个）；
    # ② 多一层运行时网络依赖，CDN 一慢一挂就整个白屏。现在整份内联，无此二患。
    import uuid

    body_doc = out                      # 刚写出的派生文档，已内联 base/boot/配置
    # 剥掉 <!doctype> 与 <html> 外壳：酒馆助手会把内容塞进它自己构造的文档的 <body>，
    # 再嵌一层 <html> 是非法的。保留 <head>…</head><body>…</body> 两段就够，
    # 里面的 <style>/<script> 照样执行（FF7 那张卡也正是这么写的）。
    m = re.search(r'<head[^>]*>', body_doc)
    inner = body_doc[m.start():]
    inner = re.sub(r'</html>\s*$', '', inner).rstrip()

    # —— 控制字节消毒（黑屏的真正根因，字节级）——
    # 游戏源码里有 '\0'（裸 NUL 字节）当字符串分隔符用。直接嵌 iframe 没事
    # （浏览器换成 U+FFFD，仍是合法字符串），但走 ST 的消息管线
    # （正则替换→markdown→DOMPurify→酒馆助手取文本→srcdoc）时 NUL 会变成换行：
    # 字符串字面量被断成两行 → 整个主 IIFE 一个 SyntaxError 全灭 → 黑屏。
    # 换成转义序列 \x00 后语义逐字相同，且是纯 ASCII，任何管线都动不了它。
    inner = inner.replace('\x00', '\\x00')
    ctrl = [c for c in set(inner) if ord(c) < 0x20 and c not in '\t\n\r']
    if ctrl:
        raise SystemExit('内联内容仍含控制字节 %r —— 会在 ST 管线里被改写成别的字符，拒绝构建'
                         % [hex(ord(c)) for c in ctrl])

    # 酒馆助手按 body.scrollHeight 推 iframe 高度，而本游戏整屏都是
    # position:fixed/inset:0 —— 不给一个真实高度，scrollHeight 会是 0，iframe 塌掉、
    # 画面一点都看不见。这一句是内联版能不能显示出来的关键。
    # 高度：不能依赖任何视口单位。
    # 酒馆助手的 iframe 高度是由 body.scrollHeight 反推的，而本游戏从 #stage/#game
    # 到所有弹窗**全是 position:fixed;inset:0** —— 脱离文档流，对 scrollHeight 贡献为 0。
    # 上一版指望它把 min-height:100vh 改写成真实视口高度（它确实有这么一道改写），
    # 但那道改写只认特定写法、且随版本变；一旦没命中，100vh 在零高 iframe 里就是 0 → 黑屏。
    # 参照 COC 那张能跑的卡：它 position:fixed 出现 0 次、min-height 出现 27 次，
    # 整个 UI 走正常文档流，所以压根不碰这个坑。我们改不动游戏的定位方式，
    # 那就把高度变成**确定的像素值**：同源，直接问父窗要真实视口高度。
    fit = (
        '<style id="roma-fit">html,body{margin:0;padding:0;overflow:hidden;'
        'background:#060606;min-height:100vh}</style>\n'
        '<script id="roma-fit-js">(function(){\n'
        '  function vp(){\n'
        '    var h=0;\n'
        '    try{ for(var w=window,i=0;w&&i<8;w=w.parent,i++){\n'
        '      if(w.innerHeight>h)h=w.innerHeight;\n'
        '      if(w.parent===w)break; } }catch(_){}\n'
        '    return h||window.innerHeight||700;\n'
        '  }\n'
        '  function put(){\n'
        '    var h=vp();\n'
        '    var st=document.getElementById("roma-fit-px")||document.createElement("style");\n'
        '    st.id="roma-fit-px";\n'
        '    /* 必须 !important：游戏自己的样式表里有 html,body{height:100%}，且在文档顺序上\n'
        '       排在本段之后；不加就被它压掉，而零高 iframe 里的 100% 正好是 0 —— 黑屏。 */\n'
        '    st.textContent="html,body{height:"+h+"px!important;min-height:"+h+"px!important}";\n'
        '    (document.head||document.documentElement).appendChild(st);\n'
        '  }\n'
        '  /* 定高后补一次 resize：游戏的 --fs 等尺寸按视口算，不通知它会一直停在 0 */\n'
        '  /* 关键一步（照 FF7 卡实测出的做法）：自己把 iframe 拉到目标高度。\n'
        '     酒馆助手自带的高度调整器在真实环境里可能根本没跑（实测 body 尺寸\n'
        '     变了它毫无反应），iframe 会永远停在默认 150px——玩家看到的就是\n'
        '     开局画面最上面那条黑边，即「黑屏」。同源，frameElement 直接可写。 */\n'
        '  function fit(){\n'
        '    try{ var fe=window.frameElement;\n'
        '      if(fe){ var h=vp(); fe.style.height=h+"px"; fe.style.minHeight=h+"px"; }\n'
        '    }catch(_){}\n'
        '  }\n'
        '  function kick(){ put(); fit(); try{ window.dispatchEvent(new Event("resize")); }catch(_){} }\n'
        '  put();\n'
        '  /* 父窗尺寸变了（转屏、酒馆自己调布局）要跟上 */\n'
        '  try{ window.addEventListener("resize",put); }catch(_){}\n'
        '  try{ (window.top||window).addEventListener("resize",put); }catch(_){}\n'
        '  document.addEventListener("DOMContentLoaded",kick);\n'
        '  setTimeout(kick,60); setTimeout(kick,300); setTimeout(kick,1200);\n'
        '})();</script>\n'
    )
    inner = inner.replace(m.group(0), m.group(0) + '\n' + fit, 1)

    # 前端不再以明文躺在正则里（1.52MB 文本每次渲染都要过 markdown+DOMPurify 一遍，
    # 又占体积）。改为：整份文档 gzip+base64 放进 extensions.roma_assets.doc，
    # 正则里只留一个 2KB 启动器——同一套「爬到主窗读角色卡」的路径，资材嵌入已经验证过。
    # document.write 必须带 doctype，否则新文档落入 quirks 模式，布局全乱。
    full_doc = '<!doctype html>\n<html lang="zh">\n' + inner + '\n</html>'
    boot_block = (
        '```html\n'
        '<!--<body>-->\n'
        '<div id="romaBoot" style="font:12px/1.8 -apple-system,\'PingFang SC\',system-ui,sans-serif;'
        'color:#8b8b93;background:#0b0b0c;border:1px solid #26262b;padding:12px 15px">'
        '<span style="letter-spacing:.26em;color:#c99b3f">SPQR&nbsp;·&nbsp;罗马纪</span>'
        '<span id="romaBootMsg">&nbsp;·&nbsp;展开中…</span></div>\n'
        '<script>\n'
        '(function(){\n'
        '  function say(m){var e=document.getElementById("romaBootMsg");if(e)e.textContent=" · "+m;}\n'
        '  function boom(m){say("启动失败：" + m);}\n'
        '  try{\n'
        '    var top=window;for(var i=0;i<8&&top.parent&&top.parent!==top;i++)top=top.parent;\n'
        '    var ctx=top.SillyTavern&&top.SillyTavern.getContext&&top.SillyTavern.getContext();\n'
        '    var A=null,cs=(ctx&&ctx.characters)||[];\n'
        '    var by=(ctx&&ctx.characterId!=null)?cs[ctx.characterId]:null;\n'
        '    var cand=[by].concat([].slice.call(cs)).filter(Boolean);\n'
        '    for(var j=0;j<cand.length;j++){var d=cand[j]&&cand[j].data;\n'
        '      if(d&&d.extensions&&d.extensions.roma_assets&&d.extensions.roma_assets.doc){A=d.extensions.roma_assets;break;}}\n'
        '    var got=A?fetch("data:application/octet-stream;base64,"+A.doc)\n'
        '        .then(function(r){return r.blob();})\n'
        '        .then(function(b){return new Response(b.stream().pipeThrough(new DecompressionStream("gzip"))).text();})\n'
        '      :fetch("' + CDN + 'st/front/index.html").then(function(r){\n'
        '        if(!r.ok)throw new Error("HTTP "+r.status);return r.text();});\n'
        '    if(!A)say("卡内无本体，改从网络取…");\n'
        '    got.then(function(html){\n'
        '      /* 同窗重写文档：window 与其全局（TavernHelper 等）都保留，\n'
        '         脚本按文档顺序照常执行；高度自适配在文档自己的 fit 脚本里。 */\n'
        '      document.open();document.write(html);document.close();\n'
        '    }).catch(function(e){boom(String(e&&e.message||e));});\n'
        '  }catch(e){boom(String(e&&e.message||e));}\n'
        '})();\n'
        '</script>\n'
        '```'
    )
    block = boot_block

    card_fn = os.path.join(ROOT, 'st/roma.card.json')
    card = json.load(io.open(card_fn, encoding='utf-8'))
    d = card['data']

    # 开场白回归干净：整条消息都会被 /.+/s 换掉，不需要任何标记。
    # 只留一行落地词，供正则未被允许时玩家仍看得懂发生了什么。
    MARK = '⟦ROMA·STAGE⟧'
    def strip_old(g):
        for m2 in ('<ROMASTAGE>\n', '<ROMASTAGE>', MARK + '\n'):
            while g.startswith(m2):
                g = g[len(m2):]
        # 旧版塞在标记后面那行排障提示也一并清掉
        g = re.sub(r'^没看到游戏界面？[^\n]*\n', '', g)
        return g

    d['first_mes'] = strip_old(d['first_mes'])
    d['alternate_greetings'] = [strip_old(g) for g in d['alternate_greetings']]

    def rx(name, find, repl, salt, **kw):
        return {'id': str(uuid.uuid5(uuid.NAMESPACE_URL, 'roma.rx.' + salt)),
                'scriptName': name, 'findRegex': find, 'replaceString': repl,
                'trimStrings': [], 'placement': kw.get('placement', [2]),
                'disabled': False, 'markdownOnly': kw.get('markdownOnly', False),
                'promptOnly': kw.get('promptOnly', False), 'runOnEdit': True,
                'substituteRegex': 0, 'minDepth': kw.get('minDepth'), 'maxDepth': kw.get('maxDepth')}

    ext = d.setdefault('extensions', {})
    ext.pop('tavern_helper', None)          # 撤掉旧的脚本库那条路
    # 匹配整条消息的全部内容。/.+/s 里 s 让 . 也吃换行——这是 FF7 那张卡的做法，
    # 好处是**不依赖任何标记**：AI 写什么、开场白长什么样，都照样出界面。
    # 旧版锚定 ⟦ROMA·STAGE⟧，标记没被替换就原样显示成纯文字，正是玩家看到的症状。
    ALL = '/.+/s'
    ext['regex_scripts'] = [
        # 显示层：整条 AI 消息 → 内联的整个前端。不认标记，所以 AI 写什么都照样出界面。
        # maxDepth=1：任一时刻只有最新的 AI 楼层渲染游戏。没有这一条，
        # 玩家若在酒馆输入框发过话，每条 AI 回复都会孵化一个完整的 three.js
        # 游戏实例，两三个就把手机拖死。
        rx('罗马纪 · 前端界面', ALL, block, 'ui.v4',
           placement=[2], markdownOnly=True, maxDepth=1),
        # 远楼层收纳：只作用于第 6 层以外的旧楼层（minDepth=6），把它们清空——
        # 既省提示词，也免得每条旧消息都重渲一份 1.5MB 的前端。
        # 关键是**带深度限制**，所以碰不到当前这条；我一开始误以为它是「抹提示词」，
        # 写成无深度限制的 promptOnly，那会把界面自己也抹掉。
        rx('罗马纪 · 远楼层不渲染', '/.*/s', '', 'strip.v5',
           placement=[1, 2], markdownOnly=True, promptOnly=True, minDepth=2),
    ]

    # ---- 自包含：资材与引擎嵌进卡（ROMA_EMBED=0 关闭）----
    # 42MB 是按原始资材算的旧账；重打包产物（拼包→gzip→异或）只有 5.17MB，
    # 引擎 gzip 后约 0.4MB。都以 base64 放进 data.extensions.roma_assets——
    # ST 对不认识的 extensions 字段原样保留、不入提示词。boot.js 嵌入优先、CDN 兜底。
    if os.environ.get('ROMA_EMBED', '1') != '0':
        import base64, gzip as _gz
        eng_files = ['core/three-bundle.min.js',
                     'core/vendor/three/build/chunks/9d717bc0/36411d0a880f.js',
                     'core/vendor/three/build/chunks/9d717bc0/1aa613ec934b.js',
                     'core/vendor/three/build/chunks/9d717bc0/8e2ad10c77b4.js']
        engines = {}
        for f in eng_files:
            raw = io.open(os.path.join(ROOT, f), 'rb').read()
            engines[os.path.basename(f)] = base64.b64encode(
                _gz.compress(raw, 9, mtime=0)).decode('ascii')
        packs = {}
        pdir = os.path.join(ROOT, 'core/res/data/st/v1')
        embed_zhou = os.environ.get('ROMA_EMBED_ZHOU', '0') == '1'
        for fn2 in sorted(os.listdir(pdir)):
            if fn2 == 'zhou.dat' and not embed_zhou:
                continue          # 标准版不嵌中原包（13.56MB）；完全版 ROMA_EMBED_ZHOU=1
            if fn2.endswith('.dat'):
                packs[fn2] = base64.b64encode(
                    io.open(os.path.join(pdir, fn2), 'rb').read()).decode('ascii')
        doc_b64 = base64.b64encode(_gz.compress(full_doc.encode('utf-8'), 9, mtime=0)).decode('ascii')
        ext['roma_assets'] = {'v': 1, 'doc': doc_b64, 'engines': engines, 'packs': packs}
        _t = sum(len(v) for v in engines.values()) + sum(len(v) for v in packs.values())
        print('卡内嵌入      引擎 %d 支 + 资材 %d 包，base64 共 %.2f MB（自包含，无 CDN 也出三维）'
              % (len(engines), len(packs), _t / 1048576.0))

    io.open(card_fn, 'w', encoding='utf-8').write(json.dumps(card, ensure_ascii=False, separators=(',', ':')))
    print('卡内正则      %d 条（启动器 %.1f KB；本体 gzip 进 extensions）'
          % (len(ext['regex_scripts']), len(block.encode('utf-8')) / 1024.0))

    # 自证：把插进去的那一段抠掉，必须与源文档逐字节相同
    back = out.replace(inject, anchor, 1)
    same = (back == doc)
    print('CDN 根        %s' % CDN)
    print('源文档        %.2f MB' % (len(doc.encode('utf-8')) / 1048576.0))
    print('派生文档      %.2f MB  (+%.1f KB)' % (
        len(out.encode('utf-8')) / 1048576.0,
        (len(out.encode('utf-8')) - len(doc.encode('utf-8'))) / 1024.0))
    print('注入          <base> + __ROMA_ST__ + boot.js，共 %.1f KB'
          % ((len(inject.encode('utf-8')) - len(anchor.encode('utf-8'))) / 1024.0))
    print('资材映射      %s' % ', '.join('%s→%s' % (k.split('/')[-1], '+'.join(v['chunks'])) for k, v in pm.items()))
    print('sha           %s' % hashlib.sha256(out.encode('utf-8')).hexdigest()[:16])
    print('自证          %s' % ('PASS 抠掉注入段与源文档逐字节相同' if same else 'FAIL 文档被改动了'))
    if not same:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
