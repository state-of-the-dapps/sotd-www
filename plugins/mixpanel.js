import Vue from 'vue'
import mixpanel from 'mixpanel-browser'

const mp = function(Vue) {
  if (process.env.mixpanel) {
    mixpanel.init(process.env.mixpanel)

    if (process.env.NODE_ENV !== 'production') {
      mixpanel.set_config({ debug: true })
    }

    window.addEventListener('load', function() {
      let hasWeb3 = false
      if (typeof web3 !== 'undefined') {
        hasWeb3 = true
      }
      mixpanel.register({
        hasWeb3: hasWeb3
      })
    })
  }

  Vue.prototype.$mixpanel = {
    track(name, data) {
      if (process.env.mixpanel) {
        name = name || 'Undefined'
        data = data || {}
        mixpanel.track(name, data)
      } else {
        console.log('Mixpanel Event: ', name)
        console.log('Mixpanel Data: ', data)
      }
    },
    setUser(personData) {
      let data = personData || {}
      // TODO further remove all $mixpanel.setUser calls
      console.log('Mixpanel setUser Data:', data)
    }
  }
}

Vue.use(mp)
