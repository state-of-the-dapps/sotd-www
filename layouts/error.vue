<template>
  <div class="layout">
    <PageHeading :title="title"/>
    <p>You can always <nuxt-link to="/">start over</nuxt-link>. Also, feel free to <a :href="'mailto:support@stateofthedapps.com?subject=Error on State of the ÐApps website&body=There is an error on this page: https://www.stateofthedapps.com' + $route.fullPath">let us know</a> about this error.</p>
  </div>
</template>

<script>
import PageHeading from '@/components/PageHeading'

export default {
  components: {
    PageHeading
  },
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title() {
      if (this.error.statusCode === 404) {
        return `Whoops, we couldn't find that page`
      } else {
        return `Whoops, an error occurred`
      }
    }
  },
  mounted() {
    this.$mixpanel.track('Error page', {
      type: this.error.statusCode,
      message: this.error.message,
      resource: this.$route.fullPath
    })
    // Handle chunk loading errors
    // This may be due to a new deployment or a network problem
    if (
      this.error.statusCode === 500 &&
      /^Loading chunk (\d)+ failed\./.test(this.error.message) &&
      window.location.hash !== '#retry'
    ) {
      // the chunk might no longer be available due to a recent redeployment of the page
      // mark the page to not trigger reload infinitely
      window.location.hash = '#retry'
      window.location.reload(true /* skip cache */)
      return // prevent error page blinking for user
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100%;
  text-align: center;
}
</style>
