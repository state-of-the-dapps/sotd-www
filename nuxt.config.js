const env = {
  apiUrl: process.env.API_URL || 'https://api.stateofthedapps.com/',
  cdnPublicPath: process.env.CDN_PUBLIC_PATH || '/_nuxt/',
  googleAnalytics: process.env.GOOGLE_ANALYTICS || 'UA-000000-1',
  fullstory: process.env.FULLSTORY,
  intercom: process.env.INTERCOM,
  mixpanel: process.env.MIXPANEL,
  mode: process.env.MODE || 'universal'
}

export default {
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    publicPath: env.cdnPublicPath
  },
  mode: env.mode,
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    '@nuxtjs/router',
    ['@nuxtjs/google-analytics', { id: env.googleAnalytics }],
    '@nuxtjs/markdownit',
    [
      'nuxt-i18n',
      {
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        },
        baseUrl: 'https://www.stateofthedapps.com',
        strategy: 'prefix_except_default',
        defaultLocale: 'en',
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          }
        ],
        lazy: true,
        langDir: 'lang/'
      }
    ]
  ],
  axios: {
    baseUrl: env.apiUrl,
    proxyHeaders: false,
    retry: true,
    progress: false
  },
  serverMiddleware: ['redirect-ssl'],
  css: ['~/assets/css/tailwind.css'],
  env: {
    apiUrl: env.apiUrl,
    fullstory: env.fullstory,
    intercom: env.intercom,
    mixpanel: env.mixpanel
  },
  head: {
    title: 'State of the ÐApps — Projects Built on Ethereum, EOS, POA & Steem',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'The curated list of decentralized applications'
      },
      { hid: 'image', property: 'og:image', content: '/og-default.png' },
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
  markdownit: {
    injected: true,
    linkify: false,
    breaks: true
  },
  plugins: [
    { src: '~/plugins/polyfills', ssr: false },
    { src: '~/plugins/vue-config' },
    { src: '~/plugins/vue-filters' },
    { src: '~/plugins/mixpanel', ssr: false },
    { src: '~/plugins/webfontloader', ssr: false },
    { src: '~/plugins/clipboard', ssr: false },
    { src: '~/plugins/intercom.js', ssr: false }
  ]
}
