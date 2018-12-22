<template>
  <div class="item">
    <p class="heading">Product screenshot <span class="boost">+20% profile strength</span></p>
    <p v-if="productImage && preFill">
      <img
        :src="productImage"
        width="100%">
    </p>
    <div class="file-upload">
      <BaseFileUpload
        :resize-width="1200"
        message="<span class=dropzone-plus><img width=150 src=/images/sample-product-image.png></span><br>Drop a new product screenshot here, or click to select one"
        @uploadSuccess="setProductImage"
        @removeFile="removeProductImage"/>
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
  props: {
    productImage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      preFill: true
    }
  },
  methods: {
    setProductImage(url) {
      this.preFill = false
      this.$emit('updateField', 'productImage', url)
    },
    removeProductImage() {
      this.$emit('updateField', 'productImage', '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.file-upload {
  box-shadow: 0 10px 20px rgba($color--black, 0.075);
}

.heading {
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
