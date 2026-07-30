#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把角色卡 JSON 嵌进封面 PNG，产出 SillyTavern 图片角色卡。

结构照实测过的成品卡（FF7 回响）：`chara` 与 `ccv3` 两个 tEXt 块携带同一份
base64(JSON)——新版酒馆读 ccv3，旧版与各家分叉读 chara，两边都认。
封面里原有的一切文本类块（tEXt/zTXt/iTXt/eXIf）一律剥除，不留任何生成器痕迹。
打包前后各做一次禁字扫描与回读比对，任何一步不过直接拒绝产出。
"""
import base64, io, json, re, struct, sys, zlib

ART  = sys.argv[1] if len(sys.argv) > 1 else '/Users/han/Downloads/1370D2F9-AE77-43C4-8F25-E1EA6D7430D1.png'
CARD = sys.argv[2] if len(sys.argv) > 2 else 'st/roma.card.json'
OUT  = sys.argv[3] if len(sys.argv) > 3 else 'st/roma.card.png'

FORBID = re.compile(r'claude|anthropic|yenwa', re.I)

def chunk(typ, data):
    return (struct.pack('>I', len(data)) + typ + data
            + struct.pack('>I', zlib.crc32(typ + data) & 0xffffffff))

def main():
    card = json.load(io.open(CARD, encoding='utf-8'))
    payload = json.dumps(card, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
    hits = FORBID.findall(payload.decode('utf-8'))
    if hits:
        raise SystemExit('卡数据含禁字 %r，拒绝打包' % sorted(set(h.lower() for h in hits)))
    b64 = base64.b64encode(payload)

    raw = io.open(ART, 'rb').read()
    if raw[:8] != b'\x89PNG\r\n\x1a\n':
        raise SystemExit('封面不是 PNG')
    out = [raw[:8]]
    i = 8
    inserted = False
    while i < len(raw):
        ln  = struct.unpack('>I', raw[i:i+4])[0]
        typ = raw[i+4:i+8]
        dat = raw[i+8:i+8+ln]
        if typ in (b'tEXt', b'zTXt', b'iTXt', b'eXIf'):
            i += 12 + ln
            continue                       # 剥掉封面自带的一切文本/元数据块
        if typ == b'IDAT' and not inserted:
            out.append(chunk(b'tEXt', b'chara\x00' + b64))
            out.append(chunk(b'tEXt', b'ccv3\x00'  + b64))
            inserted = True
        out.append(raw[i:i+12+ln])
        i += 12 + ln
        if typ == b'IEND':
            break
    if not inserted:
        raise SystemExit('没找到 IDAT，无处插卡')
    blob = b''.join(out)
    io.open(OUT, 'wb').write(blob)

    # —— 回读自证：两个键都解出，且与源 JSON 逐字节一致 ——
    got = {}
    j = 8
    while j < len(blob):
        ln  = struct.unpack('>I', blob[j:j+4])[0]
        typ = blob[j+4:j+8]
        if typ == b'tEXt':
            k, _, v = blob[j+8:j+8+ln].partition(b'\x00')
            got[k.decode()] = base64.b64decode(v)
        j += 12 + ln
        if typ == b'IEND':
            break
    ok = got.get('chara') == payload and got.get('ccv3') == payload
    print('封面        %s (%.2f MB)' % (ART.split('/')[-1], len(raw)/1048576))
    print('卡数据      %.2f MB → base64 %.2f MB ×2 键' % (len(payload)/1048576, len(b64)/1048576))
    print('成品        %s (%.2f MB)' % (OUT, len(blob)/1048576))
    print('回读自证    %s' % ('PASS 两键均与源逐字节一致' if ok else 'FAIL'))
    if not ok:
        raise SystemExit(1)

if __name__ == '__main__':
    main()
