import { dappRefineTabOptions as tabOptions } from '~/helpers/constants'

function initialQuery() {
  return {
    platform: '',
    category: '',
    tab: tabOptions[0],
    limit: 50,
    offset: 0,
    status: '',
    tags: [],
    text: ''
  }
}

const actions = {
  fetchItems({ commit, state }) {
    commit('SET_LOADING_STATUS', true)
    this.$axios
      .get('dapps', {
        params: state.query
      })
      .then(response => {
        const data = response.data
        commit('SET_ITEMS', data)
        commit('SET_LOADING_STATUS', false)
      })
  },
  incrementOffsetQuery({ commit }) {
    commit('INCREMENT_OFFSET_QUERY')
  },
  setTabQuery({ commit }, value) {
    commit('SET_TAB_QUERY', value)
    commit('SET_FRIENDLY_URL')
  },
  setCategoryQuery({ commit }, value) {
    commit('SET_CATEGORY_QUERY', value)
  },
  setPlatformQuery({ commit }, value) {
    commit('SET_PLATFORM_QUERY', value)
  },
  setStatusQuery({ commit }, value) {
    commit('SET_STATUS_QUERY', value)
  },
  addTagToQuery({ commit }, value) {
    commit('ADD_TAG_TO_QUERY', value)
    commit('SET_FRIENDLY_URL')
  },
  removeLastTagFromQuery({ commit }) {
    commit('REMOVE_LAST_TAG_FROM_QUERY')
    commit('SET_FRIENDLY_URL')
  },
  removeTagFromQuery({ commit }, index) {
    commit('REMOVE_TAG_FROM_QUERY', index)
    commit('SET_FRIENDLY_URL')
  },
  resetQuery({ commit }) {
    commit('RESET_QUERY')
  },
  setTextQuery({ commit }, value) {
    commit('SET_TEXT_QUERY', value)
  },
  setActiveItemIndex({ commit }, index) {
    commit('SET_ACTIVE_ITEM_INDEX', index)
  },
  setFriendlyQuery({ commit }, params) {
    commit('SET_FRIENDLY_QUERY', params)
  },
  setFriendlyUrl({ commit }) {
    commit('SET_FRIENDLY_URL')
  },
  toggleRefineDropdown({ commit }, type) {
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
  tabDropdownIsActive: state => {
    return state.refine.tab.isActive
  },
  tabQuery: state => {
    return state.query.tab
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
  platformQuery: state => {
    return state.query.platform
  },
  statusDropdownIsActive: state => {
    return state.refine.status.isActive
  },
  statusQuery: state => {
    return state.query.status
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
  ADD_TAG_TO_QUERY(state, value) {
    state.query.tags.push(value)
  },
  INCREMENT_OFFSET_QUERY(state) {
    state.query.offset = state.pager.offset + state.query.limit
  },
  REMOVE_LAST_TAG_FROM_QUERY(state) {
    state.query.tags.pop()
  },
  REMOVE_TAG_FROM_QUERY(state, index) {
    state.query.tags.splice(index, 1)
  },
  RESET_QUERY(state) {
    state.query = initialQuery()
  },
  SET_ACTIVE_ITEM_INDEX(state, index) {
    state.activeItemIndex = index
  },
  SET_CATEGORY_QUERY(state, value) {
    state.query.category = value
  },
  SET_PLATFORM_QUERY(state, value) {
    state.query.platform = value
  },
  SET_TAB_QUERY(state, value) {
    var options = tabOptions || []
    if (options.indexOf(value) !== -1) {
      state.query.tab = value
    } else {
      state.query.tab = options[0]
    }
  },
  SET_FRIENDLY_QUERY(state, params) {
    var tags = params.tags
    var tab = params.tab
    if (tags !== undefined) {
      tags = tags
        .split('+')
        .slice(0, 3)
        .map(decodeURIComponent)
      state.query.tags = tags
    }
    if (tab !== undefined) {
      state.query.tab = tab
    }
  },
  SET_FRIENDLY_URL(state) {
    var tags = state.query.tags.filter(entry => entry.trim() !== '') || ''
    if (tags.length > 0) {
      tags = tags.map(encodeURIComponent)
      tags = tags.join('+')
    }
    var tab = state.query.tab
    var routerObj = {}

    if (tab && tags.length > 0) {
      routerObj['name'] = 'dapps-tab-tags'
      routerObj['params'] = {
        tab: tab,
        tags: tags
      }
    } else if (tab) {
      routerObj['name'] = 'dapps-tab'
      routerObj['params'] = {
        tab: tab
      }
    } else if (tags.length > 0) {
      routerObj['name'] = 'dapps-tags'
      routerObj['params'] = {
        tags: tags
      }
    } else {
      routerObj['name'] = 'dapps'
    }
    this.$router.replace(routerObj)
  },
  SET_ITEMS(state, data) {
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
  SET_LOADING_STATUS(state, value) {
    state.isLoading = value
  },
  SET_STATUS_QUERY(state, value) {
    state.query.status = value
  },
  SET_TEXT_QUERY(state, value) {
    state.query.text = value
  },
  TOGGLE_REFINE_DROPDOWN(state, type) {
    state.refine[type].isActive = !state.refine[type].isActive
  }
}

const state = () => ({
  activeItemIndex: -1,
  refine: {
    tab: {
      isActive: false
    },
    status: {
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
})

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
