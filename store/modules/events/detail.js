function item () {
  return {
    tags: []
  }
}

const actions = {
  setItem ({ commit }, item) {
    commit('SET_ITEM', item)
  },
  showPopup ({ commit }) {
    commit('SHOW_POPUP')
  },
  hidePopup ({ commit }) {
    commit('HIDE_POPUP')
  },
  resetItem ({ commit }) {
    commit('RESET_ITEM')
  },
  resetViewMethod ({ commit }) {
    commit('RESET_VIEW_METHOD')
  },
  setViewMethod ({ commit }, method) {
    commit('SET_VIEW_METHOD', method)
  },
  togglePopup ({ commit }) {
    commit('TOGGLE_POPUP')
  }
}

const getters = {
  popupIsActive: state => {
    return state.popupIsActive
  },
  item: state => {
    return state.item
  },
  relatedItems: state => {
    return state.item.related
  },
  viewMethod: state => {
    return state.viewMethod
  }
}

const mutations = {
  SET_ITEM (state, item) {
    state.item = item
  },
  SHOW_POPUP (state) {
    state.popupIsActive = true
  },
  HIDE_POPUP (state) {
    state.popupIsActive = false
  },
  RESET_ITEM (state) {
    state.item = item
  },
  RESET_VIEW_METHOD (state) {
    state.viewMethod = ''
  },
  SET_VIEW_METHOD (state, method) {
    state.viewMethod = method
  },
  TOGGLE_POPUP (state) {
    state.popupIsActive = !state.popupIsActive
    if (state.popupIsActive === true) {
      document.body.classList.add('--has-popup')
    } else {
      document.body.classList.remove('--has-popup')
    }
  }
}

const state = {
  popupIsActive: false,
  item: item(),
  viewMethod: 'direct'
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
