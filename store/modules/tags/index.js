import axios from '~/helpers/axios'

const actions = {
  fetchItems: ({ commit, state, rootState }, value) => {
    axios
      .get('tags', { params: { query: value, exclude: rootState.dapps.list.query.tags } })
      .then(response => {
        commit('SET_ITEMS', response.data)
      })
  },
  resetItems: ({ commit }) => {
    commit('RESET_ITEMS')
  },
  selectItem: ({ commit }, index) => {
    commit('SELECT_ITEM', index)
  }
}

const getters = {
  items: state => {
    return state.items
  }
}

const mutations = {
  RESET_ITEMS (state) {
    state.items = []
  },
  SELECT_ITEM (state, index) {
    state.items.splice(index, 1)
  },
  SET_ITEMS (state, items) {
    state.items = items
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
