const cacheName = 'my-app-v1';

const cacheAssets = [
	'app.css',
	'main.js',
	'index.html',
]

self.addEventListener('install', event => {
	console.log('Service Worker: Installed');

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			console.log('Service Worker: Caching Files');
			cache.addAll(cacheAssets);
		}).then(() => self.skipWaiting())
	);
});

self.addEventListener("fetch", event => {
	console.log('Service Worker: Fetching');
	// event.respondWith(
	// 	fetch(event.request).then(res => {
	// 		const resClone = res.clone();
	// 		caches.open(cacheName).then(cache => {
	// 			//Add response to cache
	// 			cache.put(event.request, resClone);
	// 		});
	// 		return res;
	// 	})
	// )
	event.respondWith(caches.match(event.request)
	.then(response => {
		 if(response)
		 {
			  console.log('Found response in cache:', response);
			  return response;
		 }
		 else
		 {
			  return fetch(event.request);
		 }
	}));
});

self.addEventListener("activate", event => {
	console.log('Service Worker: Activated');
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if(cache !== cacheName) {
						console.log('Service Worker: Clearing Old Cache');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});
