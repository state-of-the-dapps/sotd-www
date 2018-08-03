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
  },
  mounted () {
    const myListString = this.$localStorage.get('myList')
    if (myListString) {
      const myList = myListString.split(',')
      this.$store.dispatch('list/setItems', myList)
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
