<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <textarea 
      :class="description.length > 0 ? '--is-filled' : ''" 
      v-model="description" 
      class="text-area" 
      maxlength="1000" 
      style="min-height: 200px" 
      autocomplete="off" 
      autocorrect="off" 
      autocapitalize="off" 
      spellcheck="false" 
      type="text" 
      @input="validate"/>
    <label 
      v-if="description.length < 450" 
      class="label">Full description <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 1000 - description.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">The full description of your ÐApp in English.</p>
  </div>
</template>

<script>
import { dispatchErrors } from '~/helpers/mixins'

var validationTimer

export default {
  mixins: [dispatchErrors],
  computed: {
    description: {
      get() {
        return this.$store.getters['dapps/form/description']
      },
      set(value) {
        const field = {
          name: 'description',
          value: value
        }
        this.$store.dispatch('dapps/form/setField', field)
      }
    },
    errors() {
      return this.$store.getters['dapps/form/descriptionErrors']
    }
  },
  methods: {
    validate() {
      clearTimeout(validationTimer)
      const errors = {
        field: 'description',
        data: []
      }
      validationTimer = setTimeout(() => {
        this.description.length > 1000
          ? errors.data.push(`Description can't be longer than 1000 characters`)
          : ''
        this.description.length < 50
          ? errors.data.push(`Description must be longer than 50 characters`)
          : ''
        this.dispatchErrors(errors, 'dapps')
      }, 750)
    }
  }
}
</script>
