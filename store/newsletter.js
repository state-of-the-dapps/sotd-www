export const state = () => {
  return {
    dropdown: false,
    confirmation: false,
    email: '',
    emailIsValid: false
  }
}

export const mutations = {
  confirm (state) {
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
  confirm ({ commit }) {
    commit('confirm')
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
