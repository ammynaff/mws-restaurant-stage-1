const appName = "restaurant-reviews"
const staticCacheName = appName + "-v1.0";


const contentImgsCache = appName + "-images";

var allCaches = [
    staticCacheName,
    contentImgsCache
];


/** At Service Worker Install time, cache all static assets */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/restaurant.html',
                '/css/styles.css',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                'js/register-sw.js',
                'data/restaurants.json'

            ]);
        })
    );
})

/** Hijack fetch requests and respond accordingly */
self.addEventListener('fetch', function(event) {

    // Default behavior: respond with cached elements, if any, falling back to network.
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});