const actions = {
  fetchItem({ commit }) {
    this.$axios.get('announcement').then(response => {
      const data = response.data
      const item = data.item
      commit('SET_ITEMS', item)
    })
  },
  hide({ commit }) {
    commit('HIDE')
  }
}

const getters = {
  item: state => {
    return state.item
  }
}

const mutations = {
  HIDE(state) {
    state.status = false
  },
  SET_ITEMS(state, item) {
    state.item = item
  }
}

const state = () => ({
  item: {}
})

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
