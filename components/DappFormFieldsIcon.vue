<template>
  <div class="item">
    <p class="heading"><span class="checkmark"><IconCheckmark :fill="icon ? 'purple' : 'gray'"/></span>Icon <span class="boost">+10% {{ $t('profileStrength') }}</span></p>
    <p v-if="icon && preFill">
      <img
        :src="icon"
        width="32">
    </p>
    <div class="file-upload">
      <BaseFileUpload
        :width="width"
        :height="height"
        message="<span class=dropzone-plus><img width=150 src=/images/sample-icon.png></span><br>Drop a new icon here, or click to select one"
        @addInvalidDimenionsWarning="addWarning"
        @uploadSuccess="setIcon"
        @removeFile="removeIcon"
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
    <p class="help">Dimensions must be {{ width }}px width by {{ height }}px height <br>(JPEG or PNG format) <br><a 
      href="https://cdn.stateofthedapps.com/image_guidelines_08152018.png"
      target="_blank">View the guidelines/examples</a></p>
  </div>
</template>

<script>
import BaseFileUpload from './BaseFileUpload'
import IconCheckmark from './IconCheckmark'

export default {
  components: {
    BaseFileUpload,
    IconCheckmark
  },
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      height: 192,
      preFill: true,
      warnings: [],
      width: 192
    }
  },
  methods: {
    addWarning() {
      this.warnings.push(
        `Your icon dimensions are not valid. The icon should be ${
          this.width
        }px width by ${this.height}px height.`
      )
    },
    setIcon(url) {
      this.preFill = false
      this.$emit('updateField', 'icon', url)
    },
    removeIcon() {
      this.$emit('updateField', 'icon', '')
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
</style>
