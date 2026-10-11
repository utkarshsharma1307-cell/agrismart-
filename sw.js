const CACHE_NAME = 'agriprotect-v1.0.0';
const STATIC_ASSETS = [
  '/', '/index.html', '/login.html', '/dashboard.html',
  '/soil-health.html', '/weather.html', '/crop-advisor.html',
  '/disease-detection.html', '/expenses.html', '/tasks.html',
  '/crop-calendar.html', '/market-prices.html', '/profit-planner.html',
  '/farmer-finance.html', '/irrigation-calculator.html',
  '/fertilizer-calculator.html', '/crop-comparison.html',
  '/harvest-planner.html',
  '/assistant.html', '/settings.html', '/voice-guide.html',
  '/css/styles.css', '/js/app.js', '/js/features.js',
  '/img/logo.jpeg',
  'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
  'https://unpkg.com/lucide@latest/dist/umd/lucide.js'
];

// Install - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch - cache-first for static, network-first for HTML
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET
  if (event.request.method !== 'GET') return;

  // URL matching origin or CDN
  if (url.origin !== location.origin && !url.origin.includes('fonts.googleapis.com') && !url.origin.includes('unpkg.com')) return;

  // HTML pages: network-first (fresh content), fallback to cache
  if (event.request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
    )
  );
});

// Background sync for pending exports (future)
self.addEventListener('sync', event => {
  if (event.tag === 'export-data') {
    event.waitUntil(Promise.resolve());
  }
});

// Push notifications (future: weather alerts)
self.addEventListener('push', event => {
  // Future implementation
});