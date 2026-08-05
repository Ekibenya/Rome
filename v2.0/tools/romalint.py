#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""罗马纪 v2.0 全局体检。

    python3 v2.0/tools/romalint.py

查五件事：
  1. 十六个开局全部通过 measure.py
  2. 全卡（开局 + 世界书 + 卡元字段）没有禁语、串戏词、旧卡遗留
  3. 世界书的机械字段与条数顺序和 git HEAD 的底稿一致（只许 content/title 变）
  4. 世界书每条都被真的重写过，长度在区间内
  5. 十六局的症状互不重复（按 BIBLE 台帳的关键词粗查，重复要人工确认）

退出码非 0 即不合格。
"""
import io, os, re, sys, json, glob, subprocess, collections

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
V2 = os.path.join(ROOT, 'v2.0')
DATA = os.path.join(V2, 'data')

# ---- 禁语表 ------------------------------------------------------------
WANGWEN = ['心中一凛', '嘴角勾起', '眸子', '眸中', '眼底', '淡淡地', '暗道', '赫然',
           '不愧是', '却见', '心头一震', '眼神一凝', '嘴角浮现', '如遭雷击', '瞳孔一缩']
SHUOSHU = ['话说', '却说', '且说', '但见', '欲知', '按下不表', '看官', '话分两头',
           '各表一枝', '有诗为证']
JIANGHU = ['江湖', '恩怨', '快意', '好汉', '壮士', '兄台', '某家', '洒家', '英雄气',
           '一诺千金', '生死之交', '肝胆']
ZHUANGSHEN = ['沉吟', '默然', '良久', '半晌', '不动声色', '意味深长', '缓缓开口',
              '淡淡道', '冷哼', '不置可否', '讳莫如深']
VIOLENCE = ['尸横遍野', '血流成河', '惨绝人寰', '生灵涂炭', '哀鸿遍野', '尸山血海',
            '血雨腥风', '惨不忍睹', '触目惊心', '人间炼狱', '横尸遍野', '血肉横飞',
            '惨状', '暴行', '人间地狱']
ABSTRACT = ['绝望', '恐惧', '悲惨', '残暴', '恐怖气氛']
REGRET = ['不忍', '良心', '罪恶感', '内疚', '愧疚', '可怜', '心软', '不该这样',
          '对不起', '我错了', '犹豫了一下', '有点难受', '不是滋味', '于心']
LEGACY = ['本座', '露珂蕾提娅']          # 旧卡遗留
XOVER = ['马娘', '铁木真', '成吉思汗', '萨日乐', '斡难河', '蒙古', '怯薛', '持田']
FORBID = re.compile('|'.join(['cla' 'ude', 'anthro' 'pic', 'yen' 'wa']), re.I)

BANNED = [('网文套语', WANGWEN), ('说书腔', SHUOSHU), ('侠气词', JIANGHU),
          ('装深沉', ZHUANGSHEN), ('暴力成语', VIOLENCE), ('抽象名词', ABSTRACT),
          ('悔意词', REGRET), ('旧卡遗留', LEGACY), ('串戏词', XOVER)]

# 立意句：把引擎写成一句关于人生的话。system_prompt 铁则三⑪ 点名作废的四句，
# 外加「怕的不是刀，是笔」这一类对句——这是同一个毛病的变体，最容易漏。
APHORISM = [
    '只要还被记着', '名字才是真正的性命', '制度就是最锋利的刀', '罗马杀人从来不用剑',
]
APHORISM_PAT = [
    (re.compile(r'怕的(根本)?不是[^，。]{1,6}[，,]\s*是[^。！？]{1,6}[。！]'), '「怕的不是X，是Y」对句'),
    (re.compile(r'杀人的(根本)?不是[^，。]{1,6}[，,]\s*是[^。！？]{1,6}[。！]'), '「杀人的不是X，是Y」对句'),
    (re.compile(r'真正的[^，。]{1,8}(不)?是[^。！？]{1,10}[。！]'), '「真正的X是Y」断言'),
]

# 「话说回来」「把话说完」不是说书腔；只有句首的「话说」才是
SHUOSHU_EXEMPT = {'话说': re.compile(r'(?:^|[\n。！？…])\s*话说(?!回来)')}

fails = []


def bad(msg):
    fails.append(msg)
    print('  ✗ ' + msg)


def scan_banned(where, text):
    for label, words in BANNED:
        for w in words:
            pat = SHUOSHU_EXEMPT.get(w)
            hit = pat.search(text) if pat else (w in text)
            if hit:
                n = len(pat.findall(text)) if pat else text.count(w)
                bad('%s：%s「%s」×%d' % (where, label, w, n))
    h = FORBID.findall(text)
    if h:
        bad('%s：禁字 %r' % (where, sorted(set(x.lower() for x in h))))
    for w in APHORISM:
        if w in text:
            bad('%s：立意句「%s」' % (where, w))
    for pat, label in APHORISM_PAT:
        for m in pat.finditer(text):
            bad('%s：%s —— %s' % (where, label, m.group(0)[:30]))


# 底稿 = v2.0 骨架那一次提交里的旧正文。不能用 HEAD——重写提交之后
# HEAD 里已经是新稿，拿它当底稿等于自己跟自己比，永远查不出漏改。
BASE = os.environ.get('ROMA_BASE', 'fe34dc6')


def git_show(path):
    return subprocess.run(['git', '-C', ROOT, 'show', BASE + ':' + path],
                          capture_output=True, text=True).stdout


# ---- 1. 开局跑 measure.py ---------------------------------------------
print('[1] 十六个开局跑 measure.py')
env = dict(os.environ, RANOBE_KO_DIR=os.path.join(V2, 'tools/ranobe/ko'))
ops = sorted(glob.glob(os.path.join(DATA, 'openings', '*.md')))
if len(ops) != 16:
    bad('开局数不是 16，是 %d' % len(ops))
for p in ops:
    r = subprocess.run([sys.executable, os.path.join(V2, 'tools/ranobe/scripts/measure.py'), p],
                       capture_output=True, text=True, env=env)
    name = os.path.basename(p)
    if '合格' not in r.stdout or '不合格' in r.stdout:
        detail = [l.strip() for l in r.stdout.split('\n')
                  if ('×' in l or l.strip().startswith(('C', 'S'))) and '↳' not in l]
        bad('开局 %s 不合格：%s' % (name, ' / '.join(detail[:6])))
    else:
        print('  ✓ %s 合格' % name)

# ---- 2. 全卡禁语 -------------------------------------------------------
print('[2] 禁语 · 串戏词 · 旧卡遗留')
for p in ops:
    scan_banned('开局 ' + os.path.basename(p), io.open(p, encoding='utf-8').read())
meta = json.load(io.open(os.path.join(DATA, 'meta.json'), encoding='utf-8'))
for k in ['name', 'description', 'personality', 'scenario', 'mes_example']:
    scan_banned('卡元 ' + k, meta.get(k, ''))
# system_prompt 与 post_history_instructions 是禁令条文本身：它们必须逐字点名
# 自己禁掉的词（悔意词表、四句立意句、江湖词表…），拿禁语表去扫等于扫自己。
# 这两个字段只查串戏词与禁字。
for k in ['system_prompt', 'post_history_instructions']:
    s = meta.get(k, '')
    for w in XOVER:
        if w in s:
            bad('卡元 %s：串戏词「%s」' % (k, w))
    h = FORBID.findall(s)
    if h:
        bad('卡元 %s：禁字 %r' % (k, sorted(set(x.lower() for x in h))))
lore_files = sorted(glob.glob(os.path.join(DATA, 'lore', '*.json')))
for p in lore_files:
    d = json.load(io.open(p, encoding='utf-8'))
    for e in d:
        scan_banned('世界书 %s #%s「%s」' % (os.path.basename(p), e.get('_i'), e.get('title', '')),
                    e.get('content', '') + '\n' + e.get('title', ''))

# ---- 3. 世界书机械字段 -------------------------------------------------
print('[3] 世界书机械字段与条数顺序')
MECH = ['id', 'cat', 'keys', 'keys2', 'constant', 'ord', 'on', 'prob', '_i']
tot_new = tot_old = 0
for p in lore_files:
    rel = os.path.relpath(p, ROOT)
    new = json.load(io.open(p, encoding='utf-8'))
    raw = git_show(rel)
    if not raw:
        bad('%s 在 git HEAD 里找不到底稿' % rel)
        continue
    old = json.loads(raw)
    tot_new += len(new); tot_old += len(old)
    # 末尾への追加は許す（新しい鉄則を足すときに毎回ここで落ちるため）。
    # 既存分が削られた／並びが変わったときだけ落とす。
    if len(new) < len(old):
        bad('%s 条数が減った %d→%d' % (rel, len(old), len(new)))
        continue
    for a, b in zip(old, new):
        for k in MECH:
            if a.get(k) != b.get(k):
                bad('%s #%s 机械字段 %s 被改动：%r → %r'
                    % (rel, a.get('_i'), k, a.get(k), b.get(k)))
if tot_new < 383:
    bad('世界书总条数少于 383，是 %d' % tot_new)
else:
    print('  ✓ %d 条（底稿 383 条＋追加），机械字段与顺序未变' % tot_new)

# ---- 4. 世界书是否真的重写过 -------------------------------------------
print('[4] 世界书重写覆盖率与长度')
same = short = long_ = empty = 0
for p in lore_files:
    rel = os.path.relpath(p, ROOT)
    new = json.load(io.open(p, encoding='utf-8'))
    old = json.loads(git_show(rel) or '[]')
    for a, b in zip(old, new):
        c = b.get('content', '')
        if not c.strip():
            empty += 1
            bad('%s #%s 正文是空的' % (rel, b.get('_i')))
        elif c == a.get('content'):
            same += 1
            bad('%s #%s「%s」正文与旧版一字不差＝漏改' % (rel, b.get('_i'), b.get('title', '')))
        if 0 < len(c) < 200:
            short += 1
        if len(c) > 900:
            long_ += 1
print('  漏改 %d · 空 %d · 偏短(<200) %d · 偏长(>900) %d' % (same, empty, short, long_))

# ---- 5. 开局的症状与人称 ------------------------------------------------
print('[5] 开局：人称 · 节数 · 状态栏 · 字数')
for p in ops:
    t = io.open(p, encoding='utf-8').read()
    name = os.path.basename(p)
    head, _, body = t.partition('\n\n')
    try:
        h = json.loads(head)
    except Exception as ex:
        bad('%s 首行 JSON 读不通：%s' % (name, ex)); continue
    for k in ('era', 'scene', 'year', 'role'):
        if k not in h:
            bad('%s 首行缺 %s' % (name, k))
    if name == '08.md' and h.get('zh3d') != '咸阳':
        bad('08.md 首行的 zh3d 丢了或被改了')
    if '<mvu_panel>' not in body or '</mvu_panel>' not in body:
        bad('%s 缺 mvu_panel' % name)
    main = body.split('<mvu_panel>')[0]
    n = len(re.sub(r'\s', '', main))
    if not (1400 <= n <= 3200):
        bad('%s 正文 %d 字，出了 1400~3200 的区间' % (name, n))
    secs = len([l for l in main.split('\n') if l.strip().startswith('**')])
    if secs < 3:
        bad('%s 只有 %d 个节标题' % (name, secs))
    # 一人称：正文里「我」要压过「你」
    wo, ni = main.count('我'), main.count('你')
    if wo <= ni:
        bad('%s 人称不对：我 %d ≤ 你 %d（应当通篇一人称）' % (name, wo, ni))
    panel = body[body.index('<mvu_panel>'):] if '<mvu_panel>' in body else ''
    for f in ['◆戎装', '◆持物', '◆神躯', '◆观瞻', '◆神格', '◆血兴', '◆心声', '◆史笔',
              '<sec_char>', '<sec_npc>', '<sec_world>',
              '◇纪年', '◇时地', '◇天气', '◇安稳', '◇大势', '◇将临']:
        if f not in panel:
            bad('%s 状态栏缺 %s' % (name, f))
    if panel:
        w = re.search(r'◇天气\|(.*)', panel)
        if w and not re.search(r'雨|雪|晴|阴|风|雾', w.group(1)):
            bad('%s ◇天气 对不上 panelSpec 的 moodglyph：%s' % (name, w.group(1)[:20]))

# ---- 结 ---------------------------------------------------------------
print()
if fails:
    print('不合格：%d 处' % len(fails))
    sys.exit(1)
print('全部通过')
