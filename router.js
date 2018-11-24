import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const About = () => import('~/pages/About.vue').then(m => m.default || m)
const Collections = () =>
  import('~/pages/collections/index.vue').then(m => m.default || m)
const CollectionsSlug = () =>
  import('~/pages/collections/_slug.vue').then(m => m.default || m)
const DappDetail = () =>
  import('~/pages/DappDetail.vue').then(m => m.default || m)
const DappDetailDirect = () =>
  import('~/pages/DappDetailDirect.vue').then(m => m.default || m)
const DappDetailEdit = () =>
  import('~/pages/DappDetailEdit.vue').then(m => m.default || m)
const DappDetailImprove = () =>
  import('~/pages/DappDetailImprove.vue').then(m => m.default || m)
const DappDetailMeta = () =>
  import('~/pages/DappDetailMeta.vue').then(m => m.default || m)
const Dapps = () => import('~/pages/dapps/index.vue').then(m => m.default || m)
const DappsNew = () => import('~/pages/dapps/new.vue').then(m => m.default || m)
const DappsNewConfirmation = () =>
  import('~/pages/dapps/new/confirmation.vue').then(m => m.default || m)
const Home = () => import('~/pages/Home.vue').then(m => m.default || m)
const Logos = () => import('~/pages/Logos.vue').then(m => m.default || m)
const Placeholder = () =>
  import('~/components/shared/Placeholder.vue').then(m => m.default || m)
const PromotedDapps = () =>
  import('~/pages/PromotedDapps.vue').then(m => m.default || m)
const PromotedDappsDirect = () =>
  import('~/pages/PromotedDappsDirect.vue').then(m => m.default || m)
const PublicList = () =>
  import('~/pages/PublicList.vue').then(m => m.default || m)
const Rankings = () => import('~/pages/Rankings.vue').then(m => m.default || m)
const Stats = () => import('~/pages/Stats.vue').then(m => m.default || m)
const Terms = () => import('~/pages/Terms.vue').then(m => m.default || m)
const What = () => import('~/pages/What.vue').then(m => m.default || m)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function(to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
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
        name: 'home'
      },
      {
        path: '/about',
        component: About,
        name: 'about'
      },
      {
        path: '/collections',
        component: Collections,
        name: 'collections'
      },
      {
        path: '/collections/:slug',
        component: CollectionsSlug,
        name: 'collections-slug'
      },
      {
        path: '/dapps/:slug',
        component: DappDetailDirect,
        name: 'dapp-detail-direct'
      },
      {
        path: '/dapps/:slug',
        component: DappDetail,
        name: 'dapp-detail'
      },
      {
        path: '/dapps/:slug/edit',
        component: DappDetailEdit,
        name: 'dapp-detail-edit'
      },
      {
        path: '/dapps/:slug/improve',
        component: DappDetailImprove,
        name: 'dapp-detail-improve'
      },
      {
        path: '/dapps/:slug/meta',
        component: DappDetailMeta,
        name: 'dapp-detail-meta'
      },
      {
        path: '/dapps/submit/new',
        component: DappsNew,
        name: 'dapps-new'
      },
      {
        path: '/dapps/new/form',
        redirect: { name: 'dapps-new' }
      },
      {
        path: '/dapps/submit/new/confirmation',
        component: DappsNewConfirmation,
        name: 'dapps-new-confirmation'
      },
      {
        path: '/lists/:list_url',
        component: PublicList,
        name: 'public-list'
      },
      {
        path: '/lists/:list_url/:slug',
        component: PublicList,
        name: 'public-list-slug'
      },
      {
        path: '/logos',
        component: Logos,
        name: 'logos'
      },
      {
        path: '/rankings',
        component: Rankings,
        name: 'rankings'
      },
      {
        path: '/rankings/category/:category',
        component: Rankings,
        name: 'rankings-category'
      },
      {
        path: '/rankings/platform/:platform',
        component: Rankings,
        name: 'rankings-platform'
      },
      {
        path: '/rankings/platform/:platform/category/:category',
        component: Rankings,
        name: 'rankings-platform-category'
      },
      {
        path: '/promoted-dapps',
        component: PromotedDappsDirect,
        name: 'promoted-dapps-direct'
      },
      {
        path: '/promoted-dapps',
        component: PromotedDapps,
        name: 'promoted-dapps'
      },
      {
        path: '/tab/:tab',
        redirect: {
          name: 'dapps-tab'
        }
      },
      {
        path: '/tagged/:tags',
        redirect: {
          name: 'dapps-tags'
        }
      },
      {
        path: '/tagged/:tags/tab/:tab',
        redirect: {
          name: 'dapps-tab-tags'
        }
      },
      // the root /dapps route goes after other /dapps/{params} routes, so that a direct GET to any other /dapps/{params} will render before /dapps child routes
      {
        path: '/dapps',
        component: Dapps,
        name: 'dapps',
        children: [
          {
            path: 'tab/:tab',
            component: Placeholder,
            name: 'dapps-tab'
          },
          {
            path: 'tagged/:tags',
            component: Placeholder,
            name: 'dapps-tags'
          },
          {
            path: 'tagged/:tags/tab/:tab',
            component: Placeholder,
            name: 'dapps-tab-tags'
          }
        ]
      },
      {
        path: '/stats',
        component: Stats,
        name: 'stats'
      },
      {
        path: '/terms',
        component: Terms,
        name: 'terms'
      },
      {
        path: '/whats-a-dapp',
        component: What,
        name: 'what'
      }
    ],
    fallback: false
  })
}
