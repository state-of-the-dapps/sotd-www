<template>
  <div class="item">
    <p class="heading"><span class="checkmark"><IconCheckmark :fill="logo.length ? 'purple' : 'gray'"/></span>Logo <span class="boost">+5% {{ $t('profileStrength') }}</span></p>
    <p v-if="logo && preFill">
      <img
        :src="logo"
        width="200">
    </p>
    <div class="file-upload">
      <BaseFileUpload
        :width="width"
        :height="height"
        message="<span class=dropzone-plus><img width=150 src=/images/sample-logo.png></span><br>Drop a new logo here, or click to select one"
        @addInvalidDimenionsWarning="addWarning"
        @uploadSuccess="setLogo"
        @removeFile="removeLogo"
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
    logo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      height: 200,
      preFill: true,
      warnings: [],
      width: 400
    }
  },
  computed: {
    message() {
      const html = ``
      return html
    }
  },
  methods: {
    addWarning() {
      this.warnings.push(
        `Your logo dimensions are not valid. The logo should be ${
          this.width
        }px width by ${this.height}px height.`
      )
    },
    setLogo(url) {
      this.preFill = false
      this.$emit('updateField', 'logo', url)
    },
    removeLogo() {
      this.$emit('updateField', 'logo', '')
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
