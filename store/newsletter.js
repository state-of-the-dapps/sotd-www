import axios from '~/plugins/axios'

export const state = () => {
  return {
    dropdown: false,
    confirmation: false,
    email: '',
    emailIsValid: false,
    isLoading: false
  }
}

export const mutations = {
  isLoading (state, status) {
    state.isLoading = status
  },
  subscribe (state) {
    state.confirmation = true
  },
  reset (state) {
    var newState = {
      dropdown: true,
      confirmation: false,
      email: '',
      emailIsValid: false
    }
    Object.assign(state, newState)
  },
  toggleDropdown (state) {
    state.dropdown = !state.dropdown
    var newState = {
      confirmation: false,
      email: '',
      emailIsValid: false
    }
    Object.assign(state, newState)
  },
  updateEmail (state, value) {
    state.email = value
  },
  updateEmailIsValid (state, status) {
    state.emailIsValid = status
  }
}

export const actions = {
  subscribe ({ commit }, email) {
    commit('isLoading', true)
    axios.post('newsletter/subscribe', { email: email })
      .then((response) => {
        commit('subscribe')
      })
      .catch(() => {
        alert('There was an error subscribing. Make sure you have entered a valid email address and try again. If this error persists, please let us know: support@stateofthedapps.com')
      })
      .finally(() => {
        commit('isLoading', false)
      })
  },
  reset ({ commit }) {
    commit('reset')
  },
  toggleDropdown ({ commit }) {
    commit('toggleDropdown')
  },
  updateEmail ({ commit }, value) {
    commit('updateEmail', value)
  },
  updateEmailIsValid ({ commit }, status) {
    commit('updateEmailIsValid', status)
  }
}

export const getters = {
  confirmation: state => {
    return state.confirmation
  },
  isLoading: state => {
    return state.isLoading
  },
  email: state => {
    return state.email
  },
  emailIsValid: state => {
    return state.emailIsValid
  },
  dropdown: state => {
    return state.dropdown
  }
}
