import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  items: []
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
