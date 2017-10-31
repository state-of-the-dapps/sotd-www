import axios from '~/plugins/axios'

export const state = () => {
  return {
    dappCount: 0
  }
}

export const mutations = {
  setDappCount (state, value) {
    state.dappCount = value
  }
}

export const actions = {
  nuxtServerInit ({ commit }) {
    return axios
      .get('stats')
      .then(response => {
        commit('setDappCount', response.data.dappCount)
      })
  }
}

export const getters = {
  dappCount: state => {
    return state.dappCount
  }
}
