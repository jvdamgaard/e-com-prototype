const lruCache = require('lru-cache');
const contentful = require('contentful');
const kebabCase = require('lodash/kebabCase');

module.exports = {

  env: {
    CTF_SPACE_ID: 'n8ckv2qtuzei',
    CTF_CM_ACCESS_TOKEN: process.env.CTF_CM_ACCESS_TOKEN || 'netlify',
    CTF_CD_ACCESS_TOKEN: process.env.CTF_CD_ACCESS_TOKEN || 'netlify',
    DEPLOY_PRIME_URL: process.env.DEPLOY_PRIME_URL,
    CTF_MAIN_NAVIGATION_ID: '3gZRQakcIUAsEMe6Q46oGa',
    CTF_MY_ACCOUNT_NAVIGATION_ID: '1H40crtAkYmmkaW8IQG2SO',
    CTF_MORE_MRKT_NAVIGATION_ID: '2aIFu001R6YM60uwuu2IeE',
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
    scrollBehavior() {
      return false;
    },
  },
  generate: {
    routes: async () => {
      const routes = [];

      const client = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CD_ACCESS_TOKEN,
      });

      const [
        productEntries,
        departmentEntries,
        brandEntries,
        plpEntries,
      ] = await Promise.all([
        client.getEntries({ content_type: 'product', limit: 1000 }),
        client.getEntries({ content_type: 'department', limit: 1000 }),
        client.getEntries({ content_type: 'brand', limit: 1000 }),
        client.getEntries({ content_type: 'productListPage', limit: 1000 }),
      ]);

      // Products
      productEntries.items.forEach(item => routes.push(`/produkt/${kebabCase(item.fields.titel)}/${item.sys.id}/`));

      // Departments
      departmentEntries.items.forEach(item => routes.push(`/afdeling/${kebabCase(item.fields.titel)}/${item.sys.id}/`));

      // Brands
      brandEntries.items.forEach(item => routes.push(`/brand/${kebabCase(item.fields.titel)}/${item.sys.id}/`));

      // Product List Pages
      plpEntries.items.forEach(item => routes.push(`/produkter/${kebabCase(item.fields.titel)}/${item.sys.id}/`));

      return routes;
    },
  },
  build: {
    vendor: [
      './utils',
      './components/Grid.vue',
      './components/GridCol.vue',
      './components/Btn.vue',
      './components/ProductCard.vue',
      // 'axios',
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
    { src: '~plugins/disable-hover-on-scroll.js', ssr: false },
    { src: '~plugins/lazy-load.js' },
  ],
  modules: (process.env.NODE_ENV === 'generate') ? [
    '@nuxtjs/icon',
    '@nuxtjs/manifest',
    '@nuxtjs/meta',
    '@nuxtjs/workbox',
  ] : [],
};
