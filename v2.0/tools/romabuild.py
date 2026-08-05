#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""罗马纪 v2.0 组装：v2.0/data/* → v2.0/roma.card.json

来源：
  v2.0/data/meta.json          卡元字段与 panelSpec
  v2.0/data/openings/NN.md     开局（首行 JSON 头 + 正文）
  v2.0/data/lore/*.json        世界书（每条带 _i 记原始顺序）
  st/roma.card.json            只取壳：regex_scripts 与文档母版

产出：
  v2.0/roma.card.json          chara_card_v3 成品
  v2.0/roma.doc.html           注入新数据后的主文档（便于比对，不进卡）

原版 st/ 与 core/ 一个字节都不动。
"""
import io, os, re, sys, json, glob, gzip, base64

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
V2 = os.path.join(ROOT, 'v2.0')
DATA = os.path.join(V2, 'data')
OLD = os.path.join(ROOT, 'st/roma.card.json')

VER = '2.0'

# 推到 GitHub 的东西里不许出现的字样
FORBID = re.compile('|'.join(['cla' 'ude', 'anthro' 'pic', 'yen' 'wa']), re.I)
# 串戏词：姊妹卡（草原那张）的专有名词一律不许漏进罗马卡
XOVER = ['马娘', '铁木真', '成吉思汗', '萨日乐', '斡难河', '蒙古', '怯薛', '持田']


def load_openings():
    ops = []
    for p in sorted(glob.glob(os.path.join(DATA, 'openings', '*.md'))):
        raw = io.open(p, encoding='utf-8').read()
        head, _, body = raw.partition('\n\n')
        h = json.loads(head)
        oid = int(os.path.basename(p).split('.')[0])
        o = {'id': oid}
        # zh3d 之类的额外键（前端拿去挑 3D 场景）原样带过去，顺序照首行写的来
        o.update({k: v for k, v in h.items() if k not in ('id', 'text')})
        o['text'] = body.strip()
        for k in ('era', 'scene', 'year'):
            if k not in o:
                raise SystemExit('%s 首行缺 %s' % (os.path.basename(p), k))
        ops.append(o)
    ops.sort(key=lambda o: o['id'])
    assert [o['id'] for o in ops] == list(range(len(ops))), '开局编号不连续'
    return ops


def load_lore():
    lb = []
    for p in sorted(glob.glob(os.path.join(DATA, 'lore', '*.json'))):
        lb.extend(json.load(io.open(p, encoding='utf-8')))
    assert sorted(e['_i'] for e in lb) == list(range(len(lb))), '世界书 _i 不连续'
    lb.sort(key=lambda e: e['_i'])
    for e in lb:
        e.pop('_i', None)
    return lb


def dedupe(seq):
    seen, out = set(), []
    for x in seq:
        x = str(x).strip()
        if x and x not in seen:
            seen.add(x); out.append(x)
    return out


def entries(lorebook):
    """内部 schema → chara_card_v3 的 character_book.entries（照搬 tools/stcard.py 的对应关系）。"""
    out = []
    for i, e in enumerate(lorebook):
        keys = dedupe(e.get('keys') or [])
        sec = dedupe(e.get('keys2') or [])
        if not keys and not e.get('constant'):
            raise SystemExit('第 %d 条既无 keys 又非常驻，永远不会触发：%s' % (i, e.get('title')))
        ext = {'cat': e.get('cat', '')}
        if e.get('id'):
            ext['id'] = e['id']
        if e.get('prob') is not None:
            ext['prob'] = e['prob']
        out.append({
            'id': i + 1,
            'keys': keys,
            'secondary_keys': sec,
            'comment': e.get('title', ''),
            'content': e.get('content', ''),
            'constant': bool(e.get('constant', False)),
            'selective': bool(sec),
            'insertion_order': int(e['ord']) if e.get('ord') is not None else 100,
            'enabled': bool(e.get('on', True)),
            'position': 'before_char',
            'case_sensitive': False,
            'name': e.get('title', ''),
            'priority': 10,
            'extensions': {'roma': ext},
        })
    return out


def inject_doc(old_doc_b64, src):
    """把新的 __GAME_ROMA__ 换进主文档，再压回 base64。"""
    html = gzip.decompress(base64.b64decode(old_doc_b64)).decode('utf-8')
    m = re.search(r'(<script id="cardRoma">[\s\S]*?window\.__GAME_ROMA__\s*=\s*)', html)
    if not m:
        raise SystemExit('主文档里找不到 cardRoma')
    i = m.end()
    d = 0
    for k, ch in enumerate(html[i:], i):
        if ch == '{':
            d += 1
        elif ch == '}':
            d -= 1
            if d == 0:
                end = k + 1
                break
    else:
        raise SystemExit('cardRoma 括号不配平')
    blob = json.dumps(src, ensure_ascii=False, separators=(',', ':'))
    html = html[:i] + blob + html[end:]
    raw = gzip.compress(html.encode('utf-8'), 9, mtime=0)
    return base64.b64encode(raw).decode('ascii'), html


def main():
    meta = json.load(io.open(os.path.join(DATA, 'meta.json'), encoding='utf-8'))
    src = dict(meta)
    src['openings'] = load_openings()
    src['lorebook'] = load_lore()

    scan = json.dumps(src, ensure_ascii=False)
    hits = FORBID.findall(scan)
    if hits:
        raise SystemExit('含禁字 %r，拒绝打包' % sorted(set(h.lower() for h in hits)))
    for w in XOVER:
        if w in scan:
            raise SystemExit('含串戏词 %r，拒绝打包' % w)

    old = json.load(io.open(OLD, encoding='utf-8'))
    doc_b64, html = inject_doc(old['data']['extensions']['roma_assets']['doc'], src)

    ops = src['openings']
    card = {
        'spec': 'chara_card_v3',
        'spec_version': '3.0',
        'data': {
            'name': '%s v%s' % (src['name'], VER),
            'description': src['description'],
            'personality': src['personality'],
            'scenario': src['scenario'],
            'first_mes': ops[0]['text'],
            'mes_example': src['mes_example'],
            'creator_notes': '',
            'system_prompt': src['system_prompt'],
            'post_history_instructions': src['post_history_instructions'],
            'alternate_greetings': [o['text'] for o in ops[1:]],
            'group_only_greetings': [],
            'tags': [],
            'creator': 'ekibenya',
            'character_version': VER,
            'character_book': {
                'name': src['name'] + ' · 世界书',
                'description': '',
                'scan_depth': 4,
                'token_budget': 2048,
                'recursive_scanning': False,
                'extensions': {},
                'entries': entries(src['lorebook']),
            },
            'extensions': {
                'roma': {
                    'line': 'roma',
                    'panelSpec': src['panelSpec'],
                    'openings': [{'i': i, 'id': o['id'], 'era': o['era'],
                                  'scene': o['scene'], 'year': o['year']}
                                 for i, o in enumerate(ops)],
                },
                'regex_scripts': old['data']['extensions']['regex_scripts'],
                'roma_assets': {
                    'v': old['data']['extensions']['roma_assets']['v'],
                    'doc': doc_b64,
                    'engines': old['data']['extensions']['roma_assets']['engines'],
                    'packs': old['data']['extensions']['roma_assets']['packs'],
                },
            },
        },
    }

    check(card, src)

    out = os.path.join(V2, 'roma.card.json')
    json.dump(card, io.open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    io.open(os.path.join(V2, 'roma.doc.html'), 'w', encoding='utf-8').write(html)
    print('写出 %s  %.2f MB' % (out, os.path.getsize(out) / 1048576.0))
    print('开局 %d  世界书 %d 条  正文合计 %d 字'
          % (len(ops), len(src['lorebook']),
             sum(len(o['text']) for o in ops)
             + sum(len(e['content']) for e in src['lorebook'])))


def check(card, src):
    """打包完自查一遍，别把正文改坏了。"""
    d = card['data']; ops = src['openings']; lb = src['lorebook']
    bad = []
    if d['first_mes'] != ops[0]['text']:
        bad.append('first_mes 与 openings[0] 不符')
    if len(d['alternate_greetings']) != len(ops) - 1:
        bad.append('开局数不对')
    for i, o in enumerate(ops[1:]):
        if d['alternate_greetings'][i] != o['text']:
            bad.append('alternate_greetings[%d] 与源不符' % i)
    ents = d['character_book']['entries']
    if len(ents) != len(lb):
        bad.append('世界书条数不对 %d≠%d' % (len(ents), len(lb)))
    for i, (a, b) in enumerate(zip(ents, lb)):
        if a['content'] != b['content']:
            bad.append('世界书第 %d 条正文不符' % i)
        if not a['keys'] and not a['constant']:
            bad.append('世界书第 %d 条不可能触发' % i)
    for f in ['name', 'description', 'first_mes', 'alternate_greetings',
              'group_only_greetings', 'tags', 'creator', 'character_version',
              'extensions', 'character_book']:
        if f not in d:
            bad.append('data 缺 %s' % f)
    for i, e in enumerate(ents):
        if not e['content'].strip():
            bad.append('世界书第 %d 条正文是空的' % i)
    for i, o in enumerate(ops):
        if '<mvu_panel>' not in o['text'] or '</mvu_panel>' not in o['text']:
            bad.append('开局 %d 缺 mvu_panel' % i)
    if bad:
        raise SystemExit('自查不过：\n  ' + '\n  '.join(bad))


if __name__ == '__main__':
    main()
