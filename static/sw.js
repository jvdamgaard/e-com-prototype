importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/e-com-prototype/_nuxt/app.849c953d37d3639d8dd3.js",
    "revision": "ef64e096b6349084a34aa674190b8b30"
  },
  {
    "url": "/e-com-prototype/_nuxt/common.ce34e7a292bd4efe33f2.js",
    "revision": "2c2eccaeb9e9c23281f76170f6d54ec6"
  },
  {
    "url": "/e-com-prototype/_nuxt/layouts/default.f6888458bcf876aa5a18.js",
    "revision": "ebf815887e4eadaed2fa973d66327ecd"
  },
  {
    "url": "/e-com-prototype/_nuxt/manifest.af8cae059f61e91a66c1.js",
    "revision": "a2089d98b2dfd9f85eb07dcc0c9ffce3"
  },
  {
    "url": "/e-com-prototype/_nuxt/pages/index.e7b316f9a32c6f23226e.js",
    "revision": "4d7b23f3f2fcbba7d8332d6434742180"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-1.0-test_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/e-com-prototype/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/e-com-prototype/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
