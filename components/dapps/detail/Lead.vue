<template>
  <section class="section -lead" :class="'-' + item.status">
    <div class="container">
      <Intro/>
      <Cta/>
    </div>
  </section>
</template>

<script>
  import Cta from '~/components/dapps/detail/lead/Cta.vue'
  import Intro from '~/components/dapps/detail/lead/Intro.vue'

  export default {
    components: {
      Cta,
      Intro
    },
    computed: {
      item () {
        return this.$store.getters['dapps/detail/item']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    position: relative;
    @include tweakpoint('min-width', 600px) {
      padding-left: 40px;
      padding-right: 40px;
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
    &.-live {
      background: $color--screamin-green;
      border-color: $color--bright-green;
    }
    &.-demo {
      background: $color--paris-daisy;
      border-color: $color--gorse;
    }
    &.-prototype {
      background: $color--golden-tainoi;
      border-color: $color--koromiko;
    }
    &.-wip {
      background: $color--anakiwa;
      border-color: $color--malibu;
    }
    &.-concept {
      background: $color--perfume;
      border-color: $color--portage;
    }
    &.-stealth, &.-abandoned, &.-unknown {
      background: $color--alabaster;
      border-color: rgba($color--mine-shaft,.2);
    }
  }
</style>
