const lruCache = require('lru-cache');
const contentful = require('contentful');
const kebabCase = require('lodash/kebabCase');

module.exports = {

  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CM_ACCESS_TOKEN: process.env.CTF_CM_ACCESS_TOKEN,
    CTF_CD_ACCESS_TOKEN: process.env.CTF_CD_ACCESS_TOKEN,
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-1.0-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { 'http-equiv': 'Accept-CH', content: 'DPR, Width, Viewport-Width' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  css: [
    '@/assets/css/global.css',
  ],

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#7FB800' },
  /*
  ** Build configuration
  */
  router: {
    base: (process.env.NODE_ENV === 'generate') ? '/e-com-prototype/' : '/',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return false;
    },
  },
  generate: {
    routes() {
      const routes = [];
      return contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CD_ACCESS_TOKEN,
      })
        .getEntries({ content_type: 'product' })
        .then(response => (
          response.items.forEach(item => routes.push(`/produkt/${kebabCase(item.fields.titel)}/${item.sys.id}/`))
        ))

        .then(() => routes);
    },
  },
  build: {
    extractCSS: true,
    vendor: [
      './utils',
      './components/Grid.vue',
      './components/GridCol.vue',
      './components/Btn.vue',
      './components/ProductCard.vue',
      'axios',
      'vue-lazyload',
      'lodash/throttle',
      'lodash/kebabCase',
      'lodash/debounce',
      'contentful-management',
      'contentful',
      'hash.js/lib/hash/sha/256',
      'marked',
    ],

    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
      if (ctx.dev) {
        config.module.rules[0].options.cssModules = { //eslint-disable-line
          localIdentName: '[path]---[name]---[local]',
        };
      } else {
        config.module.rules[0].options.cssModules = { //eslint-disable-line
          localIdentName: '[hash:base64:5]',
        };
      }
    },
  },
  renderer: {
    http2: {
      push: true,
    },
    bundleRenderer: {
      cache: lruCache({
        max: 1000,
        maxAge: 1000 * 60 * 15,
      }),
    },
  },
  plugins: [
    { src: '~plugins/persisted-state.js', ssr: false },
    { src: '~plugins/lazy-load.js' },
  ],
  modules: (process.env.NODE_ENV === 'generate') ? [
    '@nuxtjs/icon',
    '@nuxtjs/manifest',
    '@nuxtjs/meta',
    '@nuxtjs/workbox',
  ] : [],
};
