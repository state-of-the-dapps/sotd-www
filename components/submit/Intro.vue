<template>
  <div>
    <h1 class="heading">Submit a ÐApp</h1>
    <p class="message">{{ content.message }}</p>
  </div>
</template>

<script>
  export default {
    computed: {
      content () {
        return this.$store.getters['cms/submit']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .heading {
    text-align: center;
    margin: 0 0 .5rem 0;
    font-size: 1.75rem;
    font-weight: 700;
  }
  
  .message {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.1rem;
  }
</style>
