import Vue from 'vue'
import mixpanel from 'mixpanel-browser'

const mp = function (Vue) {
  if (process.env.mixpanel) {
    mixpanel.init(process.env.mixpanel)

    if (process.env.NODE_ENV !== 'production') {
      mixpanel.set_config({ debug: true })
    }

    window.addEventListener('load', function () {
      let hasWeb3 = false
      if (typeof web3 !== 'undefined') {
        hasWeb3 = true
      }
      mixpanel.register({
        'hasWeb3': hasWeb3
      })
    })
  }

  Vue.prototype.$mixpanel = {
    track (name, data) {
      if (process.env.mixpanel) {
        name = name || 'Undefined'
        data = data || {}
        mixpanel.track(name, data)
      } else {
        console.log('Mixpanel Event: ', name)
        console.log('Mixpanel Data: ', data)
      }
    },
    identify (email) {
      if (process.env.mixpanel) {
        email = email || 'Undefined'
        mixpanel.identify(email)
        mixpanel.people.set({
          '$email': email
        })
      } else {
        console.log('Mixpanel Identity: ', email)
      }
    }
  }
}

Vue.use(mp)
