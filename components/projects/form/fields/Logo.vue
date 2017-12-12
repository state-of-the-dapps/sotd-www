<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="logo.length > 0 ? '--is-filled' : ''" type="text" maxlength="255" v-model="logo" @input="validate">
    <label class="label">Logo URL</label>
    <span class="remaining-characters">{{ 255 - logo.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="error in errors" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Provide a URL to your logo</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      logo: {
        get () {
          return this.$store.getters['dapps/form/logo']
        },
        set (value) {
          const field = {
            name: 'logo',
            value: value
          }
          this.$store.dispatch('dapps/form/setField', field)
        }
      },
      errors () {
        return this.$store.getters['dapps/form/logoErrors']
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'logo',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.logo.length > 255 ? errors.data.push(`URL can't be longer than 255 characters`) : ''
          this.dispatchErrors(errors)
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
