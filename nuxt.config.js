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
  mode: process.env.MODE || 'universal',
  modules: [
    '@nuxtjs/sentry',
    '@nuxtjs/router',
    ['@nuxtjs/google-analytics', { ua: process.env.GOOGLE_ANALYTICS }]
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
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    fullstory: process.env.FULLSTORY || '00000',
    mixpanel: process.env.MIXPANEL
  },
  head: {
    title: 'State of the ÐApps — Projects Built on Ethereum',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'State of the ÐApps is the curated collection of Decentralized Apps' },
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
    { src: '~/plugins/constants' },
    { src: '~/plugins/filters' },
    { src: '~/plugins/mixpanel', ssr: false },
    { src: '~/plugins/webfontloader', ssr: false },
    { src: '~/plugins/smoothscroll-polyfill', ssr: false },
    { src: '~/plugins/clipboard', ssr: false }
  ]
}
