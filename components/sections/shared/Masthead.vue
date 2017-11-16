<template>
  <nav class="section">
    <div class="container">
      <Navigation/>
      <Nameplate/>
    </div>
  </nav>
</template>

<script>
  import Nameplate from '~/components/shared/Nameplate.vue'
  import Navigation from '~/components/shared/Navigation.vue'

  export default {
    components: {
      Nameplate,
      Navigation
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    @include tweakpoint('min-width', $tweakpoint--default) {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      padding-top: 25px;
      padding-bottom: 25px;
      > * {
          width: 50%;
      }
    }
  }

  .section {
    position: relative;
    z-index: 10;
    background: rgba(255,255,255,.4);
    &.-secondary {
      background: none;
    }
  }
</style>
