import Vue from 'vue'
import Router from 'vue-router'

const About = () => import('~/pages/about.vue').then(m => m.default || m)
const CollectionsSlug = () => import('~/pages/collections/_slug.vue').then(m => m.default || m)
const Dapps = () => import('~/pages/dapps/index.vue').then(m => m.default || m)
const DappsNew = () => import('~/pages/dapps/new.vue').then(m => m.default || m)
const DappsNewConfirmation = () => import('~/pages/dapps/new/confirmation.vue').then(m => m.default || m)
const DappsSlug = () => import('~/pages/dapps/_slug.vue').then(m => m.default || m)
const DappsSlugDirect = () => import('~/pages/dapps/_slug_direct.vue').then(m => m.default || m)
const Events = () => import('~/pages/events/index.vue').then(m => m.default || m)
const EventsNew = () => import('~/pages/events/new.vue').then(m => m.default || m)
const EventsNewConfirmation = () => import('~/pages/events/new/confirmation.vue').then(m => m.default || m)
const EventsSlug = () => import('~/pages/events/_slug.vue').then(m => m.default || m)
const EventsSlugPopup = () => import('~/pages/events/_slug/popup.vue').then(m => m.default || m)
const Home = () => import('~/pages/home.vue').then(m => m.default || m)
const Placeholder = () => import('~/components/shared/Placeholder.vue').then(m => m.default || m)
const PromotedDapps = () => import('~/pages/promoted_dapps.vue').then(m => m.default || m)
const Terms = () => import('~/pages/terms.vue').then(m => m.default || m)
const What = () => import('~/pages/what.vue').then(m => m.default || m)

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    if (to.matched.length < 2) {
      position = { x: 0, y: 0 }
    } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
      position = { x: 0, y: 0 }
    }
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
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
        path: '/collections/:slug',
        component: CollectionsSlug,
        name: 'collections-slug'
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
        path: '/dapps/:slug',
        component: DappsSlugDirect,
        name: 'dapps-slug-direct'
      },
      {
        path: '/dapps/:slug',
        component: DappsSlug,
        name: 'dapps-slug'
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
