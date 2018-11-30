<template>
  <div class="item">
    <p class="heading">Logo</p>
    <div class="file-upload">
      <BaseFileUpload
        :resize-width="400"
        message="<span class=dropzone-plus><img width=150 src=/images/sample-logo.png></span><br>Drop your logo here, or click to select"
        @uploadSuccess="setIcon"/>
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
  methods: {
    setIcon(url) {
      const field = {
        name: 'logo',
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
</style>
