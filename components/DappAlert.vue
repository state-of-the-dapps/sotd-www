<template>
  <div class="component-DappAlert">
    <div class="alert-wrapper">
      <p class="alert">{{ alert }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alert: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.alert-wrapper {
  background: rgba($color--warning, 0.15);
  overflow: hidden;
  padding: 0 20px;
  font-weight: 600;
  line-height: 1.3;
  @include tweakpoint('min-width', 1000px) {
    margin: 0px 10px 15px 10px;
  }
}
</style>
