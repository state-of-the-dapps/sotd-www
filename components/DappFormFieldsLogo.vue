<template>
  <div class="item">
    <p class="heading">Logo</p>
    <p v-if="logo && preFill">
      <img
        :src="logo"
        width="200">
    </p>
    <div class="file-upload">
      <BaseFileUpload
        :resize-width="400"
        message="<span class=dropzone-plus><img width=150 src=/images/sample-logo.png></span><br>Drop a new logo here, or click to select one"
        @uploadSuccess="setLogo"
        @removeFile="removeLogo"/>
    </div>
    <p class="help">Dimensions must be 400px width by 200-400px height <br>(JPEG or PNG format) <br><a 
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
    logo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      preFill: true
    }
  },
  computed: {
    message() {
      const html = ``
      return html
    }
  },
  methods: {
    setLogo(url) {
      this.preFill = false
      this.$emit('updateField', 'logo', url)
    },
    removeLogo() {
      this.$emit('updateField', 'logo', '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.file-upload {
  box-shadow: 0 10px 20px rgba($color--black, 0.075);
}
</style>
