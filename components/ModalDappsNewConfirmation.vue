<template>
  <div class="component-ModalDappsNewConfirmation">
    <h1 class="title-1">Thanks for submitting!</h1>
    <p class="message">Your post will be reviewed in the next 24 hours by our digital cats. Stay tuned for updates via email.</p>
    <p class="cta-wrapper"><button 
      class="cta" 
      @click="close">Ok</button></p>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      const modal = {
        component: '',
        mpData: {},
        props: {}
      }
      this.$store.dispatch('setSiteModal', modal)
      this.$router.push({ name: 'promoted-dapps' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.cta {
  background: $color--black;
  color: $color--white;
  padding: 12px 50px;
  box-shadow: 0 5px 20px rgba($color--black, 0.2);
  text-transform: uppercase;
  cursor: pointer;
}

.cta-wrapper {
  padding-top: 20px;
  margin-bottom: 0;
}

.message {
  font-size: 1.1rem;
}

.title-1 {
  font-size: 3rem;
  text-transform: initial;
  margin: 0;
}
</style>
