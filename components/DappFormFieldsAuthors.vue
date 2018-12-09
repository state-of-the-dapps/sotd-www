<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <input 
      :class="authors.length > 0 ? '--is-filled' : ''" 
      v-model="authors" 
      class="text-input" 
      type="text" 
      maxlength="100" 
      @input="validate">
    <label class="label">ÐApp author(s) <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 100 - authors.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Separate names or organizations with a comma</p>
  </div>
</template>

<script>
import { dispatchErrors } from '~/helpers/mixins'

var validationTimer

export default {
  mixins: [dispatchErrors],
  computed: {
    authors: {
      get() {
        const values = this.$store.getters['dapps/form/authors'].slice()
        return values.join(', ')
      },
      set(value) {
        const values = value.split(', ')
        const field = {
          name: 'authors',
          value: values
        }
        this.$store.dispatch('dapps/form/setField', field)
      }
    },
    errors() {
      return this.$store.getters['dapps/form/authorsErrors']
    }
  },
  methods: {
    validate() {
      clearTimeout(validationTimer)
      const errors = {
        field: 'authors',
        data: []
      }
      validationTimer = setTimeout(() => {
        this.authors.length > 100
          ? errors.data.push(`Authors can't be longer than 100 characters`)
          : ''
        this.authors.length < 2
          ? errors.data.push(`Authors must be longer than 1 character`)
          : ''
        this.dispatchErrors(errors, 'dapps')
      }, 750)
    }
  }
}
</script>
