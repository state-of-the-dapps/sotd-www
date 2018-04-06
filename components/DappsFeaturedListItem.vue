<template>
  <li class="component-DappsFeaturedListItem" :id="'dapps-featured-list-item-' + index">
    <a class="dapp-link" href="#">{{ dapp.name }} {{ index }}</a>
  </li>
</template>

<script>
export default {
  props: ['dapp', 'index']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappsFeaturedListItem {
  height: 175px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba($color--black, .15);
  margin: 0 10px 20px 10px;
  overflow: hidden;
  border-radius: 4px;
  width: 100%;
  @include tweakpoint('min-width', 840px) {
    width: calc(33.33% - 20px);
  }
}

.dapp-link {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
