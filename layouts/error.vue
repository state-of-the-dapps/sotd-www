<template>
  <div class="content">
    <h1 v-if="error.statusCode === 404">Whoops, we couldn't find that page</h1>
    <h1 v-else>Whoops, an error occurred.</h1>
    <p>You can always <nuxt-link to="/">start over</nuxt-link>. Also, feel free to <a :href="'mailto:support@stateofthedapps.com?subject=Error on State of the ÐApps website&body=There is an error on this page: https://www.stateofthedapps.com' + $route.fullPath">let us know</a> about this error.</p>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.$mixpanel.track('Error page', { type: '404', resource: this.$route.fullPath })
    },
    props: ['error']
  }
</script>

<style lang="scss" scoped>
  .content {
    min-height: 100%;
    text-align: center;
    padding-top: 50px;
  }
</style>
