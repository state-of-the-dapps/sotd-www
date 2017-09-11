export const state = () => {
  return {
    popup: false,
    active: {}
  }
}

export const mutations = {
  setActive (state, item) {
    state.active = item
  },
  showPopup (state) {
    state.popup = true
  },
  hidePopup (state) {
    state.popup = false
  },
  togglePopup (state) {
    state.popup = !state.popup
    if (state.popup === true) {
      document.body.classList.add('--has-popup')
    } else {
      document.body.classList.remove('--has-popup')
    }
  }
}

export const actions = {
  setActive ({ commit }, item) {
    commit('setActive', item)
  },
  showPopup ({ commit }) {
    commit('showPopup')
  },
  hidePopup ({ commit }) {
    commit('hidePopup')
  },
  togglePopup ({ commit }) {
    commit('togglePopup')
  }
}

export const getters = {
  popup: state => {
    return state.popup
  },
  active: state => {
    return state.active
  },
  activeRelated: state => {
    return state.active.related
  }
}
