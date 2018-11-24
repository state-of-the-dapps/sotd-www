const state = () => ({
  collection: {}
})

const actions = {
  setCollection({ commit }, collection) {
    commit('SET_COLLECTION', collection)
  }
}

const mutations = {
  SET_COLLECTION(state, collection) {
    state.collection = collection
  }
}

const getters = {
  collection: state => {
    return state.collection
  }
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
