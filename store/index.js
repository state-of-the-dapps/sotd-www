import Vuex from 'vuex'
import axios from '~/helpers/axios'
import announcementsModule from './modules/announcements'
import dappsModule from './modules/dapps'
import eventsModule from './modules/events'
import newsletterModule from './modules/newsletter'
import tagsModule from './modules/tags'

const actions = {
  nuxtServerInit ({ commit }) {
    return axios
      .get('stats')
      .then(response => {
        const data = response.data
        commit('SET_STATS', data)
      })
  },
  setSiteSection ({ commit }, section) {
    commit('SET_SITE_SECTION', section)
  }
}

const getters = {
  siteSection: state => {
    return state.site.section
  },
  statDappCount: state => {
    return state.stats.dappCount
  },
  statEventCount: state => {
    return state.stats.eventCount
  }
}

const mutations = {
  SET_SITE_SECTION (state, section) {
    state.site.section = section
  },
  SET_STATS (state, data) {
    state.stats.dappCount = data.dappCount
    state.stats.eventCount = data.eventCount
  }
}

const state = () => ({
  site: {
    section: ''
  },
  stats: {
    dappCount: 0,
    eventCount: 0
  }
})

const createStore = () => {
  return new Vuex.Store({
    actions,
    getters,
    modules: {
      announcements: announcementsModule,
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
