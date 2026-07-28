/* ============================================================
   ROMA.SYS —— 地中海三维 · 环海诸城游历模块 (med3d)
   罗马帝都(历史布局:双轴+Forum+斗兽场+引水道) / 希腊polis(卫城+agora) /
   港城(码头+船队) / 军镇 / 圣域 / 村庄(无巨像) —— 布局法则出自
   cardo-decumanus 网格与 Hippodamian 规划考据；资产：AncientGreece +
   MythologicBeasts 全量 381 模型（营造清单全量收录，一个不少）。
   API 面与 zj3d 完全同构：onRender/onStory/setEra/paneH/command/applyEdict。
   ============================================================ */
(function () {
  'use strict';
  if (!window.THREE || !window.ZJ_GLTFLoader) return;
  var T = window.THREE;
  var BASE = (function () {
    var s = document.currentScript && document.currentScript.src;
    if (s) return s.slice(0, s.lastIndexOf('/') + 1);
    return 'core/';
  })();

  var Z = window.MED3D = {
    ready: false, failed: false, loading: false, prog: 0,
    expanded: false, mode: 'city',
    cv: null, rnd: null, lib: {}, names: [], tex: null, mat: null,
    scene: null, cam: null, cityKey: '', pending: null,
    player: null, colliders: [], keys: {}, joy: { on: false, x: 0, y: 0 },
    camYaw: 0, camPitch: 0.34, camDist: 14, lastLoc: null, night: false,
    chipText: '', eraText: '', build: null,
    owns: function () { return this.ready && !this.failed; }
  };
  try { Z.expanded = localStorage.getItem('med3d_expand') === '1'; } catch (e) { }

  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { var a = hash(seed); return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  /* ---------------- 资材：ZJP1 容器（滚动异或） ---------------- */
  var PACK = 'core/res/data/idx/v1/f9b92394f3.dat', KEY = 'RomaAeternaMareNostrum';
  function unpack(ab) {
    var u = new Uint8Array(ab);
    for (var i = 0; i < u.length; i++) u[i] ^= (KEY.charCodeAt(i % KEY.length) + ((i * 7) & 0xff)) & 0xff;
    if (u[0] !== 90 || u[1] !== 74 || u[2] !== 80 || u[3] !== 49) throw new Error('bad pack');
    var dv = new DataView(u.buffer, u.byteOffset, u.byteLength);
    var n = dv.getUint32(4, true), off = 8, metas = [], dec = new TextDecoder();
    for (var j = 0; j < n; j++) {
      var nl = dv.getUint16(off, true); off += 2;
      var name = dec.decode(u.subarray(off, off + nl)); off += nl;
      var len = dv.getUint32(off, true); off += 4;
      metas.push([name, len]);
    }
    var out = {};
    metas.forEach(function (m) { out[m[0]] = u.subarray(off, off + m[1]); off += m[1]; });
    return out;
  }
  function loadAll() {
    if (Z.loading || Z.ready || Z.failed) return;
    Z.loading = true;
    var loader = new window.ZJ_GLTFLoader();
    if (window.ZJ_MeshoptDecoder) loader.setMeshoptDecoder(window.ZJ_MeshoptDecoder);
    fetch(BASE.indexOf('/chunks/') >= 0 ? PACK : PACK).then(function (r) {
      if (!r.ok) throw new Error('pack http ' + r.status);
      return r.arrayBuffer();
    }).then(function (ab) {
      var pk = unpack(ab); Z.prog = .35; updateHud();
      var texUrl = URL.createObjectURL(new Blob([pk['tex/TexturaLowPoly.png']], { type: 'image/png' }));
      return new T.TextureLoader().loadAsync(texUrl).then(function (tx) {
        URL.revokeObjectURL(texUrl);
        tx.colorSpace = T.SRGBColorSpace; tx.flipY = false;
        Z.tex = tx; Z.mat = new T.MeshLambertMaterial({ map: tx });
        Z.prog = .5; updateHud();
        return new Promise(function (res, rej) { loader.parse(pk['med.glb'].slice().buffer, '', res, rej); });
      });
    }).then(function (g) {
      g.scene.children.forEach(function (n) {
        if (!n.name) return;
        n.traverse(function (m) { if (m.isMesh) { m.geometry.computeVertexNormals(); m.material = Z.mat; } });
        Z.lib[n.name] = n;
      });
      Z.names = Object.keys(Z.lib);
      buildPools(); buildCatalog();
      Z.ready = true; Z.loading = false; Z.prog = 1;
      if (Z.pending) { var p = Z.pending; Z.pending = null; showLocation(p[0], p[1]); }
      if (window.ZJ3D_onExpand) window.ZJ3D_onExpand();
      updateHud();
    }).catch(function (e) {
      console.warn('med3d assets failed', e); Z.failed = true; Z.loading = false; updateHud();
    });
  }

  /* ---------------- 全量模型分类（381 个，一个不漏：未匹配自动落入 curio 池入市集） ---------------- */
  var POOLS = {};
  var CLASS = [
    ['gods', /^(Zeus|Seat Zeus|Hera|Poseidon|Athenea|Artemisa|Afrodita|Achiles|Angel)/i],
    ['statue', /Statue|Half-done/i],
    ['civic', /^(Senate|University|Titus Arch|Amphitheatre|Aqueduct)/i],
    ['temple', /^(Tenple|Altar|Ruined Pillar|Monumental Torch)/i],
    ['house', /^House/i],
    ['rural', /^(Farm|Grape Farm|Water Mill|Aserradero|Stable|straw bale|Mushroom|Scarecrow|Windmill|Hay)/i],
    ['port', /^(Dock|Sailboat|Rowerboat|Fishing boat)/i],
    ['military', /^(Barracks|Balista|Battering Ram|Siege Tower|Big Open War Tent|Big War Tent|War Tent|Small Tent|Wall Tower|Watchtower|Troy Horse|War Elephant|War Heavy Elephant|Catapult)/i],
    ['nature', /^(rock|Rock|Tree|Pine|No leaf|Water Ily|Bush|Flower|Grass)/i],
    ['street', /^(Streetlight|Big Torch|Floor Torch|Bench|Banner|Flag|Hanging Flag|Well|Fountain|Stairs|Campfire|Blacksmith)/i],
    ['market', /^(Jar|Basket|Closed Barrel|Opened Barrel|Shop Box|Spice Bucket|Cart$|Horse Cart|Map with Table|Circular Table|Tool table|Weapon shelf|Anvil|Mallet|Bag$|Boxing bag|Bread|Fish|Meat|Fruit|Wine)/i],
    ['animal', /Horse/i],
    ['figure', /^(male|female|Women holding jar|Bald)/i],
    ['beast', /^(Centaur|Fauno|Gorgona|Minotaur)/i],
    ['landmark', /^(Rodas Colose|Partenon|Hippodrome|Oraculus|Puente|Trireme)/i]
  ];
  function buildPools() {
    var used = {};
    CLASS.forEach(function (c) { POOLS[c[0]] = []; });
    POOLS.curio = [];
    Z.names.forEach(function (n) {
      var hit = false;
      var disp = n.replace(/_/g, ' ');
      CLASS.forEach(function (c) { if (!hit && c[1].test(disp)) { POOLS[c[0]].push(n); hit = true; used[n] = 1; } });
      if (!hit) POOLS.curio.push(n); /* 兵甲衣饰礼器等散件 → 市集/铁匠/军帐陈列 */
    });
  }

  /* ---------------- 环海诸城：样式路由（SITES 简繁双写匹配） ---------------- */
  var LOCS = [
    { k: 'ROMA', al: ['罗马', '羅馬', 'ROMA'], style: 'rome' },
    { k: 'ATHENAE', al: ['雅典', 'ATHENAE'], style: 'polis' },
    { k: 'SPARTA', al: ['斯巴达', '斯巴達', 'SPARTA'], style: 'military' },
    { k: 'CARTHAGO', al: ['迦太基', 'CARTHAGO'], style: 'port' },
    { k: 'CARTHAGO NOVA', al: ['新迦太基'], style: 'port' },
    { k: 'ALEXANDRIA', al: ['亚历山卓', '亞歷山卓', '亚历山大', 'ALEXANDRIA'], style: 'port' },
    { k: 'BYZANTIVM', al: ['拜占庭', '君士坦丁堡', 'BYZANTIVM', 'CONSTANTINOPOLIS'], style: 'port' },
    { k: 'SYRACVSAE', al: ['叙拉古', '敘拉古', 'SYRACVSAE'], style: 'port' },
    { k: 'MASSILIA', al: ['马西利亚', '馬西利亞', 'MASSILIA'], style: 'port' },
    { k: 'GADES', al: ['加德斯', 'GADES'], style: 'port' },
    { k: 'TARENTVM', al: ['塔兰托', '塔蘭托'], style: 'port' },
    { k: 'TYRVS', al: ['推罗', '推羅', '西顿', '西頓'], style: 'port' },
    { k: 'CORINTHVS', al: ['科林斯'], style: 'polis' },
    { k: 'PELLA', al: ['佩拉'], style: 'polis' },
    { k: 'PERGAMVM', al: ['帕加马', '帕加馬'], style: 'polis' },
    { k: 'EPHESVS', al: ['以弗所'], style: 'polis' },
    { k: 'DELPHI', al: ['德尔斐', '德爾斐', '奥林匹亚', '奧林匹亞'], style: 'sanctuary' },
    { k: 'CYRENE', al: ['昔兰尼', '昔蘭尼', '佩特拉'], style: 'town' },
    { k: 'LVTETIA', al: ['卢泰西亚', '盧泰西亞', '伦丁尼恩', '倫丁尼恩', '特里尔', '特里爾', '阿奎莱亚', '阿奎萊亞'], style: 'town' },
    { k: 'VICVS', al: ['村', '庄', '莊', '乡', '鄉', '田', '农', '農'], style: 'village' }
  ];
  Z.match = function (td) {
    td = String(td || '');
    for (var i = 0; i < LOCS.length; i++)
      for (var j = 0; j < LOCS[i].al.length; j++)
        if (td.indexOf(LOCS[i].al[j]) >= 0) return LOCS[i];
    return LOCS[0];
  };

  /* ---------------- three 场景 ---------------- */
  function ensureRenderer() {
    if (Z.rnd) return;
    Z.cv = document.createElement('canvas');
    Z.cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    Z.rnd = new T.WebGLRenderer({ canvas: Z.cv, antialias: !PERF.low, alpha: false });
    Z.rnd.setPixelRatio(PERF.low ? 1 : Math.min(devicePixelRatio || 1, 2));
    Z.cam = new T.PerspectiveCamera(55, 16 / 9, .1, 900);
    animate();
  }
  var PERF = { low: false };
  try { PERF.low = localStorage.getItem('med3d_lowfx') === '1'; } catch (e) { }
  function perfSave() { try { localStorage.setItem('med3d_lowfx', PERF.low ? '1' : '0'); } catch (e) { } }

  function normName(n){return String(n||'').replace(/\./g,'').replace(/\s/g,'_');}
  function inst(name) {
    var t = Z.lib[name] || Z.lib[normName(name)]; if (!t) return null;
    var c = t.clone(true); return c;
  }
  var tinfo = {};
  function info(name) {
    if (tinfo[name]) return tinfo[name];
    var n = Z.lib[name] || Z.lib[normName(name)]; if (!n) return null;
    var bb = new T.Box3().setFromObject(n);
    var s = new T.Vector3(); bb.getSize(s);
    return (tinfo[name] = { w: s.x, h: s.y, d: s.z, r: Math.max(s.x, s.z) / 2 });
  }
  /* 离群模型定标：个别资材以纪念碑尺度制作，按史实压回合理身量 */
  var SCALE = { 'Altar': .12, 'Troy_Horse': .3, 'Rodas_Colose': .45, 'Oraculus': .8, 'Partenon': .8, 'Infantery': .35, 'Triangular_Sail': .3, 'Monumental_Torch': .45 };
  function put(g, name, x, z, ry, sc) {
    var o = inst(name); if (!o) return null;
    o.position.set(x, terrainY(x, z), z);
    o.rotation.y = ry || 0;
    sc = (sc || 1) * (SCALE[name] || SCALE[normName(name)] || 1);
    if (sc !== 1) o.scale.multiplyScalar(sc);
    g.add(o);
    var i = info(name);
    if (i && i.r > .7) Z.colliders.push({ x: x, z: z, r: Math.min(i.r * (sc || 1), 9) });
    return o;
  }

  /* ---------------- 地中海地形：丘陵/海岸/七丘 ---------------- */
  var TER = { sea: false, hill: null, size: 220 };
  function terrainY(x, z) {
    if (!TER.hill) return 0;
    var h = TER.hill;
    var y = Math.sin(x * .021 + h.a) * Math.cos(z * .019 + h.b) * h.amp
      + Math.sin(x * .0072 + h.c) * h.amp2;
    if (TER.sea && z > TER.shore - 8) { /* 岸线向海压平并下潜 */
      var t = Math.min(1, (z - (TER.shore - 8)) / 14);
      y = y * (1 - t) - t * 2.2;
    }
    if (h.terrace) { /* 罗马七丘：台地量化 */
      var q = 2.6; y = Math.round(y / q) * q * .85 + y * .15;
    }
    return Math.max(TER.sea && z > TER.shore ? -2.2 : 0, y) * (z > TER.shore ? 0 : 1) + (z > TER.shore ? -1.6 : 0);
  }
  function buildTerrain(style, R) {
    TER.sea = (style === 'port');
    TER.shore = 34;
    TER.hill = { a: R() * 9, b: R() * 9, c: R() * 9, amp: style === 'village' ? 1.1 : 1.7, amp2: style === 'rome' ? 2.2 : 1.2, terrace: style === 'rome' };
    var seg = PERF.low ? 64 : 110, sz = TER.size;
    var gnd = new T.PlaneGeometry(sz, sz, seg, seg);
    gnd.rotateX(-Math.PI / 2);
    var pos = gnd.attributes.position;
    for (var i = 0; i < pos.count; i++) pos.setY(i, terrainY(pos.getX(i), pos.getZ(i)));
    gnd.computeVertexNormals();
    var dry = style === 'village' ? 0x93a25f : style === 'sanctuary' ? 0x9aa86d : 0x8da362;
    var g = new T.Mesh(gnd, new T.MeshLambertMaterial({ color: dry }));
    g.receiveShadow = false; Z.scene.add(g);
    if (TER.sea) {
      var sea = new T.Mesh(new T.PlaneGeometry(sz * 2, sz), new T.MeshLambertMaterial({ color: 0x2e6f8e, transparent: true, opacity: .92 }));
      sea.rotation.x = -Math.PI / 2; sea.position.set(0, -.35, TER.shore + sz / 2 - 4);
      Z.scene.add(sea);
    }
  }
  function road(x1, z1, x2, z2, w) {
    var dx = x2 - x1, dz = z2 - z1, L = Math.sqrt(dx * dx + dz * dz);
    var m = new T.Mesh(new T.PlaneGeometry(L, w || 3), new T.MeshLambertMaterial({ color: 0x8f8578 }));
    m.rotation.x = -Math.PI / 2; m.rotation.z = -Math.atan2(dz, dx);
    m.position.set((x1 + x2) / 2, terrainY((x1 + x2) / 2, (z1 + z2) / 2) + .07, (z1 + z2) / 2);
    Z.scene.add(m);
  }
  function pick(R, pool) { var p = POOLS[pool]; return p && p.length ? p[(R() * p.length) | 0] : null; }
  function scatter(g, R, pool, n, x0, z0, rad, sc) {
    for (var i = 0; i < n; i++) {
      var a = R() * Math.PI * 2, r = Math.sqrt(R()) * rad;
      var nm = pick(R, pool), fo = info(nm);
      var cap = (fo && Math.max(fo.w, fo.h, fo.d) > 9) ? 6 / Math.max(fo.w, fo.h, fo.d) : 1;
      put(g, nm, x0 + Math.cos(a) * r, z0 + Math.sin(a) * r, R() * Math.PI * 2, (sc || 1) * cap);
    }
  }
  function colonnade(g, name, x0, z0, x1, z1, gap) {
    var dx = x1 - x0, dz = z1 - z0, L = Math.sqrt(dx * dx + dz * dz), n = Math.max(2, Math.floor(L / gap));
    for (var i = 0; i <= n; i++) put(g, name, x0 + dx * i / n, z0 + dz * i / n, Math.atan2(dx, dz));
  }

  /* ---------------- 布局法则（历史考据）：七式聚落 ---------------- */
  function layoutRome(g, R) {
    /* 双轴：cardo(南北) × decumanus(东西)，交汇即 Forum Romanum */
    road(-95, 0, 95, 0, 5); road(0, -95, 0, 95, 5);
    for (var i = 1; i <= 3; i++) { road(-80, -i * 22, 80, -i * 22, 2.2); road(-80, i * 22, 80, i * 22, 2.2); road(-i * 26, -80, -i * 26, 80, 2.2); road(i * 26, -80, i * 26, 80, 2.2); }
    /* Forum：元老院+提图斯凯旋门+神庙+巴西利卡意象 */
    put(g, 'Senate', -9, -8, Math.PI / 2, 1.15);
    put(g, 'Titus Arch', 0, 7, 0, 1.1);
    put(g, 'Tenple', 10, -9, -Math.PI / 2); put(g, 'Tenple.001', 16, -3, -Math.PI / 2);
    put(g, 'Altar', 4, -3, 0); put(g, 'Monumental Torch', -4, 3, 0); put(g, 'Monumental Torch', 4, 3, 0);
    colonnade(g, 'Ruined Pillar', -14, 12, 14, 12, 4);
    /* Capitoline 台地：主神庙+Jupiter(Seat Zeus 充任)+众神像 */
    put(g, 'Seat Zeus', -34, -30, Math.PI / 4, 1.2);
    put(g, 'University', -46, -22, Math.PI / 2);
    ['Zeus', 'Hera', 'Athenea', 'Poseidon', 'Artemisa', 'Afrodita', 'Achiles', 'Angel'].forEach(function (s, i) {
      put(g, 'Statue Base' + (i % 2 ? '.001' : ''), -52 + i * 7, -40, 0);
      put(g, s, -52 + i * 7, -40, Math.PI, .9);
    });
    /* 斗兽场·大竞技场·台伯石桥与引水道 */
    put(g, 'Amphitheatre', 52, 34, -Math.PI / 3, 1.35);
    put(g, 'Hippodrome ', -58, 34, Math.PI / 2, 1);
    put(g, 'Puente', 74, -20, Math.PI / 2, 1);
    put(g, 'Aqueduct', -20, 52, 0, 1.2); put(g, 'Aqueduct', -52, 52, 0, 1.2); put(g, 'Aqueduct', 12, 52, 0, 1.2);
    /* insulae 民居网格 + 市集 + 街具 */
    var hs = POOLS.house;
    for (var bx = -3; bx <= 3; bx++) for (var bz = -3; bz <= 3; bz++) {
      if (Math.abs(bx) < 1 && Math.abs(bz) < 1) continue;
      if (R() < .22) continue;
      var x = bx * 26 + (R() - .5) * 8, z = bz * 22 + (R() - .5) * 6;
      if (Math.abs(x) < 20 && Math.abs(z) < 16) continue;
      put(g, hs[(R() * hs.length) | 0], x, z, ((R() * 4) | 0) * Math.PI / 2);
    }
    scatter(g, R, 'market', 26, 30, -30, 16, 1);
    scatter(g, R, 'curio', 30, 30, -30, 18, 1);
    scatter(g, R, 'street', 22, 0, 0, 60, 1);
    scatter(g, R, 'figure', 8, 0, 0, 40, 1);
    scatter(g, R, 'animal', 6, -30, 30, 18, 1);
    put(g, 'Blacksmith', 34, 18, Math.PI); put(g, 'Stable', -34, 30, Math.PI / 2);
    put(g, 'Fountain', -6, 16, 0); put(g, 'Fountain.001', 26, -6, 0);
    scatter(g, R, 'nature', 26, 0, 0, 92, 1);
  }
  function layoutPolis(g, R, L) {
    /* 卫城高地(神庙+主神像) + agora(柱廊+市集) + 希波丹姆网格民居；雅典=帕特农 */
    var acX = -40, acZ = -40;
    put(g, (L && L.k === 'ATHENAE') ? 'Partenon' : 'Tenple', acX, acZ, Math.PI / 4, 1);
    put(g, 'Altar.001', acX + 9, acZ + 6, 0);
    var god = pick(R, 'gods'); put(g, 'Statue Base.002', acX - 8, acZ + 7, 0); put(g, god, acX - 8, acZ + 7, Math.PI / 4, .95);
    colonnade(g, 'Ruined Pillar.001', acX - 14, acZ + 14, acX + 14, acZ + 14, 4.5);
    put(g, 'Stairs', acX + 2, acZ + 17, Math.PI);
    road(acX, acZ + 16, 0, 0, 3);
    /* agora */
    colonnade(g, 'Ruined Pillar', -12, 10, 12, 10, 4);
    scatter(g, R, 'market', 20, 0, 0, 13, 1);
    scatter(g, R, 'curio', 22, 0, 0, 15, 1);
    put(g, 'Fountain', 0, -8, 0); put(g, 'Well', 14, 4, 0);
    /* 网格民居 */
    for (var i = 1; i <= 2; i++) { road(-60, i * 18, 60, i * 18, 2); road(-60, -i * 18 - 0.01, 60, -i * 18, 2); }
    road(-30, -60, -30, 60, 2); road(30, -60, 30, 60, 2);
    var hs = POOLS.house;
    for (var bx = -2; bx <= 2; bx++) for (var bz = -2; bz <= 2; bz++) {
      if (!bx && !bz) continue; if (R() < .3) continue;
      put(g, hs[(R() * hs.length) | 0], bx * 30 + (R() - .5) * 9, bz * 18 + 9 + (R() - .5) * 5, ((R() * 4) | 0) * Math.PI / 2);
    }
    put(g, 'University', 40, -20, -Math.PI / 2);
    put(g, 'Blacksmith', -22, 26, 0);
    scatter(g, R, 'street', 14, 0, 0, 42, 1);
    scatter(g, R, 'figure', 6, 0, 4, 24, 1);
    scatter(g, R, 'nature', 30, 0, 0, 88, 1);
    scatter(g, R, 'rural', 6, 55, 40, 22, 1);
  }
  function layoutPort(g, R, L) {
    /* 岸线在 +Z：码头伸海、船列锚泊、岸仓市肆，城内朝内陆生长 */
    put(g, 'Dock', 0, TER.shore + 2, 0, 1.2);
    put(g, 'Dock', -22, TER.shore + 2, 0, 1.2);
    if (L && L.k === 'ALEXANDRIA') put(g, 'Rodas Colose', 34, TER.shore + 3, Math.PI, .85);
    ['Trireme basic', 'Trireme Without Sail', 'Trireme con double Height'].forEach(function (b, i) {
      var o = inst(b); if (!o) return;
      o.position.set(30 + i * 20, -.15, TER.shore + 22 + R() * 8);
      o.rotation.y = Math.PI / 2 + (R() - .5) * .5; g.add(o);
    });
    ['Sailboat basic', 'Sailboat Duo', 'Sailboat with cublicle', 'Fishing boat', 'Rowerboat con Toldo', 'Rowerboat con cabina'].forEach(function (b, i) {
      var o = inst(b); if (!o) return;
      o.position.set(-34 + i * 13 + (R() - .5) * 4, -.15, TER.shore + 9 + R() * 10);
      o.rotation.y = R() * Math.PI * 2; g.add(o);
    });
    put(g, 'Watchtower', 26, TER.shore - 2, Math.PI, 1.1);
    put(g, 'Wall Tower', -40, TER.shore - 3, Math.PI);
    road(0, TER.shore, 0, -50, 3.4); road(-36, TER.shore - 10, 36, TER.shore - 10, 3);
    scatter(g, R, 'market', 24, 0, TER.shore - 16, 15, 1);
    scatter(g, R, 'curio', 20, -14, TER.shore - 18, 13, 1);
    put(g, 'Blacksmith', 16, TER.shore - 20, Math.PI / 2);
    var hs = POOLS.house;
    for (var i = 0; i < 12; i++) {
      if (R() < .18) continue;
      put(g, hs[(R() * hs.length) | 0], -44 + (i % 4) * 26 + (R() - .5) * 8, -6 - ((i / 4) | 0) * 20 + (R() - .5) * 6, ((R() * 4) | 0) * Math.PI / 2);
    }
    put(g, 'Tenple.001', 34, -34, -Math.PI / 2);
    put(g, 'Well.001', -8, -12, 0);
    scatter(g, R, 'street', 12, 0, -8, 34, 1);
    scatter(g, R, 'figure', 6, 0, TER.shore - 14, 18, 1);
    scatter(g, R, 'animal', 4, -30, -20, 12, 1);
    scatter(g, R, 'nature', 22, 0, -46, 60, 1);
    scatter(g, R, 'rural', 4, 48, -40, 18, 1);
  }
  function layoutMilitary(g, R) {
    /* 斯巴达式军镇：营垒方阵+校场+器械，朴素无华 */
    road(-60, 0, 60, 0, 3); road(0, -60, 0, 60, 3);
    put(g, 'Barracks', -18, -14, Math.PI / 2); put(g, 'Barracks.001', 18, -14, -Math.PI / 2);
    ['Big War Tent', 'Big Open War Tent', 'War Tent', 'Small Tent'].forEach(function (t, i) {
      for (var j = 0; j < 3; j++) put(g, t, -30 + i * 20 + (R() - .5) * 6, 18 + j * 14 + (R() - .5) * 5, R() * Math.PI * 2);
    });
    put(g, 'Balista', 8, -30, R() * 6); put(g, 'Balista.001', -8, -34, R() * 6);
    put(g, 'Battering Ram', 20, -34, R() * 6); put(g, 'Siege Tower', 32, -28, 0);
    put(g, 'Troy Horse', -32, -30, Math.PI / 5);
    put(g, 'War Elephant', 40, 10, Math.PI); put(g, 'War Heavy Elephant.001', 46, 20, Math.PI, 1);
    put(g, 'Watchtower', -50, -50, 0); put(g, 'Watchtower', 50, -50, 0); put(g, 'Wall Tower', 50, 50, 0); put(g, 'Wall Tower', -50, 50, 0);
    scatter(g, R, 'curio', 26, 0, -16, 20, 1);   /* 兵甲武具陈列 */
    scatter(g, R, 'market', 8, -20, 8, 10, 1);
    put(g, 'Campfire', 0, 12, 0); put(g, 'Map with Table', 4, -8, Math.PI / 3);
    var hs = POOLS.house;
    for (var i = 0; i < 6; i++) put(g, hs[(R() * hs.length) | 0], -52 + i * 20, 44 + (R() - .5) * 6, 0);
    scatter(g, R, 'animal', 6, 26, 30, 14, 1);
    scatter(g, R, 'figure', 5, 0, 0, 26, 1);
    scatter(g, R, 'nature', 18, 0, 0, 90, 1);
  }
  function layoutSanctuary(g, R, L) {
    /* 德尔斐式圣域：山道朝圣线+神庙群+满殿神像+神话兽出没 */
    road(0, 60, 0, -30, 2.6);
    put(g, 'Oraculus', 0, -38, 0, 1); put(g, 'Tenple', 24, -28, -Math.PI / 6, .9); put(g, 'Tenple.001', -20, -24, Math.PI / 6);
    put(g, 'Altar', 0, -22, 0); put(g, 'Altar.001', 8, -26, 0);
    colonnade(g, 'Ruined Pillar', -16, -12, 16, -12, 4);
    POOLS.gods.forEach(function (s, i) {
      var a = -Math.PI / 2 + i * Math.PI / (POOLS.gods.length - 1);
      var x = Math.cos(a) * 30, z = -10 + Math.sin(a) * 22;
      put(g, POOLS.statue[i % POOLS.statue.length], x, z, 0);
      put(g, s, x, z, -a + Math.PI / 2, 1);
    });
    put(g, 'Monumental Torch', -6, -16, 0); put(g, 'Monumental Torch', 6, -16, 0);
    POOLS.beast.forEach(function (b, i) { put(g, b, -46 + i * 30, 26 + (R() - .5) * 14, R() * Math.PI * 2); });
    scatter(g, R, 'street', 10, 0, 10, 30, 1);
    scatter(g, R, 'figure', 5, 0, 20, 20, 1);
    put(g, 'Well', 10, 18, 0);
    scatter(g, R, 'curio', 12, 0, 34, 16, 1); /* 朝圣者供品摊 */
    scatter(g, R, 'nature', 34, 0, 0, 92, 1);
  }
  function layoutVillage(g, R) {
    /* 村庄：农舍+井+田+畜栏；绝无巨像/神庙/纪念碑 */
    road(-50, 6, 50, -4, 2.2);
    var hs = POOLS.house;
    for (var i = 0; i < 7; i++) {
      put(g, hs[(R() * hs.length) | 0], -36 + i * 12 + (R() - .5) * 7, (i % 2 ? 14 : -14) + (R() - .5) * 8, R() * Math.PI * 2);
    }
    put(g, 'House with vegetable garden', 8, 20, Math.PI);
    put(g, 'Farm', -20, 30, 0, 1); put(g, 'Grape Farm', 20, 32, 0, 1);
    put(g, 'Water Mill', 44, 12, -Math.PI / 2); put(g, 'Aserradero', -44, -18, Math.PI / 2);
    put(g, 'Stable', 30, -20, Math.PI); put(g, 'Well', 0, 0, 0);
    put(g, 'straw bale', -8, -6, 0); put(g, 'straw bale', 12, -9, .6);
    scatter(g, R, 'animal', 6, 30, -14, 10, 1);
    scatter(g, R, 'rural', 8, 0, 26, 26, 1);
    scatter(g, R, 'market', 8, 0, 0, 12, 1);
    put(g, 'Campfire', -14, 2, 0); put(g, 'Bench', 3, 3, 1.2);
    scatter(g, R, 'figure', 4, 0, 0, 18, 1);
    scatter(g, R, 'nature', 44, 0, 0, 90, 1);
  }
  function layoutTown(g, R) {
    /* 通用镇：小 forum+街屋+作坊，一尊本地雕像不逾制 */
    road(-60, 0, 60, 0, 3); road(0, -60, 0, 60, 3);
    put(g, 'Tenple.001', -12, -12, Math.PI / 4);
    put(g, 'Statue Base Small', 6, -6, 0); put(g, pick(R, 'statue'), 6, -6, R() * 6, .9);
    put(g, 'Fountain.001', -4, 6, 0);
    colonnade(g, 'Ruined Pillar.001', -10, 12, 10, 12, 5);
    var hs = POOLS.house;
    for (var bx = -2; bx <= 2; bx++) for (var bz = -2; bz <= 2; bz++) {
      if (!bx && !bz) continue; if (R() < .35) continue;
      put(g, hs[(R() * hs.length) | 0], bx * 24 + (R() - .5) * 8, bz * 18 + (R() - .5) * 6, ((R() * 4) | 0) * Math.PI / 2);
    }
    put(g, 'Blacksmith', 22, 14, Math.PI); put(g, 'Stable', -26, 20, 0);
    scatter(g, R, 'market', 14, 8, -10, 12, 1);
    scatter(g, R, 'curio', 12, 8, -10, 14, 1);
    scatter(g, R, 'street', 10, 0, 0, 34, 1);
    scatter(g, R, 'figure', 4, 0, 0, 22, 1);
    scatter(g, R, 'animal', 4, -22, -18, 10, 1);
    scatter(g, R, 'rural', 6, 46, 36, 20, 1);
    scatter(g, R, 'nature', 30, 0, 0, 88, 1);
  }
  var LAYOUTS = { rome: layoutRome, polis: layoutPolis, port: layoutPort, military: layoutMilitary, sanctuary: layoutSanctuary, village: layoutVillage, town: layoutTown };

  /* ---------------- 建城 ---------------- */
  function buildFor(locName) {
    var L = Z.match(locName), R = rng('med/' + L.k);
    Z.scene = new T.Scene();
    Z.scene.background = new T.Color(Z.night ? 0x0b1026 : 0x9fc4dd);
    Z.scene.fog = new T.Fog(Z.night ? 0x0b1026 : 0x9fc4dd, 90, 260);
    Z.colliders = [];
    var amb = new T.AmbientLight(Z.night ? 0x33406a : 0xbfb9a8, Z.night ? .8 : .95);
    var sun = new T.DirectionalLight(Z.night ? 0x8899dd : 0xfff2d0, Z.night ? .35 : 1.05);
    sun.position.set(40, 70, -30);
    Z.scene.add(amb, sun);
    buildTerrain(L.style, R);
    var g = new T.Group(); g.name = 'city';
    LAYOUTS[L.style](g, R, L);
    Z.scene.add(g);
    applyStoredEdifices(L.k, g);
    Z.cityKey = locName; Z.styleKey = L.style; Z.locK = L.k;
    Z.camYaw = R() * 6.28; Z.camDist = L.style === 'rome' ? 26 : 17;
    ensurePlayer();
  }
  function ensurePlayer() {
    Z.player = { x: 0, z: 26, y: 0 };
    if (Z.styleKey === 'port') Z.player.z = 10;
  }

  /* ---------------- 相机/操控：轨道+步行 ---------------- */
  var DRAG = null;
  function animate() {
    requestAnimationFrame(animate);
    if (!Z.rnd || !Z.scene || !Z.cam) return;
    var p = Z.player; if (!p) return;
    var spd = .28, mx = 0, mz = 0;
    if (Z.keys.w || Z.joy.y < -.3) mz = -1; if (Z.keys.s || Z.joy.y > .3) mz = 1;
    if (Z.keys.a || Z.joy.x < -.3) mx = -1; if (Z.keys.d || Z.joy.x > .3) mx = 1;
    if (mx || mz) {
      var ang = Z.camYaw + Math.atan2(mx, mz);
      var nx = p.x + Math.sin(ang) * spd * (mx && mz ? .8 : 1), nz = p.z + Math.cos(ang) * spd * (mx && mz ? .8 : 1);
      var ok = true;
      for (var i = 0; i < Z.colliders.length; i++) { var c = Z.colliders[i]; var dx = nx - c.x, dz = nz - c.z; if (dx * dx + dz * dz < c.r * c.r * .55) { ok = false; break; } }
      if (Math.abs(nx) > 105 || Math.abs(nz) > 105) ok = false;
      if (TER.sea && nz > TER.shore + 1) ok = false;
      if (ok) { p.x = nx; p.z = nz; }
    }
    p.y = terrainY(p.x, p.z);
    var cd = Z.camDist, cy = Z.camPitch;
    Z.cam.position.set(p.x + Math.sin(Z.camYaw) * cd * Math.cos(cy), p.y + 2 + Math.sin(cy) * cd, p.z + Math.cos(Z.camYaw) * cd * Math.cos(cy));
    Z.cam.lookAt(p.x, p.y + 2.2, p.z);
    if (Z.ghost) { /* 营造幽灵随准星落地 */
      Z.ghost.position.y = terrainY(Z.ghost.position.x, Z.ghost.position.z);
    }
    Z.rnd.render(Z.scene, Z.cam);
  }
  function bindInput(host) {
    if (host.__medIn) return; host.__medIn = 1;
    host.tabIndex = 0;
    host.addEventListener('keydown', function (e) { var k = e.key.toLowerCase(); if ('wasd'.indexOf(k) >= 0) { Z.keys[k] = 1; e.preventDefault(); } });
    host.addEventListener('keyup', function (e) { Z.keys[e.key.toLowerCase()] = 0; });
    host.addEventListener('pointerdown', function (e) {
      host.focus();
      if (Z.build && Z.build.sel && e.button === 0 && !e.target.closest('.md-hud')) { placeAt(e); return; }
      DRAG = { x: e.clientX, y: e.clientY };
    });
    host.addEventListener('pointermove', function (e) {
      if (Z.build && Z.build.sel) ghostAt(e);
      if (!DRAG) return;
      Z.camYaw -= (e.clientX - DRAG.x) * .0075;
      Z.camPitch = Math.max(.12, Math.min(1.2, Z.camPitch + (e.clientY - DRAG.y) * .004));
      DRAG = { x: e.clientX, y: e.clientY };
    });
    addEventListener('pointerup', function () { DRAG = null; });
    host.addEventListener('wheel', function (e) { e.preventDefault(); Z.camDist = Math.max(6, Math.min(60, Z.camDist * (e.deltaY > 0 ? 1.09 : 1 / 1.09))); }, { passive: false });
  }
  function groundPoint(e) {
    var r = Z.cv.getBoundingClientRect();
    var v = new T.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    var rc = new T.Raycaster(); rc.setFromCamera(v, Z.cam);
    var t = -rc.ray.origin.y / rc.ray.direction.y; /* 与 y≈0 面近似求交后细化 */
    if (!isFinite(t) || t < 0) return null;
    var p = rc.ray.origin.clone().addScaledVector(rc.ray.direction, t);
    for (var i = 0; i < 3; i++) { var y = terrainY(p.x, p.z); t = (y - rc.ray.origin.y) / rc.ray.direction.y; if (isFinite(t) && t > 0) p = rc.ray.origin.clone().addScaledVector(rc.ray.direction, t); }
    return p;
  }

  /* ---------------- 营造：全量清单 + 幽灵放置 + 敕令 ---------------- */
  var CAT_ZH = [['gods', '神像'], ['statue', '雕像'], ['civic', '公共'], ['temple', '神庙'], ['house', '民居'], ['rural', '农事'], ['port', '舟楫'], ['military', '军械'], ['street', '街衢'], ['market', '市肆'], ['animal', '牲马'], ['figure', '庶民'], ['beast', '神兽'], ['landmark', '奇观'], ['nature', '草木'], ['curio', '什物']];
  var CATALOG = [];
  function buildCatalog() {
    CATALOG = [];
    CAT_ZH.forEach(function (c) {
      (POOLS[c[0]] || []).forEach(function (n) { CATALOG.push({ name: n, cat: c[0], zh: c[1] }); });
    });
  }
  var ZH_ALIAS = { '神庙': 'Tenple', '神廟': 'Tenple', '元老院': 'Senate', '斗兽场': 'Amphitheatre', '鬥獸場': 'Amphitheatre', '凯旋门': 'Titus Arch', '凱旋門': 'Titus Arch', '引水道': 'Aqueduct', '水道': 'Aqueduct', '学园': 'University', '學園': 'University', '民居': 'House', '农舍': 'House', '房': 'House', '屋': 'House', '水井': 'Well', '井': 'Well', '喷泉': 'Fountain', '噴泉': 'Fountain', '祭坛': 'Altar', '祭壇': 'Altar', '雕像': 'Statue', '神像': 'Zeus', '石柱': 'Ruined Pillar', '柱': 'Ruined Pillar', '码头': 'Dock', '碼頭': 'Dock', '帆船': 'Sailboat basic', '渔船': 'Fishing boat', '漁船': 'Fishing boat', '船': 'Sailboat Duo', '兵营': 'Barracks', '兵營': 'Barracks', '军帐': 'Big War Tent', '军营': 'Barracks', '瞭望塔': 'Watchtower', '望楼': 'Watchtower', '望樓': 'Watchtower', '塔楼': 'Wall Tower', '弩炮': 'Balista', '攻城锤': 'Battering Ram', '攻城塔': 'Siege Tower', '木马': 'Troy Horse', '木馬': 'Troy Horse', '战象': 'War Elephant', '戰象': 'War Elephant', '铁匠铺': 'Blacksmith', '铁匠': 'Blacksmith', '马厩': 'Stable', '馬廄': 'Stable', '农田': 'Farm', '田': 'Farm', '葡萄园': 'Grape Farm', '葡萄園': 'Grape Farm', '水磨': 'Water Mill', '锯木厂': 'Aserradero', '火堆': 'Campfire', '长椅': 'Bench', '長椅': 'Bench', '火炬': 'Big Torch', '街灯': 'Streetlight', '街燈': 'Streetlight', '旗': 'Flag', '旌旗': 'Banner', '树': 'Tree', '樹': 'Tree', '松': 'Pine', '石': 'rock.001', '岩': 'rock.002', '马': 'Horse', '馬': 'Horse', '战马': 'Heavy War Horse', '货车': 'Horse Cart', '推车': 'Cart', '楼梯': 'Stairs', '阶梯': 'Stairs', '宙斯': 'Zeus', '赫拉': 'Hera', '波塞冬': 'Poseidon', '雅典娜': 'Athenea', '阿尔忒弥斯': 'Artemisa', '阿佛洛狄忒': 'Afrodita', '阿喀琉斯': 'Achiles', '半人马': 'Centaur', '半人馬': 'Centaur', '牛头怪': 'Minotaur', '弥诺陶': 'Minotaur', '戈耳工': 'Gorgona', '美杜莎': 'Gorgona', '羊怪': 'Fauno', '法翁': 'Fauno', '帕特农': 'Partenon', '帕特農': 'Partenon', '巨像': 'Rodas Colose', '竞技场': 'Hippodrome ', '競技場': 'Hippodrome ', '神谕所': 'Oraculus', '神諭所': 'Oraculus', '石桥': 'Puente', '石橋': 'Puente', '桥': 'Puente', '橋': 'Puente', '战船': 'Trireme basic', '戰船': 'Trireme basic', '三列桨': 'Trireme basic' };
  function resolveModel(word) {
    word = String(word || '').trim();
    if (!word) return null;
    if (Z.lib[word]) return word;
    for (var k in ZH_ALIAS) if (word.indexOf(k) >= 0) {
      var base = ZH_ALIAS[k];
      if (Z.lib[base]) return base;
      var bn = normName(base);
      var cand = Z.names.filter(function (n) { return n.indexOf(base) === 0 || n.indexOf(bn) === 0; });
      if (cand.length) return cand[0];
    }
    var lw = word.toLowerCase(), lwn = normName(word).toLowerCase();
    var hit = Z.names.filter(function (n) { var l = n.toLowerCase(); return l.indexOf(lw) >= 0 || l.indexOf(lwn) >= 0 || l.replace(/_/g, ' ').indexOf(lw) >= 0; });
    return hit.length ? hit[0] : null;
  }
  var ED_LSK = 'rome_med_edifices_v1';
  function edStore() { try { return JSON.parse(localStorage.getItem(ED_LSK) || '{}'); } catch (e) { return {}; } }
  function edSave(o) { try { localStorage.setItem(ED_LSK, JSON.stringify(o)); } catch (e) { } }
  function addEdifice(name, x, z, ry, persist) {
    var o = put(Z.scene.getObjectByName('city') || Z.scene, name, x, z, ry || 0, 1);
    if (o && persist) {
      var st = edStore(); (st[Z.locK] = st[Z.locK] || []).push({ n: name, x: +x.toFixed(1), z: +z.toFixed(1), r: +(ry || 0).toFixed(2) });
      edSave(st);
    }
    return o;
  }
  function applyStoredEdifices(k, g) {
    (edStore()[k] || []).forEach(function (e) { put(g, e.n, e.x, e.z, e.r); });
  }
  function freeSpot(R) {
    for (var i = 0; i < 40; i++) {
      var x = (R() - .5) * 120, z = (R() - .5) * 100;
      if (TER.sea && z > TER.shore - 6) continue;
      var ok = true;
      for (var j = 0; j < Z.colliders.length; j++) { var c = Z.colliders[j]; var dx = x - c.x, dz = z - c.z; if (dx * dx + dz * dz < (c.r + 3) * (c.r + 3)) { ok = false; break; } }
      if (ok) return { x: x, z: z };
    }
    return { x: (R() - .5) * 120, z: -60 };
  }
  Z.applyEdict = function (spec, key) {
    if (!Z.owns() || !Z.scene) return;
    var seenK = 'rome_med_deeds_v1', seen = {};
    try { seen = JSON.parse(localStorage.getItem(seenK) || '{}'); } catch (e) { }
    if (seen[key]) return; seen[key] = 1;
    try { var ks = Object.keys(seen); if (ks.length > 400) ks.slice(0, 200).forEach(function (k) { delete seen[k]; }); localStorage.setItem(seenK, JSON.stringify(seen)); } catch (e) { }
    var R = rng('deed/' + key);
    (spec.build || []).forEach(function (b) {
      var m = resolveModel(b.name); if (!m) return;
      for (var i = 0; i < (b.n || 1); i++) { var s = freeSpot(R); addEdifice(m, s.x, s.z, R() * 6.28, true); }
    });
    (spec.raze || []).forEach(function (b) {
      var m = resolveModel(b.name); if (!m) return;
      var st = edStore(), arr = st[Z.locK] || [];
      for (var i = 0; i < (b.n || 1); i++) { var ix = -1; arr.forEach(function (e, j) { if (ix < 0 && e.n === m) ix = j; }); if (ix >= 0) arr.splice(ix, 1); }
      st[Z.locK] = arr; edSave(st);
    });
    if (Z.cityKey) buildFor(Z.cityKey);
  };
  Z.command = function (raw) {
    if (!Z.owns()) return { ok: false, report: '三维未就绪' };
    raw = String(raw || '').trim();
    var m = /^(?:修|建|造|立|添|置|起)\s*(?:一[座尊艘匹株]|[两二三四五]\s*[座尊艘匹株]|(\d+)\s*[座尊艘匹株]?)?\s*(.+?)$/.exec(raw.replace(/[。！!\s]+$/, ''));
    var raze = /^(?:拆|毁|毀|撤)\s*(.+?)$/.exec(raw.replace(/[。！!\s]+$/, ''));
    if (raze) {
      var rm = resolveModel(raze[1]); if (!rm) return { ok: false, report: '未识得「' + raze[1] + '」' };
      Z.applyEdict({ raze: [{ name: rm, n: 1 }] }, 'cmd' + Date.now());
      return { ok: true, report: '拆去 ' + rm + ' 一座' };
    }
    if (!m) return { ok: false, report: '令式：修/建/造 + 名目（如：修一座神庙 · 建三座民居 · 立宙斯神像 · 拆瞭望塔）' };
    var zhN = { '一': 1, '两': 2, '二': 2, '三': 3, '四': 4, '五': 5 };
    var n = m[1] ? Math.min(5, parseInt(m[1], 10) || 1) : (zhN[raw.charAt(1)] || 1);
    var md = resolveModel(m[2]);
    if (!md) return { ok: false, report: '未识得「' + m[2] + '」为何物。可兴作之名目见营造清单（全量 ' + Z.names.length + ' 件皆可用）' };
    Z.applyEdict({ build: [{ name: md, n: n }] }, 'cmd' + Date.now());
    return { ok: true, report: '兴作 ' + md + ' ×' + n + ' 于' + (Z.cityKey || '城中') };
  };
  Z.coverage = function () {
    var used = {}; CATALOG.forEach(function (c) { used[c.name] = 1; });
    var un = Z.names.filter(function (n) { return !used[n]; });
    return { total: Z.names.length, inCatalog: Z.names.length - un.length, missing: un };
  };

  /* ---------------- 营造 HUD（清单全量分组 + 幽灵放置） ---------------- */
  var HUD = {};
  function ensureHud(host) {
    if (HUD.wrap && HUD.wrap.parentNode === host) return;
    if (HUD.wrap && HUD.wrap.parentNode) HUD.wrap.parentNode.removeChild(HUD.wrap);
    var w = document.createElement('div');
    w.className = 'md-hud';
    w.style.cssText = 'position:absolute;inset:0;pointer-events:none;font-family:inherit;z-index:3';
    w.innerHTML = ''
      + '<div data-md="chip" style="position:absolute;top:8px;left:10px;pointer-events:auto;background:rgba(6,6,6,.72);border:1px solid rgba(236,236,232,.3);color:#ecc878;font-size:12px;letter-spacing:.14em;padding:4px 12px;white-space:nowrap;max-width:60%;overflow:hidden;text-overflow:ellipsis"></div>'
      + '<div style="position:absolute;top:8px;right:10px;display:flex;gap:8px;pointer-events:auto">'
      + '<span data-md="mode" style="cursor:pointer;background:rgba(6,6,6,.72);border:1px solid rgba(201,155,63,.5);color:#ecc878;font-size:11px;letter-spacing:.18em;padding:4px 12px">营造×游历</span>'
      + '<span data-md="expand" style="cursor:pointer;background:rgba(6,6,6,.72);border:1px solid rgba(236,236,232,.3);color:#d9d9d4;font-size:11px;letter-spacing:.18em;padding:4px 12px">展开</span>'
      + '</div>'
      + '<div data-md="prog" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:#9c9c98;font-size:12px;letter-spacing:.3em;text-align:center"></div>'
      + '<div data-md="pal" style="position:absolute;top:44px;right:10px;bottom:52px;width:230px;display:none;pointer-events:auto;background:rgba(6,6,6,.88);border:1px solid rgba(236,236,232,.22);overflow-y:auto;padding:8px"></div>'
      + '<div data-md="tip" style="position:absolute;left:10px;bottom:52px;pointer-events:none;color:#9c9c98;font-size:10.5px;letter-spacing:.1em;text-shadow:0 1px 3px #000"></div>';
    host.appendChild(w);
    HUD.wrap = w;
    HUD.chip = w.querySelector('[data-md=chip]');
    HUD.prog = w.querySelector('[data-md=prog]');
    HUD.pal = w.querySelector('[data-md=pal]');
    HUD.tip = w.querySelector('[data-md=tip]');
    w.querySelector('[data-md=mode]').addEventListener('click', function () { toggleBuild(); });
    w.querySelector('[data-md=expand]').addEventListener('click', function () {
      Z.expanded = !Z.expanded;
      try { localStorage.setItem('med3d_expand', Z.expanded ? '1' : '0'); } catch (e) { }
      this.textContent = Z.expanded ? '收起' : '展开';
      if (window.ZJ3D_onExpand) window.ZJ3D_onExpand();
    });
    bindInput(host);
  }
  function toggleBuild() {
    if (!Z.owns()) return;
    Z.build = Z.build ? null : { sel: null };
    HUD.pal.style.display = Z.build ? 'block' : 'none';
    if (Z.build) renderPal();
    if (!Z.build && Z.ghost) { Z.scene.remove(Z.ghost); Z.ghost = null; }
    HUD.tip.textContent = Z.build ? '点选清单名目 → 城中点地即落成 · 再点「营造×游历」收起' : '';
  }
  function renderPal(filter) {
    var h = '<input data-md="q" placeholder="搜寻名目…" style="width:100%;background:rgba(236,236,232,.05);border:1px solid rgba(236,236,232,.2);color:#ecece8;font-size:11px;padding:5px 8px;margin-bottom:8px;font-family:inherit;outline:none">';
    var cur = '';
    CATALOG.forEach(function (c) {
      if (filter && c.name.toLowerCase().indexOf(filter) < 0 && c.zh.indexOf(filter) < 0) return;
      if (c.zh !== cur) { cur = c.zh; h += '<div style="font-size:10px;letter-spacing:.3em;color:#c99b3f;margin:9px 0 4px">◆ ' + c.zh + '</div>'; }
      h += '<div data-mdl="' + c.name.replace(/"/g, '&quot;') + '" style="cursor:pointer;font-size:10.5px;line-height:1.5;color:' + (Z.build && Z.build.sel === c.name ? '#ecc878' : '#b9b9b3') + ';padding:2px 4px;border:1px solid ' + (Z.build && Z.build.sel === c.name ? 'rgba(236,200,120,.5)' : 'transparent') + '">' + c.name.replace(/_/g, ' ') + '</div>';
    });
    HUD.pal.innerHTML = h + '<div style="margin-top:8px;font-size:9.5px;color:#6b6b66;letter-spacing:.1em">全量 ' + Z.names.length + ' 件 · 营造即入本城长册</div>';
    var q = HUD.pal.querySelector('[data-md=q]');
    q.addEventListener('input', function () { renderPal(this.value.trim().toLowerCase()); });
    if (filter) { q.value = filter; q.focus(); }
    [].forEach.call(HUD.pal.querySelectorAll('[data-mdl]'), function (el) {
      el.addEventListener('click', function () {
        Z.build.sel = el.getAttribute('data-mdl');
        if (Z.ghost) { Z.scene.remove(Z.ghost); Z.ghost = null; }
        var gh = inst(Z.build.sel);
        if (gh) { gh.traverse(function (m) { if (m.isMesh) { m.material = m.material.clone(); m.material.transparent = true; m.material.opacity = .55; } }); Z.scene.add(gh); Z.ghost = gh; }
        HUD.tip.textContent = '落子：' + Z.build.sel + ' —— 点地放置 · R 旋转';
        renderPal(filter);
      });
    });
  }
  addEventListener('keydown', function (e) { if (Z.ghost && (e.key === 'r' || e.key === 'R')) Z.ghost.rotation.y += Math.PI / 8; });
  function ghostAt(e) {
    var p = groundPoint(e); if (!p || !Z.ghost) return;
    Z.ghost.position.set(p.x, terrainY(p.x, p.z), p.z);
  }
  function placeAt(e) {
    var p = groundPoint(e); if (!p || !Z.build || !Z.build.sel) return;
    addEdifice(Z.build.sel, p.x, p.z, Z.ghost ? Z.ghost.rotation.y : 0, true);
    if (window.ZJ3D_say) window.ZJ3D_say('（营造既成：于' + (Z.cityKey || '城中') + '新落成 ' + Z.build.sel + ' 一座。此为既成事实，请顺此叙事。）');
  }
  function updateHud() {
    if (!HUD.prog) return;
    if (Z.failed) { HUD.prog.textContent = '资材未能取用'; return; }
    if (!Z.ready) { HUD.prog.textContent = '环海资材装载中 ' + Math.round(Z.prog * 100) + '%'; return; }
    HUD.prog.textContent = '';
    if (HUD.chip) {
      var mq = (Z.cityKey || '') + (Z.eraText ? ' · ' + Z.eraText : '');
      HUD.chip.textContent = mq;
    }
  }

  /* ---------------- 与 App 的接口（与 ZJ3D 同构） ---------------- */
  function showLocation(loc, night) {
    if (!Z.ready) { Z.pending = [loc, night]; loadAll(); return; }
    if (Z.cityKey !== loc || Z.night !== !!night) { Z.night = !!night; buildFor(loc); }
  }
  Z.onStory = function (text) { /* 叙事流入：暂用于跑马灯素材，保持接口 */ };
  Z.setEra = function (s) { Z.eraText = String(s || ''); updateHud(); };
  Z.setLow = function (on) { PERF.low = !!on; perfSave(); };
  Z.isLow = function () { return PERF.low; };
  Z.paneH = function (mob) {
    if (!Z.owns()) return mob ? 140 : 186;
    if (Z.expanded) return Math.round(window.innerHeight * (mob ? 0.52 : 0.58));
    return mob ? 150 : 200;
  };
  Z.onRender = function (locName, night) {
    var host = document.getElementById('mdScene3D');
    if (!host) return;
    ensureHud(host);
    Z.lastLoc = locName;
    if (!Z.ready) { showLocation(locName, night); updateHud(); return; }
    ensureRenderer();
    if (Z.cv.parentNode !== host) host.insertBefore(Z.cv, host.firstChild);
    var w = host.clientWidth, h = host.clientHeight;
    if (w && h) { Z.rnd.setSize(w, h, false); Z.cam.aspect = w / h; Z.cam.updateProjectionMatrix(); }
    showLocation(locName, night);
    updateHud();
  };
  Z.debugCity = function (locName, night) { Z.night = !!night; Z.cityKey = ''; buildFor(locName); Z.cityKey = locName; };
  loadAll();
})();
