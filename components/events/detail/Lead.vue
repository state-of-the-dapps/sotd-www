<template>
  <section class="section -lead" :class="'-' + item.status">
    <div class="container">
      <Intro/>
      <Cta/>
    </div>
  </section>
</template>

<script>
  import Cta from '~/components/events/detail/lead/Cta.vue'
  import Intro from '~/components/events/detail/lead/Intro.vue'

  export default {
    components: {
      Cta,
      Intro
    },
    computed: {
      item () {
        return this.$store.getters['events/detail/item']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    position: relative;
    background: lighten($color--gallery, 100%);
    @include tweakpoint('min-width', 600px) {
      display: flex;
      align-items: center;
      > :nth-child(1) {
        flex-grow: 1;
      }
      > :nth-child(2) {
        margin-right: 10px;
      }
    }
    @include tweakpoint('min-width', 600px) {
      > :nth-child(2) {
        margin-right: 0;
      }
    }
  }

  .section {
    border-bottom: 5px solid $color--mine-shaft;
    @include tweakpoint('min-width', 600px) {
      border-width: 8px;
    }
  }
</style>
