<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
      <input class="text-input" :class="website.length > 0 ? '--is-filled' : ''" type="text" maxlength="500" v-model="website" @input="validate">
      <label class="label">Website URL<span class="required">(required)</span></label>
      <span class="remaining-characters">{{ 500 - website.length }}</span>
      <ul v-if="errors && errors.length > 0" class="error-list">
        <li v-for="error in errors" class="error-item">{{ error }}</li>
      </ul>
      <p class="help">A URL to this ÐApp's website</p>
    </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      errors () {
        return this.$store.getters['projects/form/websiteErrors']
      },
      website: {
        get () {
          return this.$store.getters['projects/form/website']
        },
        set (value) {
          const field = {
            name: 'website',
            value: value
          }
          this.$store.dispatch('projects/form/setField', field)
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
          this.website.length < 3 ? errors.data.push(`Website URL must be longer than 2 characters`) : ''
          this.dispatchErrors(errors)
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
