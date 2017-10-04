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
    "url": "/_nuxt/app.970058929948bc2f13f5.js",
    "revision": "8c9279d22061ab3b0be7c3d9eb9fc1ec"
  },
  {
    "url": "/_nuxt/common.c642fadb72be5063ebfd.js",
    "revision": "f8747d85e2d426110f9317dc5fc39ea3"
  },
  {
    "url": "/_nuxt/layouts/default.f6888458bcf876aa5a18.js",
    "revision": "ebf815887e4eadaed2fa973d66327ecd"
  },
  {
    "url": "/_nuxt/manifest.4bd185ecf59a8e7a116f.js",
    "revision": "a8aa9a33770c6cfbffacd7de3dfc5279"
  },
  {
    "url": "/_nuxt/pages/index.e7b316f9a32c6f23226e.js",
    "revision": "4d7b23f3f2fcbba7d8332d6434742180"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-1.0-test_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
