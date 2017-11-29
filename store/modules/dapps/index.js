import detailModule from './detail'
import listModule from './list'
import newModule from './new'

export default {
  modules: {
    detail: detailModule,
    list: listModule,
    new: newModule
  },
  namespaced: true
}
