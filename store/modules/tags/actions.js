import axios from '~/plugins/axios'

export default {
  fetchItems: ({ commit, state, rootState }, value) => {
    axios
      .get('tags', { params: { query: value, excluded: rootState.dapps.query.tags } })
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
