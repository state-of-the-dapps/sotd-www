import axios from '~/plugins/axios'

export const state = () => {
  return {
    pagination: {
      offset: 0,
      totalCount: 0
    },
    query: {
      category: 'recently added',
      limit: 50,
      offset: 0,
      refine: 'any',
      tags: [],
      text: ''
    },
    loading: true,
    items: [],
    activeItemIndex: -1
  }
}

export const mutations = {
  setItems (state, response) {
    state.pagination.totalCount = Number(response.headers['x-pagination-count'])
    state.pagination.offset = Number(response.headers['x-pagination-offset'])
    if (state.pagination.offset === 0) {
      state.items = response.data
    } else {
      let items = state.items.concat(response.data)
      state.items = items
    }
    state.query.offset = 0
  },
  incrementOffsetQuery (state) {
    state.query.offset = state.pagination.offset + state.query.limit
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
  resetQuery (state) {
    state.query = {
      category: 'recently added',
      limit: 50,
      offset: 0,
      refine: 'any',
      tags: [],
      text: ''
    }
  },
  setActiveItemIndex (state, index) {
    state.activeItemIndex = index
  },
  setTextQuery (state, value) {
    state.query.text = value
  },
  updateLoading (state, value) {
    state.loading = value
  }
}

export const actions = {
  findItems: ({ commit, state }) => {
    commit('updateLoading', true)
    axios
      .get('dapps', {
        params: state.query
      })
      .then(response => {
        commit('setItems', response)
        commit('updateLoading', false)
      })
  },
  incrementOffsetQuery: ({ commit }) => {
    commit('incrementOffsetQuery')
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
  resetQuery ({ commit }) {
    commit('resetQuery')
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
    return state.query.category
  },
  limitQuery: state => {
    return state.query.limit
  },
  loading: state => {
    return state.loading
  },
  refineQuery: state => {
    return state.query.hide
  },
  paginationOffset: state => {
    return state.pagination.offset
  },
  paginationTotalCount: state => {
    return state.pagination.totalCount
  },
  tagsQuery: state => {
    return state.query.tags
  },
  textQuery: state => {
    return state.query.text
  }
}
