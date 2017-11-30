const actions = {
  fetch: ({ commit }) => {
    axios.get('announcement')
    .then(response => {
      commit('SET', response.data)
    })
  },
  hide: ({ commit }) => {
    commit('HIDE')
  }
}

const getters = {
  status: state => {
    return state.status
  },
  message: state => {
    return state.message
  },
  url: state => {
    return state.url
  },
  urlText: state => {
    return state.urlText
  }
}

const mutations = {
  HIDE (state) {
    state.status = false
  },
  SET (state, announcement) {
    Object.assign(state, announcement)
  }
}

const state = {
  message: '',
  status: false,
  url: '',
  urlText: ''
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
