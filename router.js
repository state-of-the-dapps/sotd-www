import Vue from 'vue'
import Router from 'vue-router'

const About = () => import('~/pages/about.vue').then(m => m.default || m)
const Dapps = () => import('~/pages/dapps/index.vue').then(m => m.default || m)
const DappsNew = () => import('~/pages/dapps/new.vue').then(m => m.default || m)
const DappsNewConfirmation = () => import('~/pages/dapps/new/confirmation.vue').then(m => m.default || m)
const DappsSlug = () => import('~/pages/dapps/_slug.vue').then(m => m.default || m)
const DappsSlugPopup = () => import('~/pages/dapps/_slug/popup.vue').then(m => m.default || m)
const Events = () => import('~/pages/events/index.vue').then(m => m.default || m)
const EventsNew = () => import('~/pages/events/new.vue').then(m => m.default || m)
const EventsNewConfirmation = () => import('~/pages/events/new.vue').then(m => m.default || m)
const EventsSlug = () => import('~/pages/events/_slug.vue').then(m => m.default || m)
const EventsSlugPopup = () => import('~/pages/events/_slug/popup.vue').then(m => m.default || m)
const Placeholder = () => import('~/components/shared/Placeholder.vue').then(m => m.default || m)
const Terms = () => import('~/pages/terms.vue').then(m => m.default || m)
const What = () => import('~/pages/what.vue').then(m => m.default || m)

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
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
        path: '/about',
        component: About,
        name: 'about'
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
        children: [
          {
            path: '',
            component: Placeholder,
            name: 'events'
          },
          {
            path: 'tagged/:tags',
            component: Placeholder,
            name: 'events-tagged-tags',
            children: [
              {
                path: 'tab/:tab',
                component: Placeholder,
                name: 'events-tagged-tags-tab-tab'
              }
            ]
          },
          {
            path: 'tab/:tab',
            component: Placeholder,
            name: 'events-tab-tab'
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
        path: '/dapps/submit/new/confirmation',
        component: DappsNewConfirmation,
        name: 'dapps-new-confirmation'
      },
      {
        path: '/dapps/:slug',
        component: DappsSlug,
        name: 'dapps-slug'
      },
      // the root /dapps route goes after other /dapps/{params} routes, so that a direct GET to any other /dapps/{params} will render before /dapps child routes
      {
        path: '/',
        component: Dapps,
        children: [
          {
            path: '',
            component: Placeholder,
            name: 'dapps'
          },
          {
            path: 'tagged/:tags',
            component: Placeholder,
            name: 'dapps-tagged-tags',
            children: [
              {
                path: 'tab/:tab',
                component: Placeholder,
                name: 'dapps-tagged-tags-tab-tab'
              }
            ]
          },
          {
            path: 'tab/:tab',
            component: Placeholder,
            name: 'dapps-tab-tab'
          },
          {
            path: 'dapps/:slug',
            component: DappsSlugPopup,
            name: 'dapps-slug-popup'
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
