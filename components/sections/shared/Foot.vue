<template>
  <section class="section">
    <div class="container">
      <Foot/>
    </div>
  </section>
</template>

<script>
  import Foot from '~/components/shared/Foot.vue'
  
  export default {
    components: {
      Foot
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .container {
    padding: 30px 20px 75px 20px;
  }

  .section {
    background: $color--mine-shaft;
    color: $color--gallery;
  }
</style>
