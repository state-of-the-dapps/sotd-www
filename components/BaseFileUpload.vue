<template>
  <div class="component-base-file-upload">
    <dropzone
      id="dropzone"
      ref="el"
      :awss3="awss3"
      :options="options"
      :destroy-dropzone="true"
      :duplicate-check="true"
      @vdropzone-queue-complete="disable"
      @vdropzone-s3-upload-error="s3UploadError"
      @vdropzone-s3-upload-success="s3UploadSuccess"/>
    <div
      v-if="disabled"
      class="disable"
      @click="enable">Remove or change this image</div>
  </div>
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
    },
    resizeWidth: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      disabled: false,
      awss3: {
        signingURL: process.env.apiUrl + 'images/sign_s3',
        headers: {},
        params: {},
        sendFileToServer: false,
        withCredentials: false
      },
      options: {
        autoProcessQueue: true,
        dictDefaultMessage: this.message,
        resizeWidth: this.resizeWidth,
        maxFiles: 1,
        maxFilesize: 2,
        thumbnailWidth: 300,
        thumbnailMethod: 'contain'
      }
    }
  },
  mounted() {
    const instance = this.$refs.el.dropzone
  },
  methods: {
    disable() {
      this.$refs.el.dropzone.disable()
      this.disabled = true
    },
    enable() {
      this.$refs.el.dropzone.removeAllFiles()
      this.$refs.el.dropzone.enable()
      this.disabled = false
    },
    s3UploadError(errorMessage) {
      console.log(errorMessage)
    },
    s3UploadSuccess(s3ObjectLocation) {
      this.$emit('uploadSuccess', s3ObjectLocation)
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/settings';

.vue-dropzone .dz-preview .dz-details,
.dropzone .dz-preview.dz-image-preview .dz-details {
  background-color: rgba($color--black, 0.8);
}

.dz-message {
  padding-left: 20px;
  padding-right: 20px;
}

.dropzone-plus {
  line-height: 1;
  font-size: 2.5rem;
  font-weight: 700;
  color: darken($color--gray, 20%);
  img {
    padding-bottom: 5px;
  }
}
</style>

<style lang="scss" scoped>
@import '~assets/css/settings';

#dropzone {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.2px;
  font-family: 'Overpass';
  color: $color--black;
  transition: background-color 0.2s linear;
  padding: 5px;
  border: 2px solid transparent;
  &.dz-clickable {
    border: 2px dashed darken($color--gray, 15%);
  }
}

.disable {
  text-align: center;
  text-decoration: underline;
  background: $color--purple;
  color: $color--white;
  padding: 10px;
  cursor: pointer;
}
</style>
