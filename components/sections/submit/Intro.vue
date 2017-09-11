<template>
  <section class="section">
    <div class="container">
      <Intro/>
    </div>    
  </section>
</template>

<script>
  import Intro from '~/components/submit/Intro.vue'
  
  export default {
    components: {
      Intro
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .container {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  
  .section {
    background: rgba(lighten($color--gallery, 100%), 1);
    border-bottom: 8px solid darken($color--gallery, 5%);
  }
</style>
