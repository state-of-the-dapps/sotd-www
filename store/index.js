export const state = () => ({
  site: {
    heroHasLoaded: false
  },
  stats: {
    categories: [],
    dappContractCount: 0,
    dappCount: 0,
    dappDau: 0,
    dappTx24Hr: 0,
    dappVol24Hr: 0,
    platforms: [],
    statuses: []
  },
  user: {
    entryRoute: ''
  }
})

export const actions = {
  nuxtServerInit({ commit }, { app, route }) {
    commit('SET_USER_ENTRY_ROUTE', route.path)
    return app.$axios.get('stats').then(response => {
      const data = response.data
      commit('SET_STATS', data)
    })
  },
  setHeroLoaded({ commit }) {
    commit('SET_HERO_LOADED')
  }
}

export const getters = {
  heroHasLoaded: state => {
    return state.site.heroHasLoaded
  },
  statCategories: state => {
    return state.stats.categories
  },
  statDappContractCount: state => {
    return state.stats.dappContractCount
  },
  statDappCount: state => {
    return state.stats.dappCount
  },
  statDappDau: state => {
    return state.stats.dappDau
  },
  statDappTx24Hr: state => {
    return state.stats.dappTx24Hr
  },
  statDappVol24Hr: state => {
    return state.stats.dappVol24Hr
  },
  statPlatforms: state => {
    return state.stats.platforms
  },
  statStatuses: state => {
    return state.stats.statuses
  },
  userEntryRoute: state => {
    return state.user.entryRoute
  }
}

export const mutations = {
  SET_HERO_LOADED(state) {
    state.site.heroHasLoaded = true
  },
  SET_STATS(state, data) {
    state.stats = data
  },
  SET_USER_ENTRY_ROUTE(state, path) {
    state.user.entryRoute = path
  }
}
