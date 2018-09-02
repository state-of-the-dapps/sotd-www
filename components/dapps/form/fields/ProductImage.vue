<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="productImage.length > 0 ? '--is-filled' : ''" type="text" maxlength="255" v-model="productImage" @input="validate">
    <label class="label">Product Image URL</label>
    <span class="remaining-characters">{{ 255 - productImage.length }}</span>
    <ul v-if="warnings && warnings.length > 0" class="warning-list">
      <li v-for="(warning, index) in warnings" :key="index" class="warning-item">{{ warning }}</li>
    </ul>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Provide a URL to your product image <br>Dimensions must be 1200px width by 630px height <br><a href="https://d3colfu6jphe2a.cloudfront.net/image_guidelines_08152018.png" target="_blank">View the guidelines</a></p>
  </div>
</template>

<script>
  import { dispatchErrors, dispatchWarnings, testImage } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      productImage: {
        get () {
          return this.$store.getters['dapps/form/productImage']
        },
        set (value) {
          const field = {
            name: 'productImage',
            value: value
          }
          this.$store.dispatch('dapps/form/setField', field)
        }
      },
      errors () {
        return this.$store.getters['dapps/form/productImageErrors']
      },
      warnings () {
        return this.$store.getters['dapps/form/productImageWarnings']
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'productImage',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.productImage.length && this.productImage.length < 3 ? errors.data.push(`URL can't be less than 3 characters`) : ''
          this.productImage.length > 255 ? errors.data.push(`URL can't be longer than 255 characters`) : ''
          this.testImage(this.productImage, (url, dimensions, result) => {
            const warnings = {
              field: 'productImage',
              data: []
            }
            if (this.productImage.length > 0 && result !== 'success') {
              errors.data.push('URL is not a valid image')
            }
            if (result === 'success') {
              const imgWidth = dimensions.width
              const imgHeight = dimensions.height
              const expectedWidth = 1200
              const expectedHeight = 630
              if (imgWidth !== expectedWidth || imgHeight !== expectedHeight) {
                warnings.data.push('Image dimensions are not correct. They should be 1200px (width) by 630px (height). This image may not display properly.')
              }
            }
            this.dispatchWarnings(warnings, 'dapps')
            this.dispatchErrors(errors, 'dapps')
          })
        }, 750)
      }
    },
    mixins: [dispatchErrors, dispatchWarnings, testImage]
  }
</script>
