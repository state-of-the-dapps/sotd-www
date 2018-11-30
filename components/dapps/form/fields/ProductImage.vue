<template>
  <div class="item">
    <p class="heading">Product image</p>
    <div class="file-upload">
      <BaseFileUpload
        message="Drop your product image here, or click to browse your computer (.jpg)"
        @uploadSuccess="setProductImage"/>
    </div>
    <p class="help">Dimensions must be 1200px width by 630px height <br><a 
      href="https://cdn.stateofthedapps.com/image_guidelines_08152018.png"
      target="_blank">View the guidelines</a></p>
  </div>
</template>

<script>
import BaseFileUpload from '~/components/BaseFileUpload'

export default {
  components: {
    BaseFileUpload
  },
  computed: {
    productImage: {
      get() {
        return this.$store.getters['dapps/form/productImage']
      },
      set(value) {
        const field = {
          name: 'productImage',
          value: value
        }
        this.$store.dispatch('dapps/form/setField', field)
      }
    }
  },
  methods: {
    setProductImage(url) {
      const field = {
        name: 'productImage',
        value: url
      }
      this.$store.dispatch('dapps/form/setField', field)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.file-upload {
  box-shadow: 0 0 20px rgba($color--black, 0.05);
}

.heading {
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
