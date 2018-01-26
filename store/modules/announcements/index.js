import axios from '~/helpers/axios'

const actions = {
  fetchItems: ({ commit }) => {
    axios.get('announcements')
    .then(response => {
      const data = response.data
      const items = data.items
      commit('SET_ITEMS', items)
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
    state.status = false
  },
  SET_ITEMS (state, items) {
    Object.assign(state, items)
  }
}

const state = {
  items: []
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
