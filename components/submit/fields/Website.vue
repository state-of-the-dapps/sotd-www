<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
      <input class="text-input" :class="website.length > 0 ? '--is-filled' : ''" type="text" maxlength="25" v-model="website" @input="validate">
      <label class="label">Website url<span class="required">(required)</span></label>
      <span class="remaining-characters">{{ 500 - website.length }}</span>
      <ul v-if="errors && errors.length > 0" class="error-list">
        <li v-for="error in errors" class="error-item">{{ error }}</li>
      </ul>
      <p class="help">A url to this ÐApp's website</p>
    </div>
</template>

<script>
  import { dispatchErrors } from '~/plugins/mixins'
  
  var validationTimer
  
  export default {
    computed: {
      errors () {
        return this.$store.getters['submit/websiteErrors']
      },
      website: {
        get () {
          return this.$store.getters['submit/website']
        },
        set (value) {
          const field = {
            name: 'website',
            value: value
          }
          this.$store.dispatch('submit/updateField', field)
        }
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'website',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.website.length < 3 ? errors.data.push(`Website url must be longer than 2 characters`) : ''
          this.dispatchErrors(errors)
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
