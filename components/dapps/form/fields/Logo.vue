<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="logo.length > 0 ? '--is-filled' : ''" type="text" maxlength="255" v-model="logo" @input="validate">
    <label class="label">Logo URL</label>
    <span class="remaining-characters">{{ 255 - logo.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Provide a URL to your logo <br>Logo must be 400px width<br><a href="https://d3colfu6jphe2a.cloudfront.net/image_guidelines_08152018.png" target="_blank">View the guidelines</a></p>
  </div>
</template>

<script>
  import { dispatchErrors, testImage } from '~/helpers/mixins'

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
          this.logo.length && this.logo.length < 3 ? errors.data.push(`URL can't be less than 3 characters`) : ''
          this.logo.length > 255 ? errors.data.push(`URL can't be longer than 255 characters`) : ''
          this.testImage(this.logo, (url, result) => {
            if (this.logo.length > 0 && result !== 'success') {
              errors.data.push('URL is not a valid image')
            }
            this.dispatchErrors(errors, 'dapps')
          })
        }, 750)
      }
    },
    mixins: [dispatchErrors, testImage]
  }
</script>
