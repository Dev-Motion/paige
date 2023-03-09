/// <reference lib="ES2015" />
/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;
export {};

// add an onFetch event listener to the chrome extension service worker
self.addEventListener("fetch", (event) => {
  // Check if this is a request for an image
  if (event.request.url.startsWith("http")) {
    //skip request
    if (event.request.destination === "image") {
      event.respondWith(
        caches.open("paige-assets").then((cache) => {
          // Go to the cache first
          return cache.match(event.request.url).then((cachedResponse) => {
            // Return a cached response if we have one
            if (cachedResponse) {
              return cachedResponse;
            }

            // Otherwise, hit the network
            return fetch(event.request).then((fetchedResponse) => {
              // Add the network response to the cache for later visits
              cache.put(event.request, fetchedResponse.clone());

              // Return the network response
              return fetchedResponse;
            });
          });
        })
      );
    } else {
      return;
    }
  }
  return;
});
