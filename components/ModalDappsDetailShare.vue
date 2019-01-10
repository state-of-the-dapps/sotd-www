<template>
  <div class="component-modal-dapps-detail-share">
    <h1 class="title-1">Share {{ dappName }} with a friend</h1>
    <p class="message">https://www.stateofthedapps.com/dapps/{{ dappSlug }}</p>
    <p class="cta-wrapper"><button 
      class="cta" 
      @click="close">I've copied this link!</button></p>
  </div>
</template>

<script>
export default {
  props: {
    dappName: {
      type: String,
      required: true
      // TODO default value
    },
    dappSlug: {
      type: String,
      required: true
      // TODO default value
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.component-modal-dapps-detail-share {
  text-align: center;
}

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
