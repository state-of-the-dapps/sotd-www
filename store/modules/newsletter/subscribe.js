const actions = {
  submit({ commit }, email) {
    const data = {
      fields: {
        email: email
      }
    }
    if (typeof Intercom !== 'undefined') {
      data.visitorId = Intercom('getVisitorId')
    }
    commit('SET_LOADING_IS_ACTIVE', true)
    this.$axios
      .post('newsletter/subscribe', data)
      .then(response => {
        commit('SUBMIT')
        commit('SET_LOADING_IS_ACTIVE', false)
      })
      .catch(() => {
        commit('SET_LOADING_IS_ACTIVE', false)
        alert(
          'There was an error subscribing. Make sure you have entered a valid email address and try again. If this error persists, please let us know: support@stateofthedapps.com'
        )
      })
  },
  toggleDropdown({ commit }) {
    commit('TOGGLE_DROPDOWN')
  },
  setEmail({ commit }, value) {
    commit('SET_EMAIL', value)
  },
  setEmailIsValid({ commit }, status) {
    commit('SET_EMAIL_VALID_STATUS', status)
  }
}

const getters = {
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
  dropdownIsActive: state => {
    return state.dropdownIsActive
  }
}

const mutations = {
  SET_LOADING_IS_ACTIVE(state, status) {
    state.isLoading = status
  },
  SUBMIT(state) {
    state.confirmation = true
  },
  TOGGLE_DROPDOWN(state) {
    state.dropdownIsActive = !state.dropdownIsActive
    var newState = {
      confirmation: false,
      email: '',
      emailIsValid: false
    }
    Object.assign(state, newState)
  },
  SET_EMAIL(state, value) {
    state.email = value
  },
  SET_EMAIL_VALID_STATUS(state, status) {
    state.emailIsValid = status
  }
}

const state = () => ({
  dropdownIsActive: false,
  confirmation: false,
  email: '',
  emailIsValid: false,
  isLoading: false
})

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
