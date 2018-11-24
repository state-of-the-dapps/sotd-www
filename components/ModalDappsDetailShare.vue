<template>
  <div class="component-ModalDappsDetailShare">
    <h1 class="title-1">Share {{ modalProps.dapp }} with a friend</h1>
    <p class="message">{{ modalProps.path }}</p>
    <p class="cta-wrapper"><button 
      class="cta" 
      @click="close">I've copied this link!</button></p>
  </div>
</template>

<script>
export default {
  props: {
    modalProps: {
      type: Object,
      required: true
    }
  },
  methods: {
    close() {
      const modal = {
        component: '',
        mpData: {},
        props: {}
      }
      this.$store.dispatch('setSiteModal', modal)
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
  cursor: pointer;
}

.cta-wrapper {
  padding-top: 20px;
  margin-bottom: 0;
}

.message {
  font-size: 1.1rem;
  user-select: all;
  background: $color--white;
  padding: 10px;
  box-shadow: 0 2px 20px rgba($color--black, 0.05);
  overflow: hidden;
}

.title-1 {
  font-size: 3rem;
  text-transform: initial;
  margin: 0;
}
</style>
