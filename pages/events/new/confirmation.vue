<template>
  <div>
    <section class="section">
      <div class="text-container">
        <h1 class="heading">Thanks for submitting!</h1>
        <p>Your post will be reviewed in the next 24h by our digital cats. Stay tuned for updates via email.</p>
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
      this.$store.dispatch('setSiteSection', 'events')
    }
  }
</script>
