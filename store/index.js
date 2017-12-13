import Vuex from 'vuex'
import axios from '~/helpers/axios'
import announcementsModule from './modules/announcements'
<<<<<<< HEAD
import projectsModule from './modules/projects'
import eventsModule from './modules/events'
=======
import dappsModule from './modules/dapps'
>>>>>>> master
import newsletterModule from './modules/newsletter'
import tagsModule from './modules/tags'

const actions = {
  nuxtServerInit ({ commit }) {
    return axios
      .get('stats')
      .then(response => {
<<<<<<< HEAD
        const payload = response.data.payload
        const items = payload.items
        commit('SET_STATS', items)
=======
        commit('SET_DAPP_COUNT', response.data.dappCount)
>>>>>>> master
      })
  }
}

const getters = {
<<<<<<< HEAD
  statProjectCount: state => {
    return state.stats.projectCount
  },
  statEventCount: state => {
    return state.stats.eventCount
=======
  statDappCount: state => {
    return state.stats.dappCount
>>>>>>> master
  }
}

const mutations = {
<<<<<<< HEAD
  SET_STATS (state, items) {
    state.stats.projectCount = items.projectCount
    state.stats.eventCount = items.eventCount
=======
  SET_DAPP_COUNT (state, value) {
    state.stats.dappCount = value
>>>>>>> master
  }
}

const state = {
  stats: {
<<<<<<< HEAD
    projectCount: 0,
    eventCount: 0
=======
    dappCount: 0
>>>>>>> master
  }
}

const createStore = () => {
  return new Vuex.Store({
    actions,
    getters,
    modules: {
      announcements: announcementsModule,
<<<<<<< HEAD
      projects: projectsModule,
      events: eventsModule,
=======
      dapps: dappsModule,
>>>>>>> master
      newsletter: newsletterModule,
      tags: tagsModule
    },
    mutations,
    state
  })
}

export default createStore
