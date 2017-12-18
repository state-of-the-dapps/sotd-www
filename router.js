import Vue from 'vue'
import Router from 'vue-router'

const About = () => import('~/pages/about.vue').then(m => m.default || m)
const Events = () => import('~/pages/events/index.vue').then(m => m.default || m)
const EventsNew = () => import('~/pages/events/new.vue').then(m => m.default || m)
const EventsNewConfirmation = () => import('~/pages/events/new.vue').then(m => m.default || m)
const EventsSlug = () => import('~/pages/events/_slug.vue').then(m => m.default || m)
const EventsSlugPopup = () => import('~/pages/events/_slug/popup.vue').then(m => m.default || m)
const Placeholder = () => import('~/components/shared/Placeholder.vue').then(m => m.default || m)
const Projects = () => import('~/pages/projects/index.vue').then(m => m.default || m)
const ProjectsNew = () => import('~/pages/projects/new.vue').then(m => m.default || m)
const ProjectsNewConfirmation = () => import('~/pages/projects/new/confirmation.vue').then(m => m.default || m)
const ProjectsSlug = () => import('~/pages/projects/_slug.vue').then(m => m.default || m)
const ProjectsSlugPopup = () => import('~/pages/projects/_slug/popup.vue').then(m => m.default || m)
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
        path: '/projects/submit/new',
        component: ProjectsNew,
        name: 'projects-new'
      },
      {
        path: '/projects/submit/new/confirmation',
        component: ProjectsNewConfirmation,
        name: 'projects-new-confirmation'
      },
      {
        path: '/projects/:slug',
        component: ProjectsSlug,
        name: 'projects-slug'
      },
      // the root /projects route goes after other /projects/{params} routes, so that a direct GET to any other /projects/{params} will render before /projects child routes
      {
        path: '/',
        component: Projects,
        children: [
          {
            path: '',
            component: Placeholder,
            name: 'projects'
          },
          {
            path: 'tagged/:tags',
            component: Placeholder,
            name: 'projects-tagged-tags',
            children: [
              {
                path: 'tab/:tab',
                component: Placeholder,
                name: 'projects-tagged-tags-tab-tab'
              }
            ]
          },
          {
            path: 'tab/:tab',
            component: Placeholder,
            name: 'projects-tab-tab'
          },
          {
            path: 'projects/:slug',
            component: ProjectsSlugPopup,
            name: 'projects-slug-popup'
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
