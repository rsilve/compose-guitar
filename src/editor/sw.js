const cacheName = `compose-guitar`;

self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                `/`,
                `/index.html`,
                `/editor/editor.js`,
                `/assets/main.css`,
                `/assets/print.css`,
                `/assets/favicon.ico`,
                `/assets/favicon-16x16.png`,
                `/assets/favicon-32x32.png`,
                `/assets/apple-touch-icon.png`,
                `/assets/android-chrome-192x192.png`,
                `/assets/android-chrome-512x512.png`,

            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, {ignoreSearch: true}))
            .then(response => {
                return Promise.resolve(response) || fetch(event.request);
            })
    );
});
