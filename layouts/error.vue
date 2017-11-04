<template>
  <div class="main-container">
    <AnnouncementSection/>
    <MastheadSection/>
    <div v-if="error.statusCode === 404" class="content">
      <h1>Whoops, we couldn't find that page</h1>
      <p>You can always <nuxt-link to="/">start over</nuxt-link></p>
    </div>
    <div v-else class="content">
      <h1>Whoops, an error occurred.</h1>
      <p>You can always <nuxt-link to="/">start over</nuxt-link></p>
    </div>
    <FootSection/>
  </div>
</template>

<script>
  import AnnouncementSection from '~/components/sections/shared/Announcement.vue'
  import FootSection from '~/components/sections/shared/Foot.vue'
  import MastheadSection from '~/components/sections/shared/Masthead.vue'

  export default {
    components: {
      AnnouncementSection,
      FootSection,
      MastheadSection
    },
    mounted () {
      this.$mixpanel.track('Error page', { type: '404' })
    },
    props: ['error']
  }
</script>

<style lang="scss" scoped>
  .main-container {
    height: 100%;
  }

  .content {
    min-height: 100%;
    text-align: center;
    padding-top: 50px;
  }
</style>
