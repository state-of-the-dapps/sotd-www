import axios from '~/plugins/axios'

export const state = () => {
  return {
    items: []
  }
}

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  select (state, index) {
    state.items.splice(index, 1)
  },
  reset (state) {
    state.items = []
  }
}

export const actions = {
  findItems: ({ commit, state, rootState }, value) => {
    axios
      .get('tags.json', { params: { query: value, excluded: rootState.dapps.query.tags } })
      .then(response => {
        commit('setItems', response.data)
      })
  },
  select: ({ commit }, index) => {
    commit('select', index)
  },
  reset: ({ commit }) => {
    commit('reset')
  }
}

export const getters = {
  items: state => {
    return state.items
  }
}
