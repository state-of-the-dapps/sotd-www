<template>
  <nuxt/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['pageModal', 'siteModal'])
  },
  head() {
    return {
      bodyAttrs: {
        class: this.siteModal.component || this.pageModal ? 'has-modal' : ''
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
