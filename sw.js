const CACHE_NAME = "workout-shell-v5";
const APP_SHELL = [
  "./index.html",
  "./styles.css",
  "./filter.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("workout-shell-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const fetchAndCache = async (cacheKey) => {
    const response = await fetch(event.request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(cacheKey, response.clone());
    }
    return response;
  };

  if (event.request.mode === "navigate") {
    const cacheKey = "./index.html";
    const refresh = fetchAndCache(cacheKey);

    event.waitUntil(refresh.catch(() => undefined));
    event.respondWith(caches.match(cacheKey).then((cached) => cached || refresh));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetchAndCache(event.request))
  );
});
