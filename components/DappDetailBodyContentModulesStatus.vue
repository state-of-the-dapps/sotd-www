<template>
<div class="component-DappDetailBodyContentModulesStatus">
  <span class="status" :class="'-' + status"></span> Status: <strong>{{ status | capitalize }}</strong>
</div>
</template>

<script>
export default {
  props: {
    status: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.status {
  display: inline-block;
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
  margin-right: 3px;
  border-radius: 50%;
  @include dapp-background-colors
}
</style>

