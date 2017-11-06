import * as constants from '~/plugins/constants'
import axios from '~/plugins/axios'

function randomSeed () {
  return Math.floor(Math.random() * 4294967295) + 1
}

function query () {
  return {
    category: constants.browseCategoryOptions[0],
    limit: 50,
    offset: 0,
    refine: constants.browseRefineOptions[0],
    seed: randomSeed(),
    tags: [],
    text: ''
  }
}

export const state = () => {
  return {
    pagination: {
      offset: 0,
      totalCount: 0
    },
    query: query(),
    friendlyUrl: '/',
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
    var options = constants.browseCategoryOptions || []
    if (options.indexOf(value) !== -1) {
      state.query.category = value
    } else {
      state.query.category = options[0]
    }
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
    state.query = query()
  },
  setActiveItemIndex (state, index) {
    state.activeItemIndex = index
  },
  setFriendlyQuery (state, params) {
    var tags = params.tags
    var category = params.category
    if (tags !== undefined) {
      tags = tags.split('+').slice(0, 3).map(decodeURIComponent)
      state.query.tags = tags
    }
    if (category !== undefined) {
      state.query.category = category
    }
  },
  setFriendlyUrl (state) {
    var browseCategoryOptions = constants.browseCategoryOptions || []
    var tags = state.query.tags.filter(entry => entry.trim() !== '') || []
    var category = state.query.category
    var url = '/'
    if (tags.length > 0) {
      tags = tags.map(encodeURIComponent)
      tags = tags.join('+')
      url = url + 'tagged/' + tags + '/'
    }
    if (category !== browseCategoryOptions[0]) {
      url = url + 'tab/' + encodeURIComponent(category)
    }
    state.friendlyUrl = url
    window.history.replaceState({}, '', url)
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
  },
  setFriendlyQuery: ({ commit }, params) => {
    commit('setFriendlyQuery', params)
  },
  setFriendlyUrl: ({ commit }) => {
    commit('setFriendlyUrl')
  }
}

export const getters = {
  activeItemIndex: state => {
    return state.activeItemIndex
  },
  categoryQuery: state => {
    return state.query.category
  },
  friendlyUrl: state => {
    return state.friendlyUrl
  },
  items: state => {
    return state.items
  },
  itemsCount: state => {
    return state.items.length
  },
  limitQuery: state => {
    return state.query.limit
  },
  loading: state => {
    return state.loading
  },
  refineQuery: state => {
    return state.query.refine
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
