import detailModule from './detail'
import formModule from './form'
import rankingsModule from './rankings'
import searchModule from './search'

export default {
  modules: {
    detail: detailModule,
    form: formModule,
    rankings: rankingsModule,
    search: searchModule
  },
  namespaced: true
}
