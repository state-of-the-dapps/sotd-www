const actions = {
  fetchItems({ commit, rootState }, query) {
    this.$axios
      .get('tags', {
        params: {
          text: query.value,
          excluded: rootState.dapps.search.query.tags,
          type: query.model
        }
      })
      .then(response => {
        const data = response.data
        const items = data.items
        commit('SET_ITEMS', items)
      })
  },
  resetItems({ commit }) {
    commit('RESET_ITEMS')
  },
  selectItem({ commit }, index) {
    commit('SELECT_ITEM', index)
  }
}

const getters = {
  items: state => {
    return state.items
  }
}

const mutations = {
  RESET_ITEMS(state) {
    state.items = []
  },
  SELECT_ITEM(state, index) {
    state.items.splice(index, 1)
  },
  SET_ITEMS(state, items) {
    state.items = items
  }
}

const state = () => ({
  items: []
})

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
