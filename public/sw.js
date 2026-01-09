// Service Worker para cache de assets estáticos
const CACHE_NAME = 'informatica-pratica-v2';
const urlsToCache = [
  '/',
  '/src/assets/logo-new.png',
  '/src/assets/video-poster-hero.jpg',
  '/src/assets/hero-video-new.mp4',
];

// Instalar e fazer cache dos recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
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

// Estratégia: Network First, fallback para Cache
self.addEventListener('fetch', (event) => {
  // Só fazer cache de GET requests
  if (event.request.method !== 'GET') return;
  
  // Não fazer cache de APIs
  if (event.request.url.includes('/functions/') || 
      event.request.url.includes('supabase.co') ||
      event.request.url.includes('mercadopago')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se a resposta é válida, clonar e salvar no cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Se falhar, tentar buscar do cache
        return caches.match(event.request);
      })
  );
});
