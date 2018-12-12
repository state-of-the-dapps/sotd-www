<template>
  <div>
    <DappFormFields
      :errors="errors"
      :existing-dapp="existingDapp"
      :fields="fields"
      :is-edit="true"
      :suggestions="suggestions"
      :warnings="warnings"
      @updateErrors="updateErrors"
      @updateField="updateField"
      @updateWarnings="updateWarnings"
      @updateExistingDapp="updateExistingDapp"/>
  </div>
</template>

<script>
import { dispatchErrors, dispatchWarnings } from '~/helpers/mixins'
import { mapActions, mapGetters } from 'vuex'
import DappFormFields from './DappFormFields'

export default {
  components: {
    DappFormFields
  },
  mixins: [dispatchErrors, dispatchWarnings],
  props: {
    suggestions: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('dapps/form', [
      'fields',
      'errors',
      'existingDapp',
      'warnings'
    ])
  },
  mounted() {
    this.$store.dispatch('dapps/form/resetForm')
  },
  destroyed() {
    this.$store.dispatch('dapps/form/resetForm')
  },
  methods: {
    ...mapActions('dapps/form', ['setExistingDapp', 'setField']),
    updateExistingDapp(dapp) {
      this.setExistingDapp(dapp)
    },
    updateErrors(errors) {
      this.dispatchErrors(errors, 'dapps')
    },
    updateField(field, value) {
      const fieldObj = {
        name: field,
        value: value
      }
      this.setField(fieldObj)
    },
    updateWarnings(warnings) {
      this.dispatchWarnings(warnings, 'dapps')
    }
  }
}
</script>
