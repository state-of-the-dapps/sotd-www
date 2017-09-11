<template>
  <section class="section" v-if="items && items.length > 0">
    <div class="container">
      <h2 class="heading">Related ÐApps</h2>
      <Related/>
    </div>
  </section>
</template>

<script>
  import Related from '~/components/detail/Related.vue'

  export default {
    components: {
      Related
    },
    computed: {
      items () {
        return this.$store.getters['dapp/activeRelated']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .heading {
    text-align: center;
    font-weight: 300;
    margin-bottom: 1.5rem;
  }
  
  .section {
    background: lighten($color--gallery, 100%);
  }
</style>
