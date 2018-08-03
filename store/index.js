import Vuex from 'vuex'
import axios from '~/helpers/axios'
import announcementsModule from './modules/announcements'
import collectionsModule from './modules/collections'
import dappsModule from './modules/dapps'
import listModule from './modules/list'
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
  statDappContractCount: state => {
    return state.stats.dappContractCount
  },
  statDappCount: state => {
    return state.stats.dappCount
  },
  statDappDau: state => {
    return state.stats.dappDau
  },
  statDappTx24Hr: state => {
    return state.stats.dappTx24Hr
  },
  statDappVol24Hr: state => {
    return state.stats.dappVol24Hr
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
    state.stats.dappContractCount = data.dappContractCount || 0
    state.stats.dappCount = data.dappCount || 0
    state.stats.dappDau = data.dappDau || 0
    state.stats.dappTx24Hr = data.dappTx24Hr || 0
    state.stats.dappVol24Hr = data.dappVol24Hr || 0
    state.stats.eventCount = data.eventCount || 0
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
      mpData: {},
      props: {}
    }
  },
  stats: {
    dappContractCount: 0,
    dappCount: 0,
    dappDau: 0,
    dappTx24Hr: 0,
    dappVol24Hr: 0,
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
      list: listModule,
      newsletter: newsletterModule,
      tags: tagsModule
    },
    mutations,
    state
  })
}

export default createStore
