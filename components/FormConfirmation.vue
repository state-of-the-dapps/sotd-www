<template>
  <div class="FormConfirmation">
    <h1 class="title-1">Thanks for submitting!</h1>
    <p class="message">Your post will typically be processed by the next business day. Stay tuned for updates via the email you provided.</p>
    <p class="cta-wrapper"><button 
      class="cta" 
      @click="close">Ok</button></p>
  </div>
</template>

<script>
export default {
  props: {
    hasSubmittedDapp: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    close() {
      let routeName = 'home'
      if (this.hasSubmittedDapp === 'no') {
        routeName = 'dapps-new'
      }
      this.$router.push(this.localePath({ name: routeName }))
    }
  }
}
</script>

<style lang="scss" scoped>
.FormConfirmation {
  text-align: center;
}

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
  text-align: left;
}

.title-1 {
  @include title-1;
  font-size: 3rem;
  text-transform: initial;
  margin: 0;
}
</style>
