export const state = () => {
  return {
    isActive: false,
    position: {
      xPos: 0,
      yPos: 0
    },
    options: [
      'recently added',
      'most popular',
      'most viewed',
      'most clicked',
      'recently updated'
    ]
  }
}

export const mutations = {
  setPosition: (state, position) => {
    if (state.isActive === true) {
      state.position = position
    }
  },
  select: (state, selected) => {
    state.selected = selected
  },
  toggle (state) {
    state.isActive = !state.isActive
  }
}

export const actions = {
  setPosition: ({ commit }, position) => {
    commit('setPosition', position)
  },
  toggle ({ commit }) {
    commit('toggle')
  }
}

export const getters = {
  isActive: state => {
    return state.isActive
  },
  options: state => {
    return state.options
  },
  position: state => {
    return state.position
  }
}
