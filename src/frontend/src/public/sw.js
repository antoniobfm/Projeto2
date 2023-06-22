self.addEventListener('install', (event) => {
    console.log('Service worker has been installed');
    event.waitUntil(
    caches.open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets).catch((err) => {
                console.log('Error: ', err);
            }).then(() => {
                self.skipWaiting();
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service worker has been activated');

    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );

    // Claim the clients
    self.clients.claim();


});

self.addEventListener('fetch', (event) => {
    console.log('Fetch event intercepted for:', event.request.url);

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request).then(fetchResponse => {
                return caches.open(cacheName).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                })
            }
            ).catch(err => {
                console.log('Error: ', err);
            });
        }
    ));
});

const cacheName = 'v4';

const protocolosRoutes = [
    '/routes/protocolos/index.html',
    '/routes/protocolos/script.js',
    '/routes/protocolos/styles.js',


    // Create New

    '/routes/protocolos/CreateNew/index.html',
    '/routes/protocolos/CreateNew/index.js',
    '/routes/protocolos/CreateNew/styles.js',
    '/routes/protocolos/CreateNew/CollectionStrucutre/index.js',
    '/routes/protocolos/CreateNew/CollectionStrucutre/styles.js',
    '/routes/protocolos/CreateNew/CollectionStrucutre/CollectionField/index.js',
    '/routes/protocolos/CreateNew/CollectionStrucutre/CollectionField/styles.js',
    '/routes/protocolos/CreateNew/GeneralInformation/index.js',
    '/routes/protocolos/CreateNew/GeneralInformation/styles.js',


    // ExportSamples

    '/routes/protocolos/ExportSamples/index.js',
    '/routes/protocolos/ExportSamples/styles.js',


    // Lista

    '/routes/protocolos/Lista/index.html',
    '/routes/protocolos/Lista/index.js',
    '/routes/protocolos/Lista/styles.js',
    '/routes/protocolos/Lista/ListaItem/index.js',
    '/routes/protocolos/Lista/ListaItem/styles.js',


    // Protocolo

    '/routes/protocolos/Protocolo/index.js',
    '/routes/protocolos/Protocolo/styles.js',
];

const cacheAssets = [
    '/',
    'index.html',
    'app.js',
    'styles.js',
    '/routes/routes.js',

    // Routes
    ...protocolosRoutes,
]
