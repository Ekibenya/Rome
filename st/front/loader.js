/* ============================================================================
   罗马纪 · 酒馆前端加载器（正则驱动版）
   ----------------------------------------------------------------------------
   这段脚本由角色卡里的一条显示层正则注入：正则把开场白里的舞台标记替换成一个
   含 body 标签的代码块，酒馆助手（JS-Slash-Runner）据 isFrontend 判定
   （文本含 html/head/body 标签即渲染成 iframe），把本段跑进一个消息 iframe。

   本段在那个消息 iframe 里执行，往酒馆主窗上盖一个全屏容器，把游戏整份文档
   （index.html，从 CDN 取）以 srcdoc 挂进去。srcdoc 与酒馆同源，游戏里的
   boot.js 能沿父链够到 TavernHelper，localStorage 也照常可用。

   全屏容器只挂一次：后续每条 AI 消息也会触发这段脚本，但见 flag 即退，
   并把自己那个消息 iframe 藏掉，免得聊天里留一格空白。
   ============================================================================ */
(function () {
  'use strict';
  var CDN = '__CDN__';
  var ENTRY = CDN + 'st/front/index.html';
  var STAGE = 'roma-stage';

  /* 走到最顶层的酒馆主窗 */
  var top = window;
  try { for (var i = 0; i < 8 && top.parent && top.parent !== top; i++) top = top.parent; } catch (_) { top = window; }
  var doc = top.document;

  /* 藏掉自己这一格消息 iframe，别在聊天流里留空白 */
  function hideSelf() {
    try {
      var fe = window.frameElement;
      if (fe) { fe.style.height = '0'; fe.style.minHeight = '0'; fe.style.border = '0'; fe.style.display = 'none'; }
      var host = fe && fe.closest ? fe.closest('.TH-render, pre') : null;
      if (host) host.style.display = 'none';
    } catch (_) { }
  }

  function close() {
    var el = doc.getElementById(STAGE);
    if (el) el.remove();
    try { doc.documentElement.style.overflow = ''; } catch (_) { }
    top.__ROMA_STAGE_MOUNTED__ = false;
  }

  function open() {
    if (top.__ROMA_STAGE_MOUNTED__ || doc.getElementById(STAGE)) return;
    top.__ROMA_STAGE_MOUNTED__ = true;

    var wrap = doc.createElement('div');
    wrap.id = STAGE;
    wrap.style.cssText = 'position:fixed;inset:0;z-index:2147483000;background:#060606;margin:0;padding:0;border:0';

    var fr = doc.createElement('iframe');
    fr.id = STAGE + '-frame';
    fr.setAttribute('allow', 'autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope');
    fr.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:#060606';

    var bar = doc.createElement('div');
    bar.textContent = 'EXIRE ✕';
    bar.style.cssText = 'position:absolute;right:12px;top:calc(env(safe-area-inset-top,0px) + 12px);z-index:2;'
      + 'font:11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.2em;color:#c9b';
    bar.style.color = '#8b8b93';
    bar.style.border = '1px solid rgba(236,236,232,.3)';
    bar.style.padding = '8px 13px';
    bar.style.cursor = 'pointer';
    bar.style.background = 'rgba(6,6,6,.82)';
    bar.style.userSelect = 'none';
    bar.onclick = close;

    wrap.appendChild(fr);
    wrap.appendChild(bar);
    doc.body.appendChild(wrap);
    try { doc.documentElement.style.overflow = 'hidden'; } catch (_) { }

    /* 取整份文档再以 srcdoc 挂：直接 src= 会跨域，够不到 TavernHelper。
       文档 <head> 里已有 <base href> 指向 CDN，里面所有相对路径照常解析。 */
    (top.fetch || window.fetch)(ENTRY).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function (html) {
      fr.srcdoc = html;
    }).catch(function (e) {
      bar.textContent = '载入失败：' + (e && e.message || e);
    });
  }

  hideSelf();
  /* 稍等一拍：确保酒馆主窗的 body 已就绪 */
  if (doc && doc.body) open();
  else setTimeout(open, 60);

  /* 也挂到主窗，方便手动 /roma 或调试 */
  try { top.__romaOpen = open; top.__romaClose = close; } catch (_) { }
})();
