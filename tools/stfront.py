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

    # ---- 把加载器写进卡的 tavern_helper 脚本位 ----
    import uuid
    loader = io.open(os.path.join(OUT, 'loader.js'), encoding='utf-8').read().replace('__CDN__', CDN)
    card_fn = os.path.join(ROOT, 'st/roma.card.json')
    card = json.load(io.open(card_fn, encoding='utf-8'))
    ext = card['data'].setdefault('extensions', {})
    ext['tavern_helper'] = {
        'scripts': [{
            'type': 'script',
            'enabled': True,
            'name': '罗马纪 · 前端',
            # id 固定：换一个就是另一个脚本，玩家已开的启用状态会丢
            'id': str(uuid.uuid5(uuid.NAMESPACE_URL, 'roma.front.v1')),
            'content': loader,
            'info': '进入后接管整屏；点右上角 EXIRE ✕ 退出。',
            'button': {'enabled': True, 'buttons': [
                {'name': '进入罗马', 'visible': True},
                {'name': '退出罗马', 'visible': True},
            ]},
            'data': {},
            'export_with': {'data': True, 'button': True},
        }],
        'variables': {},
    }
    io.open(card_fn, 'w', encoding='utf-8').write(json.dumps(card, ensure_ascii=False, indent=1))
    print('卡内脚本      %.1f KB 已写入 data.extensions.tavern_helper' % (len(loader.encode('utf-8')) / 1024.0))

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
