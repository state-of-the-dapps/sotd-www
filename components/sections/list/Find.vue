<template>
  <section class="section">
    <div class="container">
      <Search/>
      <SearchSuggestions/>
    </div>
  </section>    
</template>

<script>
  import Search from '~/components/list/Search.vue'
  import SearchSuggestions from '~/components/list/SearchSuggestions.vue'

  export default {
    components: {
      Search,
      SearchSuggestions
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .container {
    position: relative;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding-top: 25px;
      padding-bottom: 50px;
    }
  }
  
  .section {
    background: rgba(255,255,255,.35);
  }
</style>
