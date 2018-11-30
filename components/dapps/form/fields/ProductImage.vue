<template>
  <div class="item">
    <p class="heading">Product image</p>
    <div class="file-upload">
      <BaseFileUpload
        message="Drop your product image here, or click to browse your computer (JPG)"
        @uploadSuccess="setProductImage"/>
    </div>
    <p class="help">Dimensions must be 1200px width by 630px height <br><a 
      href="https://cdn.stateofthedapps.com/image_guidelines_08152018.png"
      target="_blank">View the guidelines/examples</a></p>
  </div>
</template>

<script>
import BaseFileUpload from '~/components/BaseFileUpload'

export default {
  components: {
    BaseFileUpload
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
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
