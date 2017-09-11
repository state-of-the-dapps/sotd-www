import Vue from 'vue'
import mixpanel from 'mixpanel-browser'

const mp = function (Vue) {
  mixpanel.init(process.env.mixpanel)

  let hasWeb3 = false

  if (typeof web3 !== 'undefined') {
    hasWeb3 = true
  }

  mixpanel.register({
    'hasWeb3': hasWeb3
  })

  Vue.prototype.$mixpanel = {
    track (name, data) {
      name = name || 'Undefined'
      data = data || {}
      mixpanel.track(name, data)
    }
  }
}

Vue.use(mp)
