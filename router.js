import Vue from 'vue'
import Router from 'vue-router'

import About from '~/components/pages/about.vue'
import Confirmation from '~/components/pages/confirmation.vue'
import Index from '~/components/pages/index.vue'
import IndexIndex from '~/components/pages/index/index.vue'
import IndexDapp from '~/components/pages/index/dapps/_slug.vue'
import Submit from '~/components/pages/submit.vue'
import WhatsADapp from '~/components/pages/whats-a-dapp.vue'
import Dapp from '~/components/pages/dapps/_slug.vue'

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
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
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
			path: "/dapps/:slug?",
			component: Dapp,
			name: "dapps-slug"
		},
		{
			path: "/",
			component: Index,
			children: [
				{
					path: "",
					component: IndexIndex,
					name: "index"
				},
				{
					path: "dapps/:slug?",
					component: IndexDapp,
					name: "index-dapps-slug"
				}
			]
		},
		{
			path: "/whats-a-dapp",
			component: WhatsADapp,
			name: "whats-a-dapp"
		},
		{
			path: "/confirmation",
			component: Confirmation,
			name: "confirmation"
		},
		{
			path: "/about",
			component: About,
			name: "about"
		},
		{
			path: "/submit",
			component: Submit,
			name: "submit"
		}
    ],
    fallback: false
  })
}