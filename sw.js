const CACHE_NAME = 'baddie-tracker-v4'; // <-- Caché v4 para aplicar todo lo kawaii
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './fondo.png',
  './banner.png',
  './icono.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
