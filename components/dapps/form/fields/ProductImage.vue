<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="productImage.length > 0 ? '--is-filled' : ''" type="text" maxlength="255" v-model="productImage" @input="validate">
    <label class="label">Product Image URL</label>
    <span class="remaining-characters">{{ 255 - productImage.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Provide a URL to your product image <br>Dimensions must be 1200px width by 630px height <br><a href="https://d3colfu6jphe2a.cloudfront.net/dapps/cryptokitties/product_image.jpg" target="_blank">See an example</a></p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

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
          this.dispatchErrors(errors, 'dapps')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
