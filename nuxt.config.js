const lruCache = require('lru-cache');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-1.0-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
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
    routes: [
      '/produkt/worx-varmepistol/1/',
      '/produkt/apple-i-phone-8/2/',
      '/produkt/d-bramante-mac-book-pro-15-envelope-gt/3/',
      '/produkt/lego-super-heroes-helteduel/4/',
      '/produkt/nofu-garderobestativ/5/',
      '/produkt/nofu-sofa/6/',
      '/produkt/nofu-spisebordsstol/7/',
      '/produkt/nofu-loungestol/8/',
      '/produkt/nofu-spisebord/9/',
      '/produkt/apple-mac-book-pro/10/',
      '/produkt/steelplay-retro-line-edge-arcade-stick/11/',
      '/produkt/apple-magic-trackpad-2/12/',
      '/produkt/apple-i-mac-27-retina/13/',
      '/produkt/sco-verdensmestercykel-med-7-gear/14/',
      '/produkt/braendetarn-af-lufttorret-avnbog/15/',
      '/produkt/charbroil-cb-36-inkl-5-dele/16/',
      '/produkt/danica-comfort-moskusdyne/17/',
      '/produkt/kenwood-premier-chef-m-blender-og-kodhakker/18/',
      '/produkt/toshiba-tv-55-uhd-55-u-6663/19/',
      '/produkt/sco-rebel-sh-105-22-gear/20/',
      '/produkt/kettler-cycle-p-motionscykel/21/',
      '/produkt/in-shape-fitnessbold-inkl-pumpe/22/',
      '/produkt/kerteminde-cafesaet-80-cm-med-2-stole/23/',
      '/produkt/ron-thompson-carbon-x-10-10-40-g/24/',
      '/produkt/ps-4-fifa-18/25/',
      '/produkt/charbroil-big-easy-inkl-overtraek/26/',
      '/produkt/apple-i-phone-x/27/',
      '/produkt/in-shape-mavetraeningshjul/28/',
      '/produkt/ron-thompson-ontario-jakke/29/',
    ],
  },
  build: {
    analyze: true,
    vendor: [
      './utils',
      './components/Grid.vue',
      './components/GridCol.vue',
      './components/Btn.vue',
      './components/ProductSlider.vue',
      './components/ProductCard.vue',
      'axios',
      'vue-lazyload',
      'lodash/throttle',
      'lodash/kebabCase',
      'lodash/debounce',
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
  modules: [
    '@nuxtjs/icon',
    '@nuxtjs/manifest',
    '@nuxtjs/meta',
    '@nuxtjs/workbox',
  ],
};
