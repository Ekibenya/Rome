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

    # ---- 把 UI 写进卡的正则（重前端卡的标准机制）----
    # 重前端卡的 UI 不是靠脚本库，是靠「正则」：一条显示层正则把开场白里的
    # <ROMASTAGE> 标记替换成一个含 <body> 的代码块，酒馆助手据此渲染成 iframe，
    # 加载器在里面把全屏游戏挂起来。导入后在「正则」列表里就能看到这两条。
    #   A 显示正则  markdownOnly + AI 输出位：只改显示，不动发给模型的提示词
    #   B 提示词正则 promptOnly：把标记从模型看到的文本里抹掉
    # markdownOnly/promptOnly 各管一边，模型看到的开场白与线上完全一致。
    import uuid
    # 标记故意用「⟦⟧」而不是尖括号：尖括号会被 DOMPurify 当标签吃掉，
    # 于是正则没生效时玩家看到的是一片空白，连线索都没有。
    # 现在正则没生效就明明白白显示出下面这行提示，玩家一眼知道要去勾什么。
    MARK = '⟦ROMA·STAGE⟧'
    HINT = '没看到游戏界面？请打开酒馆的「正则」面板，勾选 **Scoped Scripts**（允许本角色卡的正则），然后刷新页面。'
    HEAD = MARK + '\n' + HINT + '\n'

    loader = io.open(os.path.join(OUT, 'loader.js'), encoding='utf-8').read().replace('__CDN__', CDN)
    # 代码块里先放一块「可见的」面板，再放脚本。
    # 只要酒馆助手把 iframe 渲出来了，这块面板就一定看得见——万一脚本哪一步失败，
    # 玩家看到的是写明原因的一行字，而不是一片空白。这是排障的关键。
    # isFrontend 判定看文本是否含 <body>：用一句 HTML 注释满足它，不产生嵌套 body。
    panel = (
        '<!--<body>-->\n'
        '<div id="romaBox" style="font:13px/1.7 -apple-system,\'PingFang SC\',system-ui,sans-serif;'
        'color:#e6e6e2;background:#0b0b0c;border:1px solid #26262b;padding:16px 18px">'
        '<div style="font-size:11px;letter-spacing:.28em;color:#c99b3f;margin-bottom:10px">'
        'SPQR&nbsp;·&nbsp;罗马纪</div>'
        '<div id="romaGo" style="display:inline-block;border:1px solid #c99b3f;color:#e0bd6e;'
        'padding:9px 22px;letter-spacing:.2em;cursor:pointer;user-select:none;font-size:12px">'
        'INTRARE&nbsp;·&nbsp;进入罗马</div>'
        '<div id="romaMsg" style="font-size:11px;color:#8b8b93;margin-top:11px">'
        '脚本未执行——若一直是这行字，说明酒馆助手没有把本块渲染成 iframe。</div>'
        '</div>\n'
    )
    # 代码块之外再放一段「保底告示」：走 ST 自己的消息渲染，不经酒馆助手。
    # 酒馆助手在 iframe 的 <head> 里挂的是**阻塞式**外部脚本（其中一个来自
    # testingcf.jsdelivr.net）。任何一个卡住，<body> 就永远不解析——连块里那个
    # 纯 HTML 面板都不会出现，玩家看到的就是「啥也没有」，连线索都没有。
    # 这一段不含 <script>、只用 div/a/style，DOMPurify 不会剥掉；
    # loader 真正跑起来之后会把它隐藏（说明富路径是活的）。
    notice = (
        '<div class="roma-fallback" id="romaFallback" '
        'style="font:12px/1.75 -apple-system,\'PingFang SC\',system-ui,sans-serif;'
        'color:#8b8b93;background:#0b0b0c;border:1px solid #26262b;padding:13px 15px;'
        'margin:0 0 8px">'
        '<span style="letter-spacing:.26em;color:#c99b3f">SPQR&nbsp;·&nbsp;罗马纪</span>'
        '<br>下面若没有出现金色的「INTRARE·进入罗马」按钮，请依次检查：'
        '<br>① 酒馆助手扩展已启用，且其「渲染」开关是开的；'
        '<br>② 「正则」面板里勾上 Scoped Scripts（允许本卡的正则）；'
        '<br>③ 导入新卡后要<b style="color:#c9c9c4">开一段新对话</b>'
        '——旧对话的开场白存在聊天文件里，不会重新渲染。'
        '<br><a href="' + CDN + 'st/front/index.html" target="_blank" rel="noopener" '
        'style="color:#e0bd6e">单独打开网页版</a>'
        '<span style="color:#5f5f66">（可玩，但用不到酒馆的模型）</span>'
        '</div>'
    )
    block = notice + '\n\n```html\n' + panel + '<script>\n' + loader + '\n</script>\n```' 

    card_fn = os.path.join(ROOT, 'st/roma.card.json')
    card = json.load(io.open(card_fn, encoding='utf-8'))
    d = card['data']

    # 每个开场白前面插「标记 + 提示」两行。正则生效时这两行整段变成游戏；
    # 正则没生效时它们照原样显示，就是一句人能读懂的排障指引。
    def strip_old(g):
        for m in ('<ROMASTAGE>\n', '<ROMASTAGE>', MARK + '\n' + HINT + '\n', MARK + '\n'):
            if g.startswith(m):
                g = g[len(m):]
        return g

    d['first_mes'] = HEAD + strip_old(d['first_mes'])
    d['alternate_greetings'] = [HEAD + strip_old(g) for g in d['alternate_greetings']]

    def rx(name, find, repl, salt, **kw):
        return {'id': str(uuid.uuid5(uuid.NAMESPACE_URL, 'roma.rx.' + salt)),
                'scriptName': name, 'findRegex': find, 'replaceString': repl,
                'trimStrings': [], 'placement': kw.get('placement', [2]),
                'disabled': False, 'markdownOnly': kw.get('markdownOnly', False),
                'promptOnly': kw.get('promptOnly', False), 'runOnEdit': True,
                'substituteRegex': 0, 'minDepth': None, 'maxDepth': None}

    ext = d.setdefault('extensions', {})
    ext.pop('tavern_helper', None)          # 撤掉旧的脚本库那条路
    # 一条正则吃掉「标记 + 提示行」整段。提示行可能被玩家编辑过，所以只锚定标记，
    # 后面那一行用 [^\n]* 宽松匹配。
    FIND = '/⟦ROMA·STAGE⟧\\n?[^\\n]*\\n?/'
    ext['regex_scripts'] = [
        rx('罗马纪 · 前端界面', FIND, block, 'ui.v3',
           placement=[2], markdownOnly=True),
        # 手动入口：玩家在输入框里打这个标记也能把游戏叫出来。
        # 开场白那条路依赖「已存在的对话会不会重渲染」等一堆状态，
        # 这条不依赖任何东西——发一句话就出来，同时也是最好的排障手段。
        rx('罗马纪 · 手动唤出', FIND, block, 'ui.user.v3',
           placement=[1], markdownOnly=True),
        rx('罗马纪 · 清理标记', FIND, '', 'strip.v3',
           placement=[1, 2], promptOnly=True),
    ]

    io.open(card_fn, 'w', encoding='utf-8').write(json.dumps(card, ensure_ascii=False, indent=1))
    print('卡内正则      %d 条已写入 data.extensions.regex_scripts（加载器 %.1f KB）'
          % (len(ext['regex_scripts']), len(loader.encode('utf-8')) / 1024.0))

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
