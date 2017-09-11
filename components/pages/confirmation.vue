<template>
  <div>
    <section class="section">
      <div class="text-container">
        <h1 class="heading">Thanks for submitting a ÐApp</h1>
        <div v-html="content.body"></div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    computed: {
      content () {
        return this.$store.getters['cms/confirmation']
      }
    }
  }
</script>
