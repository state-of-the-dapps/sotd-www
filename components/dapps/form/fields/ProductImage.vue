<template>
  <div class="item">
    <p class="heading">Product screenshot</p>
    <div class="file-upload">
      <BaseFileUpload
        :resize-width="1200"
        message="<span class=dropzone-plus><img width=150 src=/images/sample-product-image.png></span><br>Drop a product screenshot here, or click to select"
        @uploadSuccess="setProductImage"/>
    </div>
    <p class="help">Dimensions must be 1200px width by 630px height <br>(JPEG format) <br><a 
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
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
