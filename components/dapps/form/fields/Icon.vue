<template>
  <div class="item">
    <p class="heading">Icon</p>
    <div class="file-upload">
      <BaseFileUpload
        :resize-width="192"
        message="<span class=dropzone-plus><img width=150 src=/images/sample-icon.png></span><br>Drop your icon here, or click to select"
        @uploadSuccess="setIcon"/>
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
  methods: {
    setIcon(url) {
      const field = {
        name: 'icon',
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
