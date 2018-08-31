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
  border: 1px solid $color--warning;
  background: rgba($color--warning, 0.1);
  margin: 10px 10px 0 10px;
  overflow: hidden;
  padding: 0 20px;
  font-weight: 600;
  line-height: 1.3;
  @include tweakpoint('min-width', 1000px) {
    margin-top: 0;
    margin-bottom: 20px;
  }
}
</style>
