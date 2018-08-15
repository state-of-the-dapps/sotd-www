<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="icon.length > 0 ? '--is-filled' : ''" type="text" maxlength="255" v-model="icon" @input="validate">
    <label class="label">Icon URL</label>
    <span class="remaining-characters">{{ 255 - icon.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Provide a URL to your icon <br>Dimensions must be 192px width by 192px height <br><a href="https://d3colfu6jphe2a.cloudfront.net/image_guidelines_08152018.png" target="_blank">View the guidelines</a></p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      icon: {
        get () {
          return this.$store.getters['dapps/form/icon']
        },
        set (value) {
          const field = {
            name: 'icon',
            value: value
          }
          this.$store.dispatch('dapps/form/setField', field)
        }
      },
      errors () {
        return this.$store.getters['dapps/form/iconErrors']
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'icon',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.icon.length && this.icon.length < 3 ? errors.data.push(`URL can't be less than 3 characters`) : ''
          this.icon.length > 255 ? errors.data.push(`URL can't be longer than 255 characters`) : ''
          this.dispatchErrors(errors, 'dapps')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
