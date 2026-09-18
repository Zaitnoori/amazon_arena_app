// Amazon Arena - Service Worker

const CACHE_NAME = 'amazon-arena-v1';
const urlsToCache = [
  '/amazon_arena_app/',
  '/amazon_arena_app/index.html',
  '/amazon_arena_app/style.css',
  '/amazon_arena_app/app.js',
  '/amazon_arena_app/amazon-arena.svg',
  '/amazon_arena_app/manifest.json'
];

// نصب
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// فعالول
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// د غوښتنو جواب
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
