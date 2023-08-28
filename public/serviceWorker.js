// Utilisation de importScripts pour charger les scripts nécessaires
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// Enregistrement d'une route pour les requêtes d'images
workbox.routing.registerRoute(
  // Vérification si la requête est pour une image
  ({request}) => request.destination === 'image',
  // Utilisation de la stratégie CacheFirst
  new workbox.strategies.CacheFirst({
    // Utilisation du cache, puis du réseau si l'élément n'est pas en cache
    cacheName: 'images',
    plugins: [
      // Assure que seules 60 images sont conservées dans le cache
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        // Supprime les images du cache après 30 jours
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);