import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import announcementModule from './modules/announcement'
import tagsModule from './modules/tags'

const state = {
  stats: {
    dappCount: 0
  }
}

const createStore = () => {
  return new Vuex.Store({
    actions,
    getters,
    modules: {
      tags: tagsModule
    },
    mutations,
    state
  })
}

export default createStore
