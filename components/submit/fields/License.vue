<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="license.length > 0 ? '--is-filled' : ''" type="text" maxlength="50" v-model="license" @input="validate">
    <label class="label">Software license <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 50 - license.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="error in errors" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">(e.g. MIT, GPL)</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/plugins/mixins'

  var validationTimer

  export default {
    computed: {
      errors () {
        return this.$store.getters['submit/licenseErrors']
      },
      license: {
        get () {
          return this.$store.getters['submit/license']
        },
        set (value) {
          const field = {
            name: 'license',
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
          field: 'license',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.license.length > 50 ? errors.data.push(`License can't be longer than 50 characters`) : ''
          this.license.length < 2 ? errors.data.push(`License must be longer than 1 character`) : ''
          this.dispatchErrors(errors)
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
