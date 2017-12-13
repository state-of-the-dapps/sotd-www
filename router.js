import Vue from 'vue'
import Router from 'vue-router'

const About = () => import('~/pages/about.vue').then(m => m.default || m)
<<<<<<< HEAD
const Project = () => import('~/pages/projects/_slug.vue').then(m => m.default || m)
const ProjectConfirmation = () => import('~/pages/projects/confirmation.vue').then(m => m.default || m)
const ProjectNew = () => import('~/pages/projects/new.vue').then(m => m.default || m)
const Events = () => import('~/pages/events/index.vue').then(m => m.default || m)
const Index = () => import('~/pages/index.vue').then(m => m.default || m)
const IndexProject = () => import('~/pages/index/projects/_slug.vue').then(m => m.default || m)
const Placeholder = () => import('~/components/shared/Placeholder.vue').then(m => m.default || m)
const Terms = () => import('~/pages/terms.vue').then(m => m.default || m)
const WhatsADapp = () => import('~/pages/whatsADapp.vue').then(m => m.default || m)
=======
const CreateConfirmation = () => import('~/pages/confirmation/create.vue').then(m => m.default || m)
const Index = () => import('~/pages/index.vue').then(m => m.default || m)
const Placeholder = () => import('~/components/shared/Placeholder.vue').then(m => m.default || m)
const IndexDapp = () => import('~/pages/index/dapps/_slug.vue').then(m => m.default || m)
const DappNew = () => import('~/pages/dapps/new.vue').then(m => m.default || m)
const Terms = () => import('~/pages/terms.vue').then(m => m.default || m)
const WhatsADapp = () => import('~/pages/whatsADapp.vue').then(m => m.default || m)
const Dapp = () => import('~/pages/dapps/_slug.vue').then(m => m.default || m)
>>>>>>> master

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
<<<<<<< HEAD
=======
      },
      {
        path: '/confirmation/new',
        component: CreateConfirmation,
        name: 'confirmation-new'
>>>>>>> master
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
<<<<<<< HEAD
        path: '/projects/submit/confirmation',
        component: ProjectConfirmation,
        name: 'projects-submit-confirmation'
      },
      {
        path: '/projects/submit/new',
        component: ProjectNew,
        name: 'projects-submit-new'
      },
      {
        path: '/projects/:slug?',
        component: Project,
        name: 'projects-slug'
=======
        path: '/dapps/new/form',
        component: DappNew,
        name: 'dappNew'
>>>>>>> master
      },
      {
        path: '/events',
        component: Events,
        name: 'events'
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
<<<<<<< HEAD
                path: 'tab/:tab',
                component: Placeholder,
                name: 'index-tagged-tags-show-tab'
=======
                path: 'tab/:category',
                component: Placeholder,
                name: 'index-tagged-tags-show-category'
>>>>>>> master
              }
            ]
          },
          {
<<<<<<< HEAD
            path: 'tab/:tab',
            component: Placeholder,
            name: 'index-tab-tab'
=======
            path: 'tab/:category',
            component: Placeholder,
            name: 'index-tab-category'
>>>>>>> master
          },
          {
            path: 'projects/:slug?',
            component: IndexProject,
            name: 'index-projects-slug'
          }
        ]
      }
    ],
    fallback: false
  })
}
