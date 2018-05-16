import Vuex from 'vuex'
import axios from '~/helpers/axios'
import announcementsModule from './modules/announcements'
import collectionsModule from './modules/collections'
import dappsModule from './modules/dapps'
import eventsModule from './modules/events'
import newsletterModule from './modules/newsletter'
import tagsModule from './modules/tags'

const actions = {
  nuxtServerInit ({ commit }, { route }) {
    commit('SET_USER_ENTRY_ROUTE', route.path)
    return axios
      .get('stats')
      .then(response => {
        const data = response.data
        commit('SET_STATS', data)
      })
  },
  setHeroLoaded ({ commit }) {
    commit('SET_HERO_LOADED')
  },
  setSiteSection ({ commit }, section) {
    commit('SET_SITE_SECTION', section)
  },
  setSiteModal ({ commit }, modal) {
    commit('SET_SITE_MODAL', modal)
  }
}

const getters = {
  heroHasLoaded: state => {
    return state.site.heroHasLoaded
  },
  siteSection: state => {
    return state.site.section
  },
  siteModal: state => {
    return state.site.modal
  },
  statDappCount: state => {
    return state.stats.dappCount
  },
  statEventCount: state => {
    return state.stats.eventCount
  },
  userEntryRoute: state => {
    return state.user.entryRoute
  }
}

const mutations = {
  SET_HERO_LOADED (state) {
    state.site.heroHasLoaded = true
  },
  SET_SITE_MODAL (state, modal) {
    state.site.modal = modal
  },
  SET_SITE_SECTION (state, section) {
    state.site.section = section
  },
  SET_STATS (state, data) {
    state.stats.dappCount = data.dappCount
    state.stats.eventCount = data.eventCount
  },
  SET_USER_ENTRY_ROUTE (state, path) {
    state.user.entryRoute = path
  }
}

const state = () => ({
  site: {
    heroHasLoaded: false,
    section: '',
    modal: {
      component: '',
      mpData: {}
    }
  },
  stats: {
    dappCount: 0,
    eventCount: 0
  },
  user: {
    entryRoute: ''
  }
})

const createStore = () => {
  return new Vuex.Store({
    actions,
    getters,
    modules: {
      announcements: announcementsModule,
      collections: collectionsModule,
      dapps: dappsModule,
      events: eventsModule,
      newsletter: newsletterModule,
      tags: tagsModule
    },
    mutations,
    state
  })
}

export default createStore
