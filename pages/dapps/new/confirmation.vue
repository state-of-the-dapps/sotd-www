<template>
  <div>
    <section class="section">
      <div class="text-container">
        <h1 class="heading">Thanks for submitting!</h1>
        <p>Your post will be reviewed shortly by our digital cats. Stay tuned for status updates via email, typically within one business day.</p>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    head () {
      return {
        title: 'State of the ÐApps — Confirmation'
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'dapps')
    }
  }
</script>
