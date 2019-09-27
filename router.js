import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './helpers/utils'
import { languages } from './helpers/constants'

Vue.use(Router)

const About = () =>
  interopDefault(
    import('~/pages/About.vue' /* webpackChunkName: "pages/about" */)
  )
const Collections = () =>
  interopDefault(
    import('~/pages/Collections.vue' /* webpackChunkName: "pages/collections" */)
  )
const CollectionDetail = () =>
  interopDefault(
    import('~/pages/CollectionDetail.vue' /* webpackChunkName: "pages/collection-detail" */)
  )
const DappDetail = () =>
  interopDefault(
    import('~/pages/DappDetail.vue' /* webpackChunkName: "pages/dapp-detail" */)
  )
const DappDetailDirect = () =>
  interopDefault(
    import('~/pages/DappDetailDirect.vue' /* webpackChunkName: "pages/dapp-detail-direct" */)
  )
const DappDetailEdit = () =>
  interopDefault(
    import('~/pages/DappDetailEdit.vue' /* webpackChunkName: "pages/dapp-detail-edit" */)
  )
const DappDetailFlag = () =>
  interopDefault(
    import('~/pages/DappDetailFlag.vue' /* webpackChunkName: "pages/dapp-detail-flag" */)
  )
const DappDetailImprove = () =>
  interopDefault(
    import('~/pages/DappDetailImprove.vue' /* webpackChunkName: "pages/dapp-detail-improve" */)
  )
const DappDetailMeta = () =>
  interopDefault(
    import('~/pages/DappDetailMeta.vue' /* webpackChunkName: "pages/dapp-detail-meta" */)
  )
const Dapps = () =>
  interopDefault(
    import('~/pages/Dapps.vue' /* webpackChunkName: "pages/dapps" */)
  )
const DappsNew = () =>
  interopDefault(
    import('~/pages/DappsNew.vue' /* webpackChunkName: "pages/dapps-new" */)
  )
const DappsNewConfirmation = () =>
  interopDefault(
    import('~/pages/DappsNewConfirmation.vue' /* webpackChunkName: "pages/dapps-new-confirmation" */)
  )
const Home = () =>
  interopDefault(
    import('~/pages/Home.vue' /* webpackChunkName: "pages/home" */)
  )
const HelpMetamask = () =>
  interopDefault(
    import('~/pages/HelpMetamask.vue' /* webpackChunkName: "pages/help-metamask" */)
  )
const Logos = () =>
  interopDefault(
    import('~/pages/Logos.vue' /* webpackChunkName: "pages/logos" */)
  )
const Platform = () =>
  interopDefault(
    import('~/pages/Platform.vue' /* webpackChunkName: "pages/platform" */)
  )
const Platforms = () =>
  interopDefault(
    import('~/pages/Platforms.vue' /* webpackChunkName: "pages/platforms" */)
  )
const PromotedDapps = () =>
  interopDefault(
    import('~/pages/PromotedDapps.vue' /* webpackChunkName: "pages/promoted-dapps" */)
  )
const PromotedDappsDirect = () =>
  interopDefault(
    import('~/pages/PromotedDappsDirect.vue' /* webpackChunkName: "pages/promoted-dapps-direct" */)
  )
const Rankings = () =>
  interopDefault(
    import('~/pages/Rankings.vue' /* webpackChunkName: "pages/rankings" */)
  )
const Spotlights = () =>
  interopDefault(
    import('~/pages/Spotlights.vue' /* webpackChunkName: "pages/spotlights" */)
  )
const SpotlightDetail = () =>
  interopDefault(
    import('~/pages/SpotlightDetail.vue' /* webpackChunkName: "pages/spotlight-detail" */)
  )
const Stats = () =>
  interopDefault(
    import('~/pages/Stats.vue' /* webpackChunkName: "pages/stats" */)
  )
const Teardowns = () =>
  interopDefault(
    import('~/pages/Teardowns.vue' /* webpackChunkName: "pages/teardowns" */)
  )
const Terms = () =>
  interopDefault(
    import('~/pages/Terms.vue' /* webpackChunkName: "pages/terms" */)
  )
const What = () =>
  interopDefault(
    import('~/pages/What.vue' /* webpackChunkName: "pages/what" */)
  )

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })

    if (window.location.hash) {
      const initialHash = window.location.hash.replace('#', '')
      const initialHashEl = document.getElementById(initialHash)
      if (initialHashEl) {
        initialHashEl.scrollIntoView({
          block: 'start'
        })
      }
    }
  }
}
const scrollBehavior = function(to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (
          typeof window.CSS !== 'undefined' &&
          typeof window.CSS.escape !== 'undefined'
        ) {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn(
            'Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).'
          )
        }
      }
      resolve(position)
    })
  })
}

const i18nRoutes = Object.freeze([
  (prefix, lang) => ({
    path: prefix + '/',
    component: Home,
    name: 'home___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/about',
    component: About,
    name: 'about___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/collections',
    component: Collections,
    name: 'collections___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/collections/:slug',
    component: CollectionDetail,
    name: 'collection-detail___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/submit/new',
    component: DappsNew,
    name: 'dapps-new___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/new/form',
    redirect: { name: 'help-metamask___' + lang }
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/submit/new/confirmation',
    component: DappsNewConfirmation,
    name: 'dapps-new-confirmation___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/:slug',
    component: DappDetailDirect,
    name: 'dapp-detail-direct___' + lang
  }),
  (prefix, lang) => ({
    // XXX duplicate?
    path: prefix + '/dapps/:slug',
    component: DappDetail,
    name: 'dapp-detail___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/:slug/edit',
    component: DappDetailEdit,
    name: 'dapp-detail-edit___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/:slug/flag',
    component: DappDetailFlag,
    name: 'dapp-detail-flag___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/:slug/improve',
    component: DappDetailImprove,
    name: 'dapp-detail-improve___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/:slug/meta',
    component: DappDetailMeta,
    name: 'dapp-detail-meta___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/logos',
    component: Logos,
    name: 'logos___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/rankings',
    component: Rankings,
    name: 'rankings___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/rankings/category/:category',
    component: Rankings,
    name: 'rankings-category___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/rankings/platform/:platform',
    component: Rankings,
    name: 'rankings-platform___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/rankings/platform/:platform/category/:category',
    component: Rankings,
    name: 'rankings-platform-category___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/platforms/:platform',
    component: Platform,
    name: 'platforms-platform___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/platforms',
    component: Platforms,
    name: 'platforms___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/promoted-dapps',
    component: PromotedDappsDirect,
    name: 'promoted-dapps-direct___' + lang
  }),
  (prefix, lang) => ({
    // XXX duplicate?
    path: prefix + '/promoted-dapps',
    component: PromotedDapps,
    name: 'promoted-dapps___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/submit',
    redirect: { name: 'dapps-new___' + lang }
  }),
  (prefix, lang) => ({
    path: prefix + '/tagged/metamask',
    redirect: { name: 'help-metamask___' + lang }
  }),
  (prefix, lang) => ({
    path: prefix + '/tagged/:tags',
    redirect: to => {
      const { params } = to
      return {
        name: 'dapps___' + lang,
        query: { tags: params.tags }
      }
    }
  }),
  (prefix, lang) => ({
    path: prefix + '/tagged/:tags/tab/:tab',
    redirect: to => {
      const { params } = to
      return {
        name: 'dapps___' + lang,
        query: {
          tags: params.tags,
          tab: params.tab
        }
      }
    }
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/tagged/:tags',
    redirect: to => {
      const { params } = to
      return {
        name: 'dapps___' + lang,
        query: { tags: params.tags }
      }
    }
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/tagged/:tags/tab/:tab',
    redirect: to => {
      const { params } = to
      return {
        name: 'dapps___' + lang,
        query: {
          tags: params.tags,
          tab: params.tab
        }
      }
    }
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps',
    component: Dapps,
    name: 'dapps___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/category/:category',
    component: Dapps,
    name: 'dapps-category___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/platform/:platform',
    component: Dapps,
    name: 'dapps-platform___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/platform/:platform/category/:category',
    component: Dapps,
    name: 'dapps-platform-category___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/dapps/tab/:tab',
    redirect: to => {
      const { params } = to
      return {
        name: 'dapps___' + lang,
        query: { tab: params.tab }
      }
    }
  }),
  (prefix, lang) => ({
    path: prefix + '/tab/:tab',
    redirect: to => {
      const { params } = to
      return {
        name: 'dapps___' + lang,
        query: { tab: params.tab }
      }
    }
  }),
  (prefix, lang) => ({
    path: prefix + '/help/metamask',
    component: HelpMetamask,
    name: 'help-metamask___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/stats',
    component: Stats,
    name: 'stats___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/stats/category/:category',
    component: Stats,
    name: 'stats-category___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/stats/platform/:platform',
    component: Stats,
    name: 'stats-platform___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/stats/platform/:platform/category/:category',
    component: Stats,
    name: 'stats-platform-category___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/spotlights/:slug',
    component: SpotlightDetail,
    name: 'spotlight-detail___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/spotlights',
    component: Spotlights,
    name: 'spotlights___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/teardowns',
    component: Teardowns,
    name: 'teardowns___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/terms',
    component: Terms,
    name: 'terms___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '/whats-a-dapp',
    component: What,
    name: 'what___' + lang
  }),
  (prefix, lang) => ({
    path: prefix + '*',
    redirect: { name: 'home___' + lang }
  })
])

export function createRouter() {
  const routes = []
  i18nRoutes.forEach(i18nRoute => {
    languages.forEach(language => {
      const lang = language.selection
      const prefix = lang === 'en' ? '' : '/' + lang
      routes.push(i18nRoute(prefix, lang))
    })
  })

  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes,
    fallback: false
  })
}
