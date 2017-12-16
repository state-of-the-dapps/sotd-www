import Vuex from 'vuex'
import axios from '~/helpers/axios'
import announcementsModule from './modules/announcements'
import projectsModule from './modules/projects'
import eventsModule from './modules/events'
import newsletterModule from './modules/newsletter'
import tagsModule from './modules/tags'

const actions = {
  nuxtServerInit ({ commit }) {
    return axios
      .get('stats')
      .then(response => {
        const payload = response.data.payload
        const items = payload.items
        commit('SET_STATS', items)
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
  statProjectCount: state => {
    return state.stats.projectCount
  },
  statEventCount: state => {
    return state.stats.eventCount
  }
}

const mutations = {
  SET_SITE_SECTION (state, section) {
    state.site.section = section
  },
  SET_STATS (state, items) {
    state.stats.projectCount = items.projectCount
    state.stats.eventCount = items.eventCount
  }
}

const state = {
  site: {
    section: ''
  },
  stats: {
    projectCount: 0,
    eventCount: 0
  }
}

const createStore = () => {
  return new Vuex.Store({
    actions,
    getters,
    modules: {
      announcements: announcementsModule,
      projects: projectsModule,
      events: eventsModule,
      newsletter: newsletterModule,
      tags: tagsModule
    },
    mutations,
    state
  })
}

export default createStore
