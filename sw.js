const CACHE = 'mama-memorial-v2';
const ASSETS = [
  '/mama-memorial/',
  '/mama-memorial/index.html',
  '/mama-memorial/gallery.html',
  '/mama-memorial/recordings.html',
  '/mama-memorial/timeline.html',
  '/mama-memorial/memories.html',
  '/mama-memorial/family-wall.html',
  '/mama-memorial/tributes.html',
  '/mama-memorial/foundation.html',
  '/mama-memorial/styles.css',
  '/mama-memorial/nav.js',
  '/mama-memorial/portrait.jpg',
  '/mama-memorial/mama-vintage.jpeg',
  '/mama-memorial/mama-hymn.mp3',
  '/mama-memorial/icon-192.png',
  '/mama-memorial/icon-512.png',
  '/mama-memorial/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/mama-memorial/index.html')))
  );
});
