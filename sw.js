const CACHE_NAME = 'baddie-tracker-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './fondo.jpg',
  './banner.jpg',
  './icono.png'
];

// Instalar el Service Worker y guardar en caché los archivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las solicitudes web para servir desde la caché si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la versión en caché si existe, de lo contrario busca en la red
        return response || fetch(event.request);
      })
  );
});
