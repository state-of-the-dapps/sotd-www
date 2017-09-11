<template>
  <section class="section">
    <div class="container">
      <Results/>
      <Browse/>
      <BrowseCategories/>
      <BrowseRefine/>
    </div>
  </section>    
</template>

<script>
  import Browse from '~/components/list/Browse.vue'
  import BrowseCategories from '~/components/list/BrowseCategories.vue'
  import BrowseRefine from '~/components/list/BrowseRefine.vue'
  import Results from '~/components/list/Results.vue'

  export default {
    components: {
      Browse,
      BrowseCategories,
      BrowseRefine,
      Results
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .container {
    display: flex;
    flex-direction: column-reverse;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding: 25px 20px;
      flex-direction: row;
      align-items: center;
      > :nth-child(1) {
        flex-grow: 1;
      }
    }
  }
</style>
