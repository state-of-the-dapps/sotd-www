import Vue from 'vue'
import Router from 'vue-router'

const About = () => import('~/pages/about.vue').then(m => m.default || m)
const CreateConfirmation = () => import('~/pages/confirmation/create.vue').then(m => m.default || m)
const Index = () => import('~/pages/index.vue').then(m => m.default || m)
const Placeholder = () => import('~/components/shared/Placeholder.vue').then(m => m.default || m)
const IndexDapp = () => import('~/pages/index/dapps/_slug.vue').then(m => m.default || m)
const DappNew = () => import('~/pages/dapps/new.vue').then(m => m.default || m)
const Terms = () => import('~/pages/terms.vue').then(m => m.default || m)
const WhatsADapp = () => import('~/pages/whatsADapp.vue').then(m => m.default || m)
const Dapp = () => import('~/pages/dapps/_slug.vue').then(m => m.default || m)

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
        path: '/whats-a-dapp',
        component: WhatsADapp,
        name: 'whatsadapp'
      },
      {
        path: '/confirmation/new',
        component: CreateConfirmation,
        name: 'confirmation-new'
      },
      {
        path: '/about',
        component: About,
        name: 'about'
      },
      {
        path: '/terms',
        component: Terms,
        name: 'terms'
      },
      {
        path: '/dapps/new/form',
        component: DappNew,
        name: 'dappNew'
      },
      {
        path: '/dapps/:slug?',
        component: Dapp,
        name: 'dapps-slug'
      },
      {
        path: '/',
        component: Index,
        children: [
          {
            path: '',
            component: Placeholder,
            name: 'index'
          },
          {
            path: 'tagged/:tags',
            component: Placeholder,
            name: 'index-tagged-tags',
            children: [
              {
                path: 'tab/:category',
                component: Placeholder,
                name: 'index-tagged-tags-show-category'
              }
            ]
          },
          {
            path: 'tab/:category',
            component: Placeholder,
            name: 'index-tab-category'
          },
          {
            path: 'dapps/:slug?',
            component: IndexDapp,
            name: 'index-dapps-slug'
          }
        ]
      }
    ],
    fallback: false
  })
}
