import axios from '~/plugins/axios'

export const state = () => {
  return {
    query: {
      category: 'recently added',
      refine: 'nothing',
      tags: [],
      text: ''
    },
    items: [],
    activeItemIndex: -1
  }
}

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setCategoryQuery (state, value) {
    state.query.category = value
  },
  setRefineQuery (state, value) {
    state.query.refine = value
  },
  addTagsQuery (state, value) {
    state.query.tags.push(value)
  },
  removeLastTag (state) {
    state.query.tags.pop()
  },
  removeTagsQuery (state, index) {
    state.query.tags.splice(index, 1)
  },
  setTextQuery (state, value) {
    state.query.text = value
  },
  setActiveItemIndex (state, index) {
    state.activeItemIndex = index
  }
}

export const actions = {
  findItems: ({ commit, state }) => {
    axios
      .get('dapps.json', { params: state.query })
      .then(response => {
        commit('setItems', response.data)
      })
  },
  updateCategoryQuery: ({ commit }, value) => {
    commit('setCategoryQuery', value)
  },
  updateRefineQuery: ({ commit }, value) => {
    commit('setRefineQuery', value)
  },
  addTagsQuery: ({ commit }, value) => {
    commit('addTagsQuery', value)
  },
  removeLastTag: ({ commit }) => {
    commit('removeLastTag')
  },
  removeTagsQuery: ({ commit }, index) => {
    commit('removeTagsQuery', index)
  },
  updateTextQuery: ({ commit }, value) => {
    commit('setTextQuery', value)
  },
  setActiveItemIndex: ({ commit }, index) => {
    commit('setActiveItemIndex', index)
  }
}

export const getters = {
  activeItemIndex: state => {
    return state.activeItemIndex
  },
  items: state => {
    return state.items
  },
  itemsCount: state => {
    return state.items.length
  },
  categoryQuery: state => {
    return state.query.show
  },
  refineQuery: state => {
    return state.query.hide
  },
  tagsQuery: state => {
    return state.query.tags
  },
  textQuery: state => {
    return state.query.text
  }
}
