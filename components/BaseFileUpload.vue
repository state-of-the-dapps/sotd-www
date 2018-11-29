<template>
  <dropzone
    id="dropzone"
    ref="el"
    :options="options"
    :destroy-dropzone="true"/>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  components: {
    Dropzone
  },
  props: {
    message: {
      type: String,
      default: 'Drop file here'
    }
  },
  data() {
    return {
      // See https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/props
      options: {
        acceptedFiles: '.jpg,.jpeg,.JPG,.JPEG',
        url: process.env.imageUploadUrl,
        dictDefaultMessage: this.message,
        maxFiles: 1,
        thumbnailWidth: '300',
        thumbnailMethod: 'contain'
      }
    }
  },
  mounted() {
    // Everything is mounted and you can access the dropzone instance
    const instance = this.$refs.el.dropzone
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

#dropzone {
  letter-spacing: 0.2px;
  font-family: 'Overpass';
  color: $color--black;
  transition: background-color 0.2s linear;
  padding: 5px;
  border: 2px dashed darken($color--gray, 15%);
}
</style>
