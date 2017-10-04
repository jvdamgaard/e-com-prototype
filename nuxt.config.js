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
    '@/assets/css/main.css',
  ],

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#009EE0' },
  /*
  ** Build configuration
  */
  router: {
    base: (process.env.NODE_ENV === 'generate') ? '/e-com-prototype/' : '/',
  },
  build: {
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
  modules: [
    ['@nuxtjs/pwa', { icon: false }],
  ],
};
