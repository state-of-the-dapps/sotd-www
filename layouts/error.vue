<template>
  <div class="layout-error">
    <h1 v-if="error.statusCode === 404">Whoops, we couldn't find that page</h1>
    <h1 v-else>Whoops, an error occurred.</h1>
    <p>You can always <nuxt-link to="/">start over</nuxt-link>. Also, feel free to <a :href="'mailto:support@stateofthedapps.com?subject=Error on State of the ÐApps website&body=There is an error on this page: https://www.stateofthedapps.com' + $route.fullPath">let us know</a> about this error.</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.$mixpanel.track('Error page', {
      type: this.error.statusCode,
      message: this.error.message,
      resource: this.$route.fullPath
    })
    if (
      this.error.statusCode === 500 &&
      /^Loading chunk [0-9]+ failed/.test(this.error.message) &&
      window.location.hash !== '#retry'
    ) {
      // the chunk might no longer be available due to a recent redeployment of the page
      // mark the page to not trigger reload infinitely
      window.location.hash = '#retry'
      window.location.reload(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-error {
  @apply min-h-full text-center pt-16;
}
</style>
