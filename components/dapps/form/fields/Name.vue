<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <input 
      :class="name.length > 0 ? '--is-filled' : ''" 
      v-model="name" 
      class="text-input" 
      type="text" 
      maxlength="25" 
      @input="validate">
    <label class="label">ÐApp name <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 25 - name.length }}</span>
    <ul 
      v-if="warnings && warnings.length > 0" 
      class="warning-list">
      <li 
        v-for="(warning, index) in warnings" 
        :key="index" 
        class="warning-item">{{ warning }}</li>
    </ul>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}
      </li>
      <li
        v-if="existingDapp"
        class="error-item">You can 
        <nuxt-link 
          :to="{ name: 'dapp-detail', params: { slug: existingDapp } }"
          class="error-link">review or submit edits to that ÐApp</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { dispatchErrors, dispatchWarnings } from '~/helpers/mixins'

var validationTimer

export default {
  mixins: [dispatchErrors, dispatchWarnings],
  computed: {
    errors() {
      return this.$store.getters['dapps/form/nameErrors']
    },
    existingDapp() {
      return this.$store.getters['dapps/form/existingDapp']
    },
    name: {
      get() {
        return this.$store.getters['dapps/form/name']
      },
      set(value) {
        const field = {
          name: 'name',
          value: value
        }
        this.$store.dispatch('dapps/form/setField', field)
      }
    },
    warnings() {
      return this.$store.getters['dapps/form/nameWarnings']
    }
  },
  methods: {
    validate() {
      clearTimeout(validationTimer)
      const errors = {
        field: 'name',
        data: []
      }
      const warnings = {
        field: 'name',
        data: []
      }
      const warningWords = ['.']
      validationTimer = setTimeout(() => {
        this.name.length > 25
          ? errors.data.push(`Name can't be longer than 25 characters`)
          : ''
        this.name.length < 2
          ? errors.data.push(`Name must be longer than 1 character`)
          : ''
        var hasWarningWords = warningWords.some(word => {
          return this.name.toLowerCase().includes(word)
        })
        hasWarningWords === true
          ? warnings.data.push(`Your ÐApp name should not be a URL`)
          : null
        this.$axios
          .get('dapps/lookup', {
            params: {
              name: this.name
            }
          })
          .then(response => {
            this.$store.dispatch('dapps/form/setExistingDapp', '')
            const data = response.data
            const item = data.item
            if (item.slug) {
              errors.data.push(`That name has already been taken`)
              if (!item.queue) {
                this.$store.dispatch('dapps/form/setExistingDapp', item.slug)
              }
            }
            this.dispatchErrors(errors, 'dapps')
            this.dispatchWarnings(warnings, 'dapps')
          })
          .catch(error => {
            console.log(error)
          })
      }, 750)
    }
  }
}
</script>
