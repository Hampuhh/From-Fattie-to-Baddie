const CACHE_NAME = 'baddie-tracker-v3'; // <-- Subimos a v3 para que tu celular descargue el nuevo código
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
