const env = {
  apiUrl: process.env.API_URL || 'https://api.stateofthedapps.com/v1/',
  googleAnalytics: process.env.GOOGLE_ANALYTICS,
  mixpanel: process.env.MIXPANEL,
  mode: process.env.MODE || 'universal'
}

module.exports = {
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'axios',
      'date-fns/format',
      'mixpanel-browser',
      'smoothscroll-polyfill',
      'vue-clickaway',
      'webfontloader'
    ]
  },
  generate: {
    routes: [
      '/'
    ]
  },
  /*
  ** mode: 'spa' is the other option: https://nuxtjs.org/api/configuration-mode
  */
  mode: env.mode,
  modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/router',
    ['@nuxtjs/google-analytics', { ua: env.googleAnalytics }]
  ],
  router: {
    saveScrollPosition: true
  },
  serverMiddleware: [
    'redirect-ssl'
  ],
  css: [
    { src: '~/assets/css/main.scss', lang: 'scss' }
  ],
  env: {
    apiUrl: env.apiUrl,
    mixpanel: env.mixpanel
  },
  head: {
    title: 'State of the ÐApps — Projects Built on Ethereum',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'The curated list of decentralized applications' },
      { name: 'theme-color', content: '#222' }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180'
      },
      {
        rel: 'icon',
        href: '/favicon-32x32.png',
        sizes: '32x32'
      },
      {
        rel: 'icon',
        href: '/favicon-16x16.png',
        sizes: '16x16'
      },
      {
        rel: 'manifest',
        href: '/manifest.json'
      }
    ]
  },
  loading: { color: '#333' },
  plugins: [
    { src: '~/plugins/polyfills', ssr: false },
    { src: '~/plugins/filters' },
    { src: '~/plugins/mixpanel', ssr: false },
    { src: '~/plugins/webfontloader', ssr: false },
    { src: '~/plugins/clipboard', ssr: false }
  ]
}
