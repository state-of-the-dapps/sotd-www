import axios from '~/helpers/axios'

const state = () => ({
  items: []
})

const actions = {
  fetchItems: ({ commit, state }) => {
    axios
      .get('collections/list/featured')
      .then(response => {
        const data = response.data
        commit('SET_ITEMS', data)
      })
  }
}

const mutations = {
  SET_ITEMS (state, data) {
    state.items = data
  }
}

const getters = {
  items: state => {
    return state.items
  }
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
