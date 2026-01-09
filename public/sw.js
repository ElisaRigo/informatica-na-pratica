// Service Worker para cache de assets estáticos
const CACHE_NAME = 'informatica-pratica-v3';

// Instalar e fazer cache dos recursos
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Ativar e limpar caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia: Stale While Revalidate para assets
self.addEventListener('fetch', (event) => {
  // Só fazer cache de GET requests
  if (event.request.method !== 'GET') return;
  
  // Não fazer cache de APIs
  const url = event.request.url;
  if (url.includes('/functions/') || 
      url.includes('supabase.co') ||
      url.includes('mercadopago') ||
      url.includes('youtube') ||
      url.includes('google')) {
    return;
  }

  // Cache first para assets estáticos
  if (url.includes('/assets/') || url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.webp')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetched = fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
        return cached || fetched;
      })
    );
    return;
  }

  // Network first para HTML e JS
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});