const CACHE_NAME = 'baddie-tracker-v17'; // Cuando hagas un cambio en el futuro, solo sube este número (v8, v9...)
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './fondo.png',
  './banner.png',
  './icono.png'
];

// 1. INSTALACIÓN: Guarda los archivos nuevos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Magia: Obliga al celular a instalar la nueva versión de inmediato
  );
});

// 2. ACTIVACIÓN: Borra la basura vieja (Esto es lo que faltaba)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName); // Destruye la versión vieja
          }
        })
      );
    }).then(() => self.clients.claim()) // Magia: Toma el control de la pantalla al instante
  );
});

// 3. FETCH: Muestra la app sin internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
