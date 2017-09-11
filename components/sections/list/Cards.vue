<template>
  <section class="section">
    <div class="container">
      <Cards/>
    </div>
  </section>
</template>

<script>
  import Cards from '~/components/list/Cards.vue'
  
  export default {
    components: {
      Cards
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    padding: 0px;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding: 0 10px;
    }
  }
</style>
