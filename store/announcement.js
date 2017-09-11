import axios from '~/plugins/axios'

export const state = () => {
  return {
    status: false,
    message: '',
    link: ''
  }
}

export const mutations = {
  hide (state) {
    state.status = false
  },
  set (state, announcement) {
    Object.assign(state, announcement)
  }
}

export const actions = {
  hide: ({ commit }) => {
    commit('hide')
  },
  set: ({ commit }) => {
    axios.get('announcement.json')
    .then(response => {
      commit('set', response.data)
    })
  }
}

export const getters = {
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
