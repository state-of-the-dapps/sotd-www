import formatDate from 'date-fns/format'
import { generateRandomSeed } from '~/helpers/functions'
import { eventRefineCategoryOptions as categoryOptions } from '~/helpers/constants'
import axios from '~/helpers/axios'

const randomSeed = generateRandomSeed()

function initialQuery () {
  return {
    dateStart: formatDate(Date.now(), 'YYYY-MM-DD'),
    limit: 1,
    location: '',
    locationRadius: 50,
    locationRadiusUnit: 'miles',
    offset: 0,
    seed: randomSeed,
    category: categoryOptions[0],
    tags: [],
    text: ''
  }
}

const actions = {
  fetchItems: ({ commit, state }) => {
    commit('SET_LOADING_STATUS', true)
    axios
      .get('events', {
        params: state.query
      })
      .then(response => {
        const data = response.data
        commit('SET_ITEMS', data)
        commit('SET_LOADING_STATUS', false)
      })
  },
  incrementOffsetQuery: ({ commit }) => {
    commit('INCREMENT_OFFSET_QUERY')
  },
  setCategoryQuery: ({ commit }, value) => {
    commit('SET_CATEGORY_QUERY', value)
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
  setDateStartQuery ({ commit }, date) {
    commit('SET_DATE_START_QUERY', date)
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
  setLocationRadiusQuery: ({ commit }, value) => {
    commit('SET_LOCATION_RADIUS_QUERY', value)
  },
  setLocationRadiusUnitQuery: ({ commit }, value) => {
    commit('SET_LOCATION_RADIUS_UNIT_QUERY', value)
  },
  setLocationQuery: ({ commit }, value) => {
    commit('SET_LOCATION_QUERY', value)
  },
  toggleRefineDropdown: ({ commit }, type) => {
    commit('TOGGLE_REFINE_DROPDOWN', type)
  }
}

const getters = {
  activeItemIndex: state => {
    return state.activeItemIndex
  },
  categoryQuery: state => {
    return state.query.category
  },
  dateStartQuery: state => {
    return state.query.dateStart
  },
  categoryDropdownIsActive: state => {
    return state.refine.category.isActive
  },
  friendlyUrl: state => {
    return state.friendlyUrl
  },
  fullQuery: state => {
    return state.query
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
  locationRadiusQuery: state => {
    return state.query.locationRadius
  },
  locationRadiusUnitQuery: state => {
    return state.query.locationRadiusUnit
  },
  locationQuery: state => {
    return state.query.location
  },
  pagerOffset: state => {
    return state.pager.offset
  },
  pagerTotalCount: state => {
    return state.pager.totalCount
  },
  tagQuery: state => {
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
    state.query.offset = state.pager.offset + state.query.limit
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
  SET_DATE_START_QUERY (state, date) {
    state.query.dateStart = date
  },
  SET_CATEGORY_QUERY (state, value) {
    var options = categoryOptions || []
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
    var options = categoryOptions || []
    var tags = state.query.tags.filter(entry => entry.trim() !== '') || []
    var category = state.query.category
    var url = '/events'
    if (tags.length > 0 || category !== options[0]) {
      url = url + '/'
    }
    if (tags.length > 0) {
      tags = tags.map(encodeURIComponent)
      tags = tags.join('+')
      url = url + 'tagged/' + tags + '/'
    }
    if (category !== options[0]) {
      url = url + 'category/' + encodeURIComponent(category)
    }
    state.friendlyUrl = url
    window.history.replaceState({}, '', url)
  },
  SET_ITEMS (state, data) {
    const items = data.items
    const pager = data.pager
    state.pager.totalCount = pager.totalCount
    state.pager.offset = pager.offset
    if (state.pager.offset !== 0) {
      state.items = state.items.concat(items)
    } else {
      state.items = items
    }
    state.query.offset = 0
  },
  SET_LOADING_STATUS (state, value) {
    state.isLoading = value
  },
  SET_LOCATION_RADIUS_QUERY (state, value) {
    state.query.locationRadius = value
  },
  SET_LOCATION_RADIUS_UNIT_QUERY (state, value) {
    state.query.locationRadiusUnit = value
  },
  SET_LOCATION_QUERY (state, value) {
    state.query.location = value
  },
  SET_REFINE_QUERY (state, value) {
    state.query.status = value
  },
  SET_TEXT_QUERY (state, value) {
    state.query.text = value
  },
  TOGGLE_REFINE_DROPDOWN (state, type) {
    state.refine[type].isActive = !state.refine[type].isActive
  }
}

const state = {
  activeItemIndex: -1,
  refine: {
    category: {
      isActive: false
    }
  },
  friendlyUrl: '/',
  items: [],
  isLoading: true,
  pager: {
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
