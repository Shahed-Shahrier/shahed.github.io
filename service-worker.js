const CACHE_NAME = "shahed-portfolio-v26";
const OFFLINE_URL = "offline.html";
const PRECACHE_URLS = [
  "./",
  "index.html",
  "about.html",
  "education.html",
  "achievements.html",
  "certifications.html",
  "archive.html",
  "projects.html",
  "contact.html",
  "robots.txt",
  "sitemap.xml",
  OFFLINE_URL,
  "styles.css?v=terminal-22",
  "site.js?v=terminal-22",
  "manifest.webmanifest",
  "assets/profile-icon.png?v=icon-1",
  "assets/apple-touch-icon.png?v=icon-1",
  "assets/digiland3.jpeg?v=digiland-1",
  "assets/image1.png",
  "assets/20250925_230505.jpg",
  "assets/PXL_20251025_111908472.jpg",
  "assets/Screenshot 2025-10-25 142627.png",
  "assets/achievements/rab-ctftime.png",
  "assets/achievements/bup-ctf.png",
  "assets/achievements/circuit-clash.png",
  "assets/achievements/stealthflags-cuet.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(event.request);
          if (cachedPage) {
            return cachedPage;
          }
          const offlineResponse = await caches.match(OFFLINE_URL);
          return offlineResponse || Response.error();
        })
    );
    return;
  }

  if (requestUrl.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return networkResponse;
        });
      })
    );
  }
});
