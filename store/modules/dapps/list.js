import { generateRandomSeed } from '~/helpers/functions'
import { dappsCategoryOptions, dappsRefineOptions } from '~/helpers/constants'
import axios from '~/helpers/axios'

const randomSeed = generateRandomSeed()

function initialQuery () {
  return {
    category: dappsCategoryOptions[0],
    limit: 50,
    offset: 0,
    refine: dappsRefineOptions[0],
    seed: randomSeed,
    tags: [],
    text: ''
  }
}

const actions = {
  fetchItems: ({ commit, state }) => {
    commit('SET_LOADING_STATUS', true)
    axios
      .get('dapps', {
        params: state.query
      })
      .then(response => {
        commit('SET_ITEMS', response)
        commit('SET_LOADING_STATUS', false)
      })
  },
  incrementOffsetQuery: ({ commit }) => {
    commit('INCREMENT_OFFSET_QUERY')
  },
  setCategoryQuery: ({ commit }, value) => {
    commit('SET_CATEGORY_QUERY', value)
  },
  setRefineQuery: ({ commit }, value) => {
    commit('SET_REFINE_QUERY', value)
  },
  addTagToQuery: ({ commit }, value) => {
    commit('ADD_TAG_TO_QUERY', value)
  },
  removeLastTagFromQuery: ({ commit }) => {
    commit('REMOVE_LAST_TAG_FROM_QUERY')
  },
  removeTagFromQuery: ({ commit }, index) => {
    commit('REMOVE_TAG_FROM_QUERY', index)
  },
  resetQuery ({ commit }) {
    commit('RESET_QUERY')
  },
  setTextQuery: ({ commit }, value) => {
    commit('SET_TEXT_QUERY', value)
  },
  setActiveItemIndex: ({ commit }, index) => {
    commit('SET_ACTIVE_ITEM_INDEX', index)
  },
  setFriendlyQuery: ({ commit }, params) => {
    commit('SET_FRIENDLY_QUERY', params)
  },
  setFriendlyUrl: ({ commit }) => {
    commit('SET_FRIENDLY_URL')
  },
  toggleBrowseDropdown: ({ commit }, type) => {
    commit('TOGGLE_BROWSE_DROPDOWN', type)
  }
}

const getters = {
  activeItemIndex: state => {
    return state.activeItemIndex
  },
  categoriesDropdownIsActive: state => {
    return state.browse.categories.isActive
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
  itemCount: state => {
    return state.items.length
  },
  itemQueryLimit: state => {
    return state.query.limit
  },
  isLoading: state => {
    return state.isLoading
  },
  refineDropdownIsActive: state => {
    return state.browse.refine.isActive
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

const mutations = {
  ADD_TAG_TO_QUERY (state, value) {
    state.query.tags.push(value)
  },
  INCREMENT_OFFSET_QUERY (state) {
    state.query.offset = state.pagination.offset + state.query.limit
  },
  REMOVE_LAST_TAG_FROM_QUERY (state) {
    state.query.tags.pop()
  },
  REMOVE_TAG_FROM_QUERY (state, index) {
    state.query.tags.splice(index, 1)
  },
  RESET_QUERY (state) {
    state.query = initialQuery()
  },
  SET_ACTIVE_ITEM_INDEX (state, index) {
    state.activeItemIndex = index
  },
  SET_CATEGORY_QUERY (state, value) {
    var options = dappsCategoryOptions || []
    if (options.indexOf(value) !== -1) {
      state.query.category = value
    } else {
      state.query.category = options[0]
    }
  },
  SET_FRIENDLY_QUERY (state, params) {
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
  SET_FRIENDLY_URL (state) {
    var options = dappsCategoryOptions || []
    var tags = state.query.tags.filter(entry => entry.trim() !== '') || []
    var category = state.query.category
    var url = '/'
    if (tags.length > 0) {
      tags = tags.map(encodeURIComponent)
      tags = tags.join('+')
      url = url + 'tagged/' + tags + '/'
    }
    if (category !== options[0] && category !== 'most-relevant') {
      url = url + 'tab/' + encodeURIComponent(category)
    }
    state.friendlyUrl = url
    window.history.replaceState({}, '', url)
  },
  SET_ITEMS (state, response) {
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
  SET_LOADING_STATUS (state, value) {
    state.isLoading = value
  },
  SET_REFINE_QUERY (state, value) {
    state.query.refine = value
  },
  SET_TEXT_QUERY (state, value) {
    state.query.text = value
  },
  TOGGLE_BROWSE_DROPDOWN (state, type) {
    state.browse[type].isActive = !state.browse[type].isActive
  }
}

const state = {
  activeItemIndex: -1,
  browse: {
    categories: {
      isActive: false
    },
    refine: {
      isActive: false
    }
  },
  friendlyUrl: '/',
  items: [],
  isLoading: true,
  pagination: {
    offset: 0,
    totalCount: 0
  },
  query: initialQuery()
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
