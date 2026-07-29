/* ============================================================================
   罗马纪 · 酒馆助手角色脚本
   ----------------------------------------------------------------------------
   这段是塞进角色卡 data.extensions.tavern_helper.scripts[].content 的那一份。
   酒馆助手把它注入一个常驻隐藏 iframe（不绑楼层，所以不随重渲染重建）。

   它只干一件事：在酒馆主窗里造一个全屏容器，把游戏整份文档以 srcdoc 挂进去。
   srcdoc 继承酒馆的源，于是游戏里的 boot.js 能直接沿父链够到 TavernHelper，
   localStorage 也照常可用（存档不用改写）。

   游戏本体一个字节都不改，从 CDN 取。
   ============================================================================ */
(function () {
  'use strict';

  var CDN = '__CDN__';
  var ENTRY = CDN + 'st/front/index.html';
  var ID = 'roma-stage';

  var top = window;
  for (var i = 0; i < 6 && top.parent !== top; i++) top = top.parent;
  var doc = top.document;

  function $(id) { return doc.getElementById(id); }
  function log() { try { console.log.apply(console, ['[roma·loader]'].concat([].slice.call(arguments))); } catch (_) { } }

  function close() {
    var el = $(ID);
    if (el) el.remove();
    doc.documentElement.style.overflow = '';
  }

  function open() {
    if ($(ID)) return;
    var wrap = doc.createElement('div');
    wrap.id = ID;
    wrap.style.cssText = 'position:fixed;inset:0;z-index:100000;background:#060606;'
      + 'display:block;margin:0;padding:0;border:0';

    var bar = doc.createElement('div');
    bar.style.cssText = 'position:absolute;right:10px;top:10px;z-index:2;'
      + 'font:11px/1 ui-monospace,monospace;letter-spacing:.2em;color:#8b8b93;'
      + 'border:1px solid rgba(236,236,232,.3);padding:7px 12px;cursor:pointer;'
      + 'background:rgba(6,6,6,.8);user-select:none';
    bar.textContent = 'EXIRE ✕';
    bar.onclick = close;

    var fr = doc.createElement('iframe');
    fr.id = ID + '-frame';
    fr.setAttribute('allow', 'autoplay; fullscreen; xr-spatial-tracking');
    fr.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;display:block';

    wrap.appendChild(fr);
    wrap.appendChild(bar);
    doc.body.appendChild(wrap);
    doc.documentElement.style.overflow = 'hidden';

    /* 取整份文档再以 srcdoc 挂进去——直接 src= 会变成跨域，够不到 TavernHelper。
       文档里 <base href> 指向 CDN，所以里面所有相对路径照常解析。 */
    fetch(ENTRY).then(function (r) {
      if (!r.ok) throw new Error('入口 HTTP ' + r.status);
      return r.text();
    }).then(function (html) {
      fr.srcdoc = html;
      log('已挂载', ENTRY);
    }).catch(function (e) {
      bar.textContent = '载入失败：' + (e && e.message || e);
      log('失败', e);
    });
  }

  /* 酒馆助手的脚本按钮；同时给一个斜杠命令兜底 */
  try {
    if (typeof eventOnButton === 'function') {
      eventOnButton('进入罗马', open);
      eventOnButton('退出罗马', close);
    }
  } catch (_) { }
  try {
    var TH = top.TavernHelper;
    if (TH && TH.registerSlashCommand) {
      TH.registerSlashCommand('roma', function () { open(); return ''; }, [], '打开罗马纪', true, true);
    }
  } catch (_) { }

  window.__romaOpen = open;
  window.__romaClose = close;
  try { top.__romaOpen = open; top.__romaClose = close; } catch (_) { }

  log('就位。点脚本按钮「进入罗马」，或在输入框敲 /roma');
})();
