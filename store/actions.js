import axios from '~/plugins/axios'

export default {
  // render stats server side for SEO
  nuxtServerInit ({ commit }) {
    return axios
      .get('stats')
      .then(response => {
        commit('SET_DAPP_COUNT', response.data.dappCount)
      })
  }
}
