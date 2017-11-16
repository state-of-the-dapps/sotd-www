export const state = () => {
  return {
    dropdown: false
  }
}

export const mutations = {
  toggleDropdown (state) {
    state.dropdown = !state.dropdown
  }
}

export const actions = {
  toggleDropdown ({ commit }) {
    commit('toggleDropdown')
  }
}

export const getters = {
  dropdown: state => {
    return state.dropdown
  }
}
