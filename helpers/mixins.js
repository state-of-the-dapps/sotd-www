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
    dispatchErrors (errors) {
      if (errors.data.length > 0) {
<<<<<<< HEAD:helpers/mixins.js
        this.$store.dispatch('projects/form/addErrorField', errors.field)
      } else {
        this.$store.dispatch('projects/form/removeErrorField', errors.field)
      }
      this.$store.dispatch('projects/form/setErrors', errors)
=======
        this.$store.dispatch('dapps/form/addErrorField', errors.field)
      } else {
        this.$store.dispatch('dapps/form/removeErrorField', errors.field)
      }
      this.$store.dispatch('dapps/form/setErrors', errors)
>>>>>>> master:helpers/mixins.js
    }
  }
}

export const dispatchWarnings = {
  methods: {
    dispatchWarnings (warnings) {
<<<<<<< HEAD:helpers/mixins.js
      this.$store.dispatch('projects/form/setWarnings', warnings)
=======
      this.$store.dispatch('dapps/form/setWarnings', warnings)
>>>>>>> master:helpers/mixins.js
    }
  }
}
