<template>
  <div class="item">
    <p class="heading">Product icon</p>
    <div class="file-upload">
      <BaseFileUpload
        message="Drop your icon image here, or click to browse your computer (.jpg, .png)"
        @uploadSuccess="setIcon"/>
    </div>
    <p class="help">Dimensions must be 192px width by 192px height <br><a 
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

.heading {
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
