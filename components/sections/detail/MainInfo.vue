<template>
  <section class="section">
    <div class="container">
      <MainInfo/>
    </div>
  </section>
</template>

<script>
  import MainInfo from '~/components/detail/MainInfo.vue'

  export default {
    components: {
      MainInfo
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .container {
    padding-top: 20px;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding-left: 160px;
      padding-right: 160px;
    }
  }
</style>
