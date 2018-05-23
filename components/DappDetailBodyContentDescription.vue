<template>
  <div class="component-DappDetailBodyContentDescription">
    <p class="description">
        Axie Infinity is a game about collecting, raising and battling cute fantasy creatures called Axie, on the Ethereum platform.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  text-align: center;
  padding: 5px 10px 5px 10px;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
    padding: 15px 10px 5px 10px;
  }
}
</style>
