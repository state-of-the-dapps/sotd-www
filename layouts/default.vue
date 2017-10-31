<template>
  <div class="main-container">
    <AnnouncementSection/>
    <MastheadSection/>
    <nuxt/>
    <FootSection/>
    <transition name="fade">
      <img @click="scrollUp" class="scroll-up" :class="{ '--has-announcement': announcement, '--is-active': scrollNeeded }" src="/images/scroll-up.png" width="36" height="36">
    </transition>
  </div>
</template>

<script>
  import AnnouncementSection from '~/components/sections/shared/Announcement.vue'
  import FootSection from '~/components/sections/shared/Foot.vue'
  import MastheadSection from '~/components/sections/shared/Masthead.vue'
  var scrollTimer

  export default {
    data: () => {
      return {
        scrollNeeded: false
      }
    },
    components: {
      AnnouncementSection,
      FootSection,
      MastheadSection
    },
    computed: {
      announcement () {
        return this.$store.getters['announcement/status']
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      scrollUp () {
        document.getElementById('__nuxt').scrollIntoView({ behavior: 'smooth' })
      },
      handleScroll () {
        clearTimeout(scrollTimer)
        scrollTimer = setTimeout(() => {
          if (window.scrollY > 1500) {
            this.scrollNeeded = true
          } else {
            this.scrollNeeded = false
          }
        }, 250)
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .main-container {
    height: 100%;
    position: relative;
  }
  .scroll-up {
    position: fixed;
    bottom: 12px;
    right: 12px;
    z-index: 5;
    opacity: 0;
    transition: opacity .2s ease;
    cursor: pointer;
    -webkit-filter: drop-shadow(0 0 10px rgba($color--mine-shaft, .2));
    filter:         drop-shadow(0 0 10px rgba($color--mine-shaft, .2));
    &.--has-announcement {
      @include tweakpoint('min-width', 1000px) {
        bottom: 55px;
      }
    }
    &.--is-active {
      opacity: 1;
    }
  }
</style>
