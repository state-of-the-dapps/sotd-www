<template>
  <div class="item">
    <p class="heading">Icon <span class="boost">+10% {{ $t('profileStrength') }}</span></p>
    <p v-if="icon && preFill">
      <img
        :src="icon"
        width="32">
    </p>
    <div class="file-upload">
      <BaseFileUpload
        :resize-width="192"
        message="<span class=dropzone-plus><img width=150 src=/images/sample-icon.png></span><br>Drop a new icon here, or click to select one"
        @uploadSuccess="setIcon"
        @removeFile="removeIcon"/>
    </div>
    <p class="help">Dimensions must be 192px width by 192px height <br>(JPEG or PNG format) <br><a 
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
    icon: {
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
    setIcon(url) {
      this.preFill = false
      this.$emit('updateField', 'icon', url)
    },
    removeIcon() {
      this.$emit('updateField', 'icon', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.file-upload {
  box-shadow: 0 10px 20px rgba($color--black, 0.075);
}
</style>
