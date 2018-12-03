const actions = {
  setItems({ commit }, items) {
    commit('SET_ITEMS', items)
  }
}

const getters = {
  items: state => {
    return state.items
  }
}

const mutations = {
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
