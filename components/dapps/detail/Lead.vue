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
      padding: 35px 40px;
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
    border-bottom: 5px solid $color--black;
    @include tweakpoint('min-width', 600px) {
      border-width: 8px;
    }
    &.-live {
      background: $color--dapp-live-light;
      border-color: $color--dapp-live;
    }
    &.-beta {
      background: $color--dapp-beta-light;
      border-color: $color--dapp-beta;
    }
    &.-prototype {
      background: $color--dapp-prototype-light;
      border-color: $color--dapp-prototype;
    }
    &.-wip {
      background: $color--dapp-wip-light;
      border-color: $color--dapp-wip;
    }
    &.-concept {
      background: $color--dapp-concept-light;
      border-color: $color--dapp-concept;
    }
    &.-stealth {
      background: $color--dapp-stealth-light;
      border-color: $color--dapp-stealth;
    }
    &.-abandoned, &.-unknown {
      background: $color--dapp-abandoned-light;
      border-color: $color--dapp-abandoned;
    }
  }
</style>
