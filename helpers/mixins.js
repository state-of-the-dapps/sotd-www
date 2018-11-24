import { isValidEmail } from '~/helpers/validators'

export const getCaretPosition = {
  methods: {
    getCaretPosition(ctrl) {
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

export const testImage = {
  methods: {
    testImage(url, callback, timeout) {
      timeout = timeout || 5000
      var timedOut = false
      var timer
      var img = new Image()
      img.onerror = img.onabort = function() {
        if (!timedOut) {
          clearTimeout(timer)
          callback(url, {}, 'error')
        }
      }
      img.onload = function() {
        if (!timedOut) {
          clearTimeout(timer)
          const dimensions = {
            width: img.width,
            height: img.height
          }
          callback(url, dimensions, 'success')
        }
      }
      img.src = url
      timer = setTimeout(function() {
        timedOut = true
        // reset .src to invalid URL so it stops previous
        // loading, but doesn't trigger new load
        img.src = '//!!!!/test.jpg'
        callback(url, {}, 'timeout')
      }, timeout)
    }
  }
}

export const dispatchErrors = {
  methods: {
    dispatchErrors(errors, model) {
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
    dispatchWarnings(warnings, model) {
      this.$store.dispatch(model + '/form/setWarnings', warnings)
    }
  }
}

export const getValuePosNegClass = {
  methods: {
    getValuePosNegClass(value) {
      let result = ''
      if (value && value > 0) {
        result = 'is-positive'
      } else if (value && value < 0) {
        result = 'is-negative'
      }
      return result
    }
  }
}

export const setPromotedDappsPage = {
  data() {
    return {
      description:
        'Show off your amazing decentralized application to thousands of crypto investors, thought leaders, blockchain innovators, and technologists.'
    }
  },
  head() {
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
    validateEmail() {
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
