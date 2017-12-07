import { eventsCategoryOptions as categoryOptions } from '~/helpers/constants'
// import axios from '~/helpers/axios'

function initialQuery () {
  return {
    category: categoryOptions[0],
    limit: 50,
    offset: 0,
    tags: [],
    text: ''
  }
}

const actions = {}

const getters = {}

const mutations = {}

const state = {
  activeItemIndex: -1,
  browse: {
    categories: {
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
