<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <input 
      :class="url.length > 0 ? '--is-filled' : ''" 
      v-model="url" 
      class="text-input" 
      type="text" 
      maxlength="500" 
      @input="validate">
    <label class="label">Website URL <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 500 - url.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">A URL to this ÐApp's website</p>
  </div>
</template>

<script>
import { dispatchErrors } from '~/helpers/mixins'

var validationTimer

export default {
  mixins: [dispatchErrors],
  computed: {
    errors() {
      return this.$store.getters['dapps/form/websiteUrlErrors']
    },
    url: {
      get() {
        return this.$store.getters['dapps/form/websiteUrl']
      },
      set(value) {
        const field = {
          name: 'website',
          value: value
        }
        this.$store.dispatch('dapps/form/setSiteUrl', field)
      }
    }
  },
  methods: {
    validate() {
      clearTimeout(validationTimer)
      const errors = {
        field: 'websiteUrl',
        data: []
      }
      validationTimer = setTimeout(() => {
        this.url.length < 3
          ? errors.data.push(`Website URL must be longer than 2 characters`)
          : ''
        this.dispatchErrors(errors, 'dapps')
      }, 750)
    }
  }
}
</script>
