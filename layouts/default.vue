<template>
  <nuxt/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['siteModal'])
  },
  head () {
    return {
      bodyAttrs: {
        class: this.siteModal.component ? 'has-modal' : ''
      }
    }
  }
}
</script>

<style lang="scss">
  body {
    &.has-modal {
      overflow: hidden;
    }
  }
</style>
