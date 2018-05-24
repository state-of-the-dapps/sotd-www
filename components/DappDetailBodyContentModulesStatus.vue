<template>
<div class="component-DappDetailBodyContentModulesStatus">
  <span class="status -live"></span> Status: <strong>Live</strong>
</div>
</template>

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

