<template>
  <div class="component-ModalPromotedDappsNewConfirmation">
    <div v-if="!submitted" class="step-1">
      <h1 class="title-1">Request a change</h1>
      <p class="message">Message</p>
      <p class="cta-wrapper"><button @click="close" class="button -cancel">Cancel</button> <button class="cta" @click="submit">Submit</button></p>
    </div>
    <div v-if="submitted " class="step-2">
      <h1 class="title-1">Thanks!</h1>
      <p class="message">Message</p>
      <p class="cta-wrapper"><button class="cta" @click="close">OK</button></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      submitted: false
    }
  },
  methods: {
    close () {
      const modal = {
        component: '',
        mpData: {}
      }
      this.$store.dispatch('setSiteModal', modal)
    },
    submit () {
      this.submitted = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.button {
  &.-cancel {
    margin-right: 20px;
  }
}

.cta {
  background: $color--black;
  color: $color--white;
  padding: 12px 50px;
  box-shadow: 0 5px 20px rgba($color--black, .2);
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
