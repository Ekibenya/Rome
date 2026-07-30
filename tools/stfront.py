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
        '  function kick(){ put(); try{ window.dispatchEvent(new Event("resize")); }catch(_){} }\n'
        '  put();\n'
        '  /* 父窗尺寸变了（转屏、酒馆自己调布局）要跟上 */\n'
        '  try{ window.addEventListener("resize",put); }catch(_){}\n'
        '  try{ (window.top||window).addEventListener("resize",put); }catch(_){}\n'
        '  document.addEventListener("DOMContentLoaded",kick);\n'
        '  setTimeout(kick,60); setTimeout(kick,300); setTimeout(kick,1200);\n'
        '})();</script>\n'
    )
    inner = inner.replace(m.group(0), m.group(0) + '\n' + fit, 1)

    block = '```html\n' + inner + '\n```'

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
        rx('罗马纪 · 前端界面', ALL, block, 'ui.v4',
           placement=[2], markdownOnly=True),
        # 远楼层收纳：只作用于第 6 层以外的旧楼层（minDepth=6），把它们清空——
        # 既省提示词，也免得每条旧消息都重渲一份 1.5MB 的前端。
        # 关键是**带深度限制**，所以碰不到当前这条；我一开始误以为它是「抹提示词」，
        # 写成无深度限制的 promptOnly，那会把界面自己也抹掉。
        rx('罗马纪 · 远楼层不渲染', '/.*/s', '', 'strip.v5',
           placement=[1, 2], markdownOnly=True, promptOnly=True, minDepth=6),
    ]

    io.open(card_fn, 'w', encoding='utf-8').write(json.dumps(card, ensure_ascii=False, indent=1))
    print('卡内正则      %d 条（整个前端已内联进 replaceString，%.2f MB）'
          % (len(ext['regex_scripts']), len(block.encode('utf-8')) / 1048576.0))

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
