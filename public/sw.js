// Service Worker for caching static assets
const CACHE_NAME = 'agora-insurance-v1';
const STATIC_CACHE = [
  '/',
  '/src/assets/hero-family-protection.webp',
  'https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQQoyeyHLkT11dPUxLBzT0DL1E7kSyYGfFwv6E3QjsJgnw.woff2'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Handle static assets
  if (event.request.url.includes('/assets/') || 
      event.request.url.includes('fonts.gstatic.com') ||
      event.request.url.includes('hero-family-protection.webp')) {
    
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          
          return fetch(event.request).then(response => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return response;
          });
        })
    );
  }
});