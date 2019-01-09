<template>
  <div class="item">
    <p class="heading">Product screenshot <span class="boost">+20% {{ $t('profileStrength') }}</span></p>
    <p v-if="productImage && preFill">
      <img
        :src="productImage"
        width="100%">
    </p>
    <div class="file-upload">
      <BaseFileUpload
        :width="width"
        :height="height"
        message="<span class=dropzone-plus><img width=150 src=/images/sample-product-image.png></span><br>Drop a new product screenshot here, or click to select one"
        @addInvalidDimenionsWarning="addWarning"
        @uploadSuccess="setProductImage"
        @removeFile="removeProductImage"
        @removeInvalidDimenionsWarning="removeWarning"/>
    </div>
    <ul 
      v-if="warnings && warnings.length > 0" 
      class="warning-list">
      <li 
        v-for="(warning, index) in warnings" 
        :key="index" 
        class="warning-item">{{ warning }}</li>
    </ul>
    <p class="help">Dimensions must be {{ width }}px width by {{ height }}px height <br>(JPEG format) <br><a 
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
      height: 630,
      preFill: true,
      warnings: [],
      width: 1200
    }
  },
  methods: {
    addWarning() {
      this.warnings.push(
        `Your product image dimensions are not valid. The product image should be ${
          this.width
        }px width by ${this.height}px height.`
      )
    },
    setProductImage(url) {
      this.preFill = false
      this.$emit('updateField', 'productImage', url)
    },
    removeProductImage() {
      this.$emit('updateField', 'productImage', '')
    },
    removeWarning() {
      this.warnings = []
    }
  }
}
</script>

<style lang="scss" scoped>
.file-upload {
  box-shadow: 0 10px 20px rgba($color--black, 0.075);
}

.heading {
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
