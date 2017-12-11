import axios from '~/helpers/axios'

const actions = {
  fetch: ({ commit }) => {
    axios.get('announcements')
    .then(response => {
      const payload = response.data.payload
      const items = payload.items
      commit('SET', items)
    })
  },
  hide: ({ commit }) => {
    commit('HIDE')
  }
}

const getters = {
  items: state => {
    return state.items
  }
}

const mutations = {
  HIDE (state) {
    state.isActive = false
  },
  SET (state, items) {
    state.items = items
  }
}

const state = {
  items: [],
  isActive: true
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
