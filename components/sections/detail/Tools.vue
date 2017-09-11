<template>
  <section class="section">
    <div class="container">
      <Tools/>
    </div>
  </section>
</template>

<script>
    import Tools from '~/components/detail/Tools.vue'
    
    export default {
      components: {
        Tools
      }
    }
</script>


<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .container {
    padding-bottom: 30px;
  }  
</style>
