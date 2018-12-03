import Vuex from 'vuex'
import announcementsModule from './modules/announcements'
import collectionsModule from './modules/collections'
import dappsModule from './modules/dapps'
import listModule from './modules/list'
import newsletterModule from './modules/newsletter'
import tagsModule from './modules/tags'

const actions = {
  nuxtServerInit({ commit }, { app, route }) {
    commit('SET_USER_ENTRY_ROUTE', route.path)
    return app.$axios.get('stats').then(response => {
      const data = response.data
      commit('SET_STATS', data)
    })
  },
  setHeroLoaded({ commit }) {
    commit('SET_HERO_LOADED')
  },
  setPageModal({ commit }, value) {
    commit('SET_PAGE_MODAL', value)
  },
  setSearch({ commit }, value) {
    commit('SET_SEARCH', value)
  },
  setSiteSection({ commit }, section) {
    commit('SET_SITE_SECTION', section)
  },
  setSiteModal({ commit }, modal) {
    commit('SET_SITE_MODAL', modal)
  }
}

const getters = {
  heroHasLoaded: state => {
    return state.site.heroHasLoaded
  },
  pageModal: state => {
    return state.pageModal
  },
  search: state => {
    return state.search
  },
  siteSection: state => {
    return state.site.section
  },
  siteModal: state => {
    return state.site.modal
  },
  statCategories: state => {
    return state.stats.categories
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
  statPlatforms: state => {
    return state.stats.platforms
  },
  statStatuses: state => {
    return state.stats.statuses
  },
  userEntryRoute: state => {
    return state.user.entryRoute
  }
}

const mutations = {
  SET_HERO_LOADED(state) {
    state.site.heroHasLoaded = true
  },
  SET_PAGE_MODAL(state, value) {
    state.pageModal = value
  },
  SET_SEARCH(state, value) {
    state.search = value
  },
  SET_SITE_MODAL(state, modal) {
    state.site.modal = modal
  },
  SET_SITE_SECTION(state, section) {
    state.site.section = section
  },
  SET_STATS(state, data) {
    state.stats = data
  },
  SET_USER_ENTRY_ROUTE(state, path) {
    state.user.entryRoute = path
  }
}

const state = () => ({
  pageModal: '',
  search: '',
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
    categories: [],
    dappContractCount: 0,
    dappCount: 0,
    dappDau: 0,
    dappTx24Hr: 0,
    dappVol24Hr: 0,
    platforms: [],
    statuses: []
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
      list: listModule,
      newsletter: newsletterModule,
      tags: tagsModule
    },
    mutations,
    state
  })
}

export default createStore
