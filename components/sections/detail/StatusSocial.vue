<template>
  <section class="section">
    <div class="container">
      <Status/>
      <Social/>
    </div>
  </section>
</template>

<script>
  import Social from '~/components/detail/Social.vue'
  import Status from '~/components/detail/Status.vue'
  
  export default {
    components: {
      Social,
      Status
    },
    computed: {
      item () {
        return this.$store.getters['dapp/active']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .container {
    display: flex; 
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @include tweakpoint('min-width', 600px) {
      justify-content: left;
      flex-direction: row;
    }
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding-left: 160px;
      padding-right: 160px;
    }
  }
  
  .section {
    background: lighten($color--gallery, 100%);
  }
</style>
