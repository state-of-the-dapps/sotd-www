<template>
  <div class="main-container">
    <AnnouncementSection/>
    <MastheadSection/>
    <nuxt/>
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
    }
  }
</script>

<style lang="scss" scoped>
  .main-container {
    height: 100%;
  }
</style>
