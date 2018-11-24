<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <input 
      :class="license.length > 0 ? '--is-filled' : ''" 
      v-model="license" 
      class="text-input" 
      type="text" 
      maxlength="50" 
      @input="validate">
    <label class="label">Software license</label>
    <span class="remaining-characters">{{ 50 - license.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">(e.g. MIT, GPL, Proprietary)</p>
  </div>
</template>

<script>
import { dispatchErrors } from '~/helpers/mixins'

var validationTimer

export default {
  mixins: [dispatchErrors],
  computed: {
    errors() {
      return this.$store.getters['dapps/form/licenseErrors']
    },
    license: {
      get() {
        return this.$store.getters['dapps/form/license']
      },
      set(value) {
        const field = {
          name: 'license',
          value: value
        }
        this.$store.dispatch('dapps/form/setField', field)
      }
    }
  },
  methods: {
    validate() {
      clearTimeout(validationTimer)
      const errors = {
        field: 'license',
        data: []
      }
      validationTimer = setTimeout(() => {
        this.license.length > 50
          ? errors.data.push(`License can't be longer than 50 characters`)
          : ''
        this.dispatchErrors(errors, 'dapps')
      }, 750)
    }
  }
}
</script>
