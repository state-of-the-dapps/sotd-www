import axios from '~/helpers/axios'
import { isValidEmail } from '~/helpers/validators'
import * as constants from '~/helpers/constants'

export const getCaretPosition = {
  methods: {
    getCaretPosition (ctrl) {
      var start, end
      if (ctrl.setSelectionRange) {
        start = ctrl.selectionStart
        end = ctrl.selectionEnd
      } else if (document.selection && document.selection.createRange) {
        var range = document.selection.createRange()
        start = 0 - range.duplicate().moveStart('character', -100000)
        end = start + range.text.length
      }
      return {
        start: start,
        end: end
      }
    }
  }
}

export const dispatchErrors = {
  methods: {
    dispatchErrors (errors, model) {
      if (errors.data.length > 0) {
        this.$store.dispatch(model + '/form/addErrorField', errors.field)
      } else {
        this.$store.dispatch(model + '/form/removeErrorField', errors.field)
      }
      this.$store.dispatch(model + '/form/setErrors', errors)
    }
  }
}

export const dispatchWarnings = {
  methods: {
    dispatchWarnings (warnings, model) {
      this.$store.dispatch(model + '/form/setWarnings', warnings)
    }
  }
}

export const setDappDetailPage = {
  data () {
    return {
      dapp: constants.dappItem
    }
  },
  fetch ({ store, params, error }) {
    return axios
      .get('dapps/' + params.slug)
      .then(response => {
        const data = response.data
        const dapp = data.item
        store.dispatch('dapps/detail/setItem', dapp)
        store.dispatch('setSiteSection', 'dapps')
        if (!Object.keys(dapp).length > 0) {
          error({ statusCode: 404 })
        }
      })
  },
  head () {
    return {
      title: this.dapp.name + ' — State of the ÐApps',
      meta: [
        { hid: 'description', name: 'description', content: this.dapp.teaser }
      ]
    }
  }
}

export const setPromotedDappsPage = {
  data () {
    return {
      description: 'Show off your amazing decentralized application to thousands of crypto investors, thought leaders, blockchain innovators, and technologists.'
    }
  },
  head () {
    return {
      title: 'State of the ÐApps — Promote your ÐApp',
      meta: [
        { hid: 'description', name: 'description', content: this.description }
      ]
    }
  }
}

export const validateEmail = {
  methods: {
    validateEmail () {
      let isValid = false
      if (this.email.length > 0) {
        isValid = isValidEmail(this.email)
      } else {
        isValid = false
      }
      this.emailIsValid = isValid
    }
  }
}
