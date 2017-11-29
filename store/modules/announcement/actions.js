import axios from '~/plugins/axios'

export default {
  hide: ({ commit }) => {
    commit('HIDE')
  },
  fetch: ({ commit }) => {
    axios.get('announcement')
    .then(response => {
      commit('SET', response.data)
    })
  }
}
