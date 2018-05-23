<template>
  <div class="component-DappDetailBodyContentImage">
    <div class="wrapper">
      <img class="image" src="https://d3colfu6jphe2a.cloudfront.net/dapps/axie-infinity/key_visual_1526279552.jpg">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/settings';

.image {
  max-width: 100%;
  display: block;
  @include tweakpoint('min-width', 1000px) {
    border-radius: 4px;
  } 
}

.wrapper {
  @include tweakpoint('min-width', 1000px) {
    margin: 0 10px;
  } 
}
</style>
