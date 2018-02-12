<template>
  <div class="main-container">
    <div class="content-container">
      <Announcement/>
      <Utilities type="head" />
      <Masthead/>
      <nuxt/>
    </div>
    <Foot/>
    <Utilities type="foot" />
    <transition name="fade">
      <img @click="scrollUp" class="scroll-up" :class="{ '--has-announcement': announcement, '--is-active': scrollNeeded }" src="~/assets/images/scroll-up.png" width="36" height="36">
    </transition>
  </div>
</template>

<script>
  import Announcement from '~/components/shared/Announcements.vue'
  import Foot from '~/components/shared/Foot.vue'
  import Masthead from '~/components/shared/Masthead.vue'
  import Utilities from '~/components/shared/Utilities.vue'

  let scrollTimer

  export default {
    data: () => {
      return {
        scrollNeeded: false
      }
    },
    components: {
      Announcement,
      Foot,
      Masthead,
      Utilities
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

  .content-container {
    overflow: auto;
    min-height: 98%;
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
