import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

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
const Stats = () =>
  interopDefault(
    import('~/pages/Stats.vue' /* webpackChunkName: "pages/stats" */)
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
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function(to, from, savedPosition) {
  let position = { x: 0, y: 0 }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
      {
        path: '/',
        component: Home,
        name: 'home___en'
      },
      {
        path: '/de',
        component: Home,
        name: 'home___de'
      },
      {
        path: '/zh',
        component: Home,
        name: 'home___zh'
      },
      {
        path: '/about',
        component: About,
        name: 'about___en'
      },
      {
        path: '/de/about',
        component: About,
        name: 'about___de'
      },
      {
        path: '/zh/about',
        component: About,
        name: 'about___zh'
      },
      {
        path: '/collections',
        component: Collections,
        name: 'collections___en'
      },
      {
        path: '/de/collections',
        component: Collections,
        name: 'collections___de'
      },
      {
        path: '/zh/collections',
        component: Collections,
        name: 'collections___zh'
      },
      {
        path: '/collections/:slug',
        component: CollectionDetail,
        name: 'collection-detail___en'
      },
      {
        path: '/de/collections/:slug',
        component: CollectionDetail,
        name: 'collection-detail___de'
      },
      {
        path: '/zh/collections/:slug',
        component: CollectionDetail,
        name: 'collection-detail___zh'
      },
      {
        path: '/dapps/submit/new',
        component: DappsNew,
        name: 'dapps-new___en'
      },
      {
        path: '/de/dapps/submit/new',
        component: DappsNew,
        name: 'dapps-new___de'
      },
      {
        path: '/zh/dapps/submit/new',
        component: DappsNew,
        name: 'dapps-new___zh'
      },
      {
        path: '/dapps/new/form',
        redirect: { name: 'help-metamask___en' }
      },
      {
        path: '/de/dapps/new/form',
        redirect: { name: 'help-metamask___de' }
      },
      {
        path: '/zh/dapps/new/form',
        redirect: { name: 'help-metamask___zh' }
      },
      {
        path: '/dapps/submit/new/confirmation',
        component: DappsNewConfirmation,
        name: 'dapps-new-confirmation___en'
      },
      {
        path: '/de/dapps/submit/new/confirmation',
        component: DappsNewConfirmation,
        name: 'dapps-new-confirmation___de'
      },
      {
        path: '/zh/dapps/submit/new/confirmation',
        component: DappsNewConfirmation,
        name: 'dapps-new-confirmation___zh'
      },
      {
        path: '/dapps/:slug',
        component: DappDetailDirect,
        name: 'dapp-detail-direct___en'
      },
      {
        path: '/de/dapps/:slug',
        component: DappDetailDirect,
        name: 'dapp-detail-direct___de'
      },
      {
        path: '/zh/dapps/:slug',
        component: DappDetailDirect,
        name: 'dapp-detail-direct___zh'
      },
      {
        path: '/dapps/:slug',
        component: DappDetail,
        name: 'dapp-detail___en'
      },
      {
        path: '/de/dapps/:slug',
        component: DappDetail,
        name: 'dapp-detail___de'
      },
      {
        path: '/zh/dapps/:slug',
        component: DappDetail,
        name: 'dapp-detail___zh'
      },
      {
        path: '/dapps/:slug/edit',
        component: DappDetailEdit,
        name: 'dapp-detail-edit___en'
      },
      {
        path: '/de/dapps/:slug/edit',
        component: DappDetailEdit,
        name: 'dapp-detail-edit___de'
      },
      {
        path: '/zh/dapps/:slug/edit',
        component: DappDetailEdit,
        name: 'dapp-detail-edit___zh'
      },
      {
        path: '/dapps/:slug/flag',
        component: DappDetailFlag,
        name: 'dapp-detail-flag___en'
      },
      {
        path: '/de/dapps/:slug/flag',
        component: DappDetailFlag,
        name: 'dapp-detail-flag___de'
      },
      {
        path: '/zh/dapps/:slug/flag',
        component: DappDetailFlag,
        name: 'dapp-detail-flag___zh'
      },
      {
        path: '/dapps/:slug/improve',
        component: DappDetailImprove,
        name: 'dapp-detail-improve___en'
      },
      {
        path: '/de/dapps/:slug/improve',
        component: DappDetailImprove,
        name: 'dapp-detail-improve___de'
      },
      {
        path: '/zh/dapps/:slug/improve',
        component: DappDetailImprove,
        name: 'dapp-detail-improve___zh'
      },
      {
        path: '/dapps/:slug/meta',
        component: DappDetailMeta,
        name: 'dapp-detail-meta___en'
      },
      {
        path: '/de/dapps/:slug/meta',
        component: DappDetailMeta,
        name: 'dapp-detail-meta___de'
      },
      {
        path: '/zh/dapps/:slug/meta',
        component: DappDetailMeta,
        name: 'dapp-detail-meta___zh'
      },
      {
        path: '/logos',
        component: Logos,
        name: 'logos___en'
      },
      {
        path: '/de/logos',
        component: Logos,
        name: 'logos___de'
      },
      {
        path: '/zh/logos',
        component: Logos,
        name: 'logos___zh'
      },
      {
        path: '/rankings',
        component: Rankings,
        name: 'rankings___en'
      },
      {
        path: '/de/rankings',
        component: Rankings,
        name: 'rankings___de'
      },
      {
        path: '/zh/rankings',
        component: Rankings,
        name: 'rankings___zh'
      },
      {
        path: '/rankings/category/:category',
        component: Rankings,
        name: 'rankings-category___en'
      },
      {
        path: '/de/rankings/category/:category',
        component: Rankings,
        name: 'rankings-category___de'
      },
      {
        path: '/zh/rankings/category/:category',
        component: Rankings,
        name: 'rankings-category___zh'
      },
      {
        path: '/rankings/platform/:platform',
        component: Rankings,
        name: 'rankings-platform___en'
      },
      {
        path: '/de/rankings/platform/:platform',
        component: Rankings,
        name: 'rankings-platform___de'
      },
      {
        path: '/zh/rankings/platform/:platform',
        component: Rankings,
        name: 'rankings-platform___zh'
      },
      {
        path: '/rankings/platform/:platform/category/:category',
        component: Rankings,
        name: 'rankings-platform-category___en'
      },
      {
        path: '/de/rankings/platform/:platform/category/:category',
        component: Rankings,
        name: 'rankings-platform-category___de'
      },
      {
        path: '/zh/rankings/platform/:platform/category/:category',
        component: Rankings,
        name: 'rankings-platform-category___zh'
      },
      {
        path: '/promoted-dapps',
        component: PromotedDappsDirect,
        name: 'promoted-dapps-direct___en'
      },
      {
        path: '/de/promoted-dapps',
        component: PromotedDappsDirect,
        name: 'promoted-dapps-direct___de'
      },
      {
        path: '/zh/promoted-dapps',
        component: PromotedDappsDirect,
        name: 'promoted-dapps-direct___zh'
      },
      {
        path: '/promoted-dapps',
        component: PromotedDapps,
        name: 'promoted-dapps___en'
      },
      {
        path: '/de/promoted-dapps',
        component: PromotedDapps,
        name: 'promoted-dapps___de'
      },
      {
        path: '/zh/promoted-dapps',
        component: PromotedDapps,
        name: 'promoted-dapps___zh'
      },
      {
        path: '/submit',
        redirect: { name: 'dapps-new___en' }
      },
      {
        path: '/de/submit',
        redirect: { name: 'dapps-new___de' }
      },
      {
        path: '/zh/submit',
        redirect: { name: 'dapps-new___zh' }
      },
      {
        path: '/tagged/metamask',
        redirect: { name: 'help-metamask___en' }
      },
      {
        path: '/de/tagged/metamask',
        redirect: { name: 'help-metamask___de' }
      },
      {
        path: '/zh/tagged/metamask',
        redirect: { name: 'help-metamask___zh' }
      },
      {
        path: '/tagged/:tags',
        redirect: to => {
          const { params } = to
          return {
            name: 'dapps___en',
            query: { tags: params.tags }
          }
        }
      },
      {
        path: '/tagged/:tags/tab/:tab',
        redirect: to => {
          const { params } = to
          return {
            name: 'dapps___en',
            query: {
              tags: params.tags,
              tab: params.tab
            }
          }
        }
      },
      {
        path: '/dapps/tagged/:tags',
        redirect: to => {
          const { params } = to
          return {
            name: 'dapps___en',
            query: { tags: params.tags }
          }
        }
      },
      {
        path: '/dapps/tagged/:tags/tab/:tab',
        redirect: to => {
          const { params } = to
          return {
            name: 'dapps___en',
            query: {
              tags: params.tags,
              tab: params.tab
            }
          }
        }
      },
      {
        path: '/dapps',
        component: Dapps,
        name: 'dapps___en'
      },
      {
        path: '/de/dapps',
        component: Dapps,
        name: 'dapps___de'
      },
      {
        path: '/zh/dapps',
        component: Dapps,
        name: 'dapps___zh'
      },
      {
        path: '/dapps/category/:category',
        component: Dapps,
        name: 'dapps-category___en'
      },
      {
        path: '/de/dapps/category/:category',
        component: Dapps,
        name: 'dapps-category___de'
      },
      {
        path: '/zh/dapps/category/:category',
        component: Dapps,
        name: 'dapps-category___zh'
      },
      {
        path: '/dapps/platform/:platform',
        component: Dapps,
        name: 'dapps-platform___en'
      },
      {
        path: '/de/dapps/platform/:platform',
        component: Dapps,
        name: 'dapps-platform___de'
      },
      {
        path: '/zh/dapps/platform/:platform',
        component: Dapps,
        name: 'dapps-platform___zh'
      },
      {
        path: '/dapps/platform/:platform/category/:category',
        component: Dapps,
        name: 'dapps-platform-category___en'
      },
      {
        path: '/de/dapps/platform/:platform/category/:category',
        component: Dapps,
        name: 'dapps-platform-category___de'
      },
      {
        path: '/zh/dapps/platform/:platform/category/:category',
        component: Dapps,
        name: 'dapps-platform-category___zh'
      },
      {
        path: '/dapps/tab/:tab',
        redirect: to => {
          const { params } = to
          return {
            name: 'dapps___en',
            query: { tab: params.tab }
          }
        }
      },
      {
        path: '/tab/:tab',
        redirect: to => {
          const { params } = to
          return {
            name: 'dapps___en',
            query: { tab: params.tab }
          }
        }
      },
      {
        path: '/help/metamask',
        component: HelpMetamask,
        name: 'help-metamask___en'
      },
      {
        path: '/de/help/metamask',
        component: HelpMetamask,
        name: 'help-metamask___de'
      },
      {
        path: '/zh/help/metamask',
        component: HelpMetamask,
        name: 'help-metamask___zh'
      },
      {
        path: '/stats',
        component: Stats,
        name: 'stats___en'
      },
      {
        path: '/de/stats',
        component: Stats,
        name: 'stats___de'
      },
      {
        path: '/zh/stats',
        component: Stats,
        name: 'stats___zh'
      },
      {
        path: '/stats/category/:category',
        component: Stats,
        name: 'stats-category___en'
      },
      {
        path: '/de/stats/category/:category',
        component: Stats,
        name: 'stats-category___de'
      },
      {
        path: '/zh/stats/category/:category',
        component: Stats,
        name: 'stats-category___zh'
      },
      {
        path: '/stats/platform/:platform',
        component: Stats,
        name: 'stats-platform___en'
      },
      {
        path: '/de/stats/platform/:platform',
        component: Stats,
        name: 'stats-platform___de'
      },
      {
        path: '/zh/stats/platform/:platform',
        component: Stats,
        name: 'stats-platform___zh'
      },
      {
        path: '/stats/platform/:platform/category/:category',
        component: Stats,
        name: 'stats-platform-category___en'
      },
      {
        path: '/de/stats/platform/:platform/category/:category',
        component: Stats,
        name: 'stats-platform-category___de'
      },
      {
        path: '/zh/stats/platform/:platform/category/:category',
        component: Stats,
        name: 'stats-platform-category___zh'
      },
      {
        path: '/terms',
        component: Terms,
        name: 'terms___en'
      },
      {
        path: '/de/terms',
        component: Terms,
        name: 'terms___de'
      },
      {
        path: '/zh/terms',
        component: Terms,
        name: 'terms___zh'
      },
      {
        path: '/whats-a-dapp',
        component: What,
        name: 'what___en'
      },
      {
        path: '/de/whats-a-dapp',
        component: What,
        name: 'what___de'
      },
      {
        path: '/zh/whats-a-dapp',
        component: What,
        name: 'what___zh'
      },
      {
        path: '*',
        redirect: { name: 'home___en' }
      },
      {
        path: '/de/*',
        redirect: { name: 'home___de' }
      },
      {
        path: '/zh/*',
        redirect: { name: 'home___zh' }
      }
    ],
    fallback: false
  })
}
