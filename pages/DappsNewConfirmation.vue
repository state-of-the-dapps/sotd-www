<template>
  <LayoutMain>
    <div>
      <section class="section">
        <div class="text-container">
          <h1 class="heading">Thanks for submitting!</h1>
          <p>Your post will typically be processed by the next business day. Stay tuned for updates via email.</p>
        </div>
      </section>
    </div>
  </LayoutMain>
</template>

<script>
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    LayoutMain
  },
  head() {
    return {
      title: 'State of the ÐApps — Confirmation'
    }
  },
  mounted() {
    this.$store.dispatch('setSiteSection', 'dapps')
  }
}
</script>
