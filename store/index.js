import { newDapps } from '~/helpers/constants'
import { sum } from '~/helpers/functions'

export const state = () => ({
  site: {
    heroHasLoaded: false
  },
  stats: {
    dappCount: 0
  },
  user: {
    entryRoute: ''
  }
})

export const actions = {
  nuxtServerInit({ commit }, { route }) {
    commit('SET_USER_ENTRY_ROUTE', route.path)
    const dappCount = sum(newDapps)
    commit('SET_DAPP_COUNT', dappCount)
  },
  setHeroLoaded({ commit }) {
    commit('SET_HERO_LOADED')
  }
}

export const getters = {
  heroHasLoaded: state => {
    return state.site.heroHasLoaded
  },
  statDappCount: state => {
    return state.stats.dappCount
  },
  userEntryRoute: state => {
    return state.user.entryRoute
  }
}

export const mutations = {
  SET_HERO_LOADED(state) {
    state.site.heroHasLoaded = true
  },
  SET_DAPP_COUNT(state, count) {
    state.stats.dappCount = count
  },
  SET_USER_ENTRY_ROUTE(state, path) {
    state.user.entryRoute = path
  }
}
