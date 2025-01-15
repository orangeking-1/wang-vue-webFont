importScripts("/precache-manifest.66e42da216411420576bd14c5c05daf6.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// 监听 server worker安装事件
// self.addEventListener('install', function (e) {
//   console.log('[Service Worker] Install')
// })
//
// self.addEventListener('fetch', function (event) {
//   console.log('[Service Worker] fetch')
// })

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.skipWaiting();
workbox.clientsClaim();


workbox.routing.registerRoute('/', workbox.strategies.cacheFirst());


// self.addEventListener('push', (event) => {
//     const title = 'Get Started With Workbox';
//     const options = {
//         body: event.data.text()
//     };
//     event.waitUntil(self.registration.showNotification(title, options));
// });


workbox.precaching.precacheAndRoute([]);

