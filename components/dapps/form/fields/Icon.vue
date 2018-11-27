<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <input 
      :class="icon.length > 0 ? '--is-filled' : ''" 
      v-model="icon" 
      class="text-input" 
      type="text" 
      maxlength="255" 
      @input="validate">
    <label class="label">Icon URL</label>
    <span class="remaining-characters">{{ 255 - icon.length }}</span>
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
    <p class="help">Provide a URL to your icon <br>Dimensions must be 192px width by 192px height <br><a 
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
    icon: {
      get() {
        return this.$store.getters['dapps/form/icon']
      },
      set(value) {
        const field = {
          name: 'icon',
          value: value
        }
        this.$store.dispatch('dapps/form/setField', field)
      }
    },
    errors() {
      return this.$store.getters['dapps/form/iconErrors']
    },
    warnings() {
      return this.$store.getters['dapps/form/iconWarnings']
    }
  },
  methods: {
    validate() {
      clearTimeout(validationTimer)
      const errors = {
        field: 'icon',
        data: []
      }
      validationTimer = setTimeout(() => {
        this.icon.length && this.icon.length < 3
          ? errors.data.push(`URL can't be less than 3 characters`)
          : ''
        this.icon.length > 255
          ? errors.data.push(`URL can't be longer than 255 characters`)
          : ''
        this.testImage(this.icon, (url, dimensions, result) => {
          const warnings = {
            field: 'icon',
            data: []
          }
          if (this.icon.length > 0 && result !== 'success') {
            errors.data.push('URL is not a valid image')
          }
          if (result === 'success') {
            const imgWidth = dimensions.width
            const imgHeight = dimensions.height
            const expectedWidth = 192
            const expectedHeight = 192
            if (imgWidth !== expectedWidth || imgHeight !== expectedHeight) {
              warnings.data.push(
                'Image dimensions are not correct. They should be 192px by 192px. This image may not display properly.'
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
