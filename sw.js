/* ROMA.SYS · service worker
   殼層預緩存 + 其餘按需緩存。素材總量近 200MB（三維包與樂曲），一次性全預下載既慢又
   會撐爆配額，所以只預存「打得開」所需的那幾個檔，其餘用過哪個存哪個。 */
var V = 'roma-v1';
var SHELL = [
  '/',
  '/manifest.webmanifest',
  '/core/res/icon/favicon.svg',
  '/core/res/icon/icon-192.png',
  '/core/res/icon/icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(V).then(function (c) {
      /* 逐個放行：任何一個檔掛掉都不該讓整個安裝失敗（addAll 是全有全無的） */
      return Promise.all(SHELL.map(function (u) {
        return c.add(new Request(u, { cache: 'reload' })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) { return k === V ? null : caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('message', function (e) {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u;
  try { u = new URL(r.url); } catch (_) { return; }
  /* 跨域一律不碰：AI 接口、生圖接口、NovelAI 中轉都必須原樣直達 */
  if (u.origin !== location.origin) return;
  if (u.pathname.indexOf('/_vercel/') === 0) return;

  /* 文檔：網絡優先，斷網時回落到上一次緩存的殼 */
  if (r.mode === 'navigate') {
    e.respondWith(
      fetch(r).then(function (res) {
        var cp = res.clone();
        caches.open(V).then(function (c) { c.put('/', cp).catch(function () {}); });
        return res;
      }).catch(function () {
        return caches.match('/').then(function (m) { return m || Response.error(); });
      })
    );
    return;
  }

  /* 素材：緩存優先、後台回源刷新（stale-while-revalidate） */
  e.respondWith(
    caches.match(r).then(function (hit) {
      var net = fetch(r).then(function (res) {
        if (res && res.ok && res.type === 'basic' && cacheable(res)) {
          var cp = res.clone();
          /* 配額滿了就讓它失敗，瀏覽器自己按 LRU 淘汰，不影響本次返回 */
          caches.open(V).then(function (c) { c.put(r, cp).catch(function () {}); });
        }
        return res;
      }).catch(function () { return hit || Response.error(); });
      return hit || net;
    })
  );
});

/* 大檔一律不進 SW 緩存：三維包與樂曲合計近 200MB，全存下來會把本站變成瀏覽器
   清理配額時的首選目標——而清理是按站點整體來的，會連 localStorage 裡的存檔一起抹掉。
   況且 /core/res/* 本來就帶 immutable 長緩存，重訪時瀏覽器自己的 HTTP 緩存已經接住了，
   SW 這一層只需要保證「打得開、能離線進菜單」。 */
var MAXB = 4 * 1024 * 1024;
function cacheable(res) {
  var n = parseInt(res.headers.get('content-length') || '', 10);
  return !(n > MAXB);
}
