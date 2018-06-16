import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const About = () => import('~/pages/about.vue').then(m => m.default || m)
const Collections = () => import('~/pages/collections/index.vue').then(m => m.default || m)
const CollectionsSlug = () => import('~/pages/collections/_slug.vue').then(m => m.default || m)
const DappDetail = () => import('~/pages/DappDetail.vue').then(m => m.default || m)
const DappDetailDirect = () => import('~/pages/DappDetailDirect.vue').then(m => m.default || m)
const Dapps = () => import('~/pages/dapps/index.vue').then(m => m.default || m)
const DappsNew = () => import('~/pages/dapps/new.vue').then(m => m.default || m)
const DappsNewConfirmation = () => import('~/pages/dapps/new/confirmation.vue').then(m => m.default || m)
const Events = () => import('~/pages/events/index.vue').then(m => m.default || m)
const EventsNew = () => import('~/pages/events/new.vue').then(m => m.default || m)
const EventsNewConfirmation = () => import('~/pages/events/new/confirmation.vue').then(m => m.default || m)
const EventsSlug = () => import('~/pages/events/_slug.vue').then(m => m.default || m)
const EventsSlugPopup = () => import('~/pages/events/_slug/popup.vue').then(m => m.default || m)
const Home = () => import('~/pages/home.vue').then(m => m.default || m)
const Placeholder = () => import('~/components/shared/Placeholder.vue').then(m => m.default || m)
const PromotedDapps = () => import('~/pages/promoted_dapps.vue').then(m => m.default || m)
const PromotedDappsDirect = () => import('~/pages/promoted_dapps_direct.vue').then(m => m.default || m)
const Rankings = () => import('~/pages/Rankings.vue').then(m => m.default || m)
const Terms = () => import('~/pages/terms.vue').then(m => m.default || m)
const What = () => import('~/pages/what.vue').then(m => m.default || m)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
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
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter () {
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
        path: '/events/submit/new',
        component: EventsNew,
        name: 'events-new'
      },
      {
        path: '/events/submit/new/confirmation',
        component: EventsNewConfirmation,
        name: 'events-new-confirmation'
      },
      {
        path: '/events/:slug',
        component: EventsSlug,
        name: 'events-slug'
      },
      // the root /events route goes after other /events/{params} routes, so that a direct GET to any other /events/{params} will render before /events child routes
      {
        path: '/events',
        component: Events,
        name: 'events',
        children: [
          {
            path: 'tagged/:tags',
            component: Placeholder,
            name: 'events-tagged-tags',
            children: [
              {
                path: 'category/:category',
                component: Placeholder,
                name: 'events-tagged-tags-category-category'
              }
            ]
          },
          {
            path: 'category/:category',
            component: Placeholder,
            name: 'events-category-category'
          },
          {
            path: ':slug',
            component: EventsSlugPopup,
            name: 'events-slug-popup'
          }
        ]
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
        path: '/rankings',
        component: Rankings,
        name: 'rankings',
        children: [
          {
            path: 'category/:category',
            component: Rankings,
            name: 'rankings-category'
          }
        ]
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
