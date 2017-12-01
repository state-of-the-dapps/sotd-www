<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="additionalAuthors.length > 0 ? '--is-filled' : ''" type="text" maxlength="100" v-model="additionalAuthors" @input="validate">
    <label class="label">Additional authors</label>
    <span class="remaining-characters">{{ 100 - additionalAuthors.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="error in errors" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Separate names by commas</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      additionalAuthors: {
        get () {
          return this.$store.getters['dapps/form/additionalAuthors']
        },
        set (value) {
          const field = {
            name: 'additionalAuthors',
            value: value
          }
          this.$store.dispatch('dapps/form/updateField', field)
        }
      },
      errors () {
        return this.$store.getters['dapps/form/additionalAuthorsErrors']
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'additionalAuthors',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.additionalAuthors.length > 100 ? errors.data.push(`Authors can't be longer than 100 characters`) : ''
          this.dispatchErrors(errors)
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
