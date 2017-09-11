<template>
  <transition name="fade">
    <section v-if="status" class="section">
      <div class="container">
        <Announcement/>
      </div>
    </section>
  </transition>
</template>

<script>
  import Announcement from '~/components/shared/Announcement.vue'
  
  export default {
    components: {
      Announcement
    },
    computed: {
      status () {
        return this.$store.getters['announcement/status']
      }
    },
    mounted () {
      this.$store.dispatch('announcement/set')
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .container {
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
    position: relative;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  
  .section {
    background: $color--mine-shaft;
    transition: visibility .4s ease, opacity .3s ease;
    @include tweakpoint('min-width', $tweakpoint--default) {
      position: fixed;
      width: 100%;
      bottom: 0;
      z-index: 20;
    }
  }
</style>
