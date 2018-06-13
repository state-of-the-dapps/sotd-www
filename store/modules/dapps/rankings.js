import axios from '~/helpers/axios'
import { dappListDefaultLimit, dappListDefaultSort, dappListDefaultOrder } from '~/helpers/constants'

const actions = {
  fetchDapps ({ commit, state }) {
    commit('SET_LOADING_STATUS', true)
    axios
      .get('dapps', {
        params: {
          limit: state.limit,
          offset: state.offset,
          order: state.order,
          sort: state.sort
        }
      })
      .then(response => {
        const data = response.data
        commit('SET_DAPPS', data)
        commit('SET_LOADING_STATUS', false)
      })
  }
}

const getters = {
  dapps: state => {
    return state.dapps
  },
  isLoading: state => {
    return state.isLoading
  }
}

const mutations = {
  SET_DAPPS (state, data) {
    state.dapps = data.items
  },
  SET_LOADING_STATUS (state, status) {
    state.isLoading = status
  }
}

const state = () => ({
  dapps: [],
  isLoading: true,
  limit: dappListDefaultLimit,
  offset: 0,
  order: dappListDefaultOrder,
  sort: dappListDefaultSort,
  totalCount: 0
})

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
