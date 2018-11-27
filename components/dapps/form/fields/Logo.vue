<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <input 
      :class="logo.length > 0 ? '--is-filled' : ''" 
      v-model="logo" 
      class="text-input" 
      type="text" 
      maxlength="255" 
      @input="validate">
    <label class="label">Logo URL</label>
    <span class="remaining-characters">{{ 255 - logo.length }}</span>
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
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Provide a URL to your logo <br>Logo must be 400px width<br><a 
      href="https://cdn.stateofthedapps.com/image_guidelines_08152018.png"
      target="_blank">View the guidelines</a></p>
  </div>
</template>

<script>
import { dispatchErrors, dispatchWarnings, testImage } from '~/helpers/mixins'

var validationTimer

export default {
  mixins: [dispatchErrors, dispatchWarnings, testImage],
  computed: {
    logo: {
      get() {
        return this.$store.getters['dapps/form/logo']
      },
      set(value) {
        const field = {
          name: 'logo',
          value: value
        }
        this.$store.dispatch('dapps/form/setField', field)
      }
    },
    errors() {
      return this.$store.getters['dapps/form/logoErrors']
    },
    warnings() {
      return this.$store.getters['dapps/form/logoWarnings']
    }
  },
  methods: {
    validate() {
      clearTimeout(validationTimer)
      const errors = {
        field: 'logo',
        data: []
      }
      validationTimer = setTimeout(() => {
        this.logo.length && this.logo.length < 3
          ? errors.data.push(`URL can't be less than 3 characters`)
          : ''
        this.logo.length > 255
          ? errors.data.push(`URL can't be longer than 255 characters`)
          : ''
        this.testImage(this.logo, (url, dimensions, result) => {
          const warnings = {
            field: 'logo',
            data: []
          }
          if (this.logo.length > 0 && result !== 'success') {
            errors.data.push('URL is not a valid image')
          }
          if (result === 'success') {
            const imgWidth = dimensions.width
            const expectedWidth = 400
            if (imgWidth !== expectedWidth) {
              warnings.data.push(
                'Image dimensions are not correct. The logo should be 400px wide. This image may not display properly.'
              )
            }
          }
          this.dispatchWarnings(warnings, 'dapps')
          this.dispatchErrors(errors, 'dapps')
        })
      }, 750)
    }
  }
}
</script>
