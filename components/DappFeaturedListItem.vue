<template>
  <li class="component-DappFeaturedListItem" :id="'dapps-featured-list-item-' + index">
    <a class="dapp-link" href="#">
      <img class="dapp-image" src="">
      <div class="dapp-name" :class="'-' + dapp.status">{{ dapp.name }}</div>
    </a>
  </li>
</template>

<script>
export default {
  props: ['dapp', 'index']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappFeaturedListItem {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px rgba($color--black, .15);
  margin: 0 10px 20px 10px;
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  transition: all .2s ease;
  @include tweakpoint('min-width', 750px) {
    width: calc(33.33% - 20px);
  }
  &:hover {
    transform: scale(1.03)
  }
}

.dapp-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.dapp-name {
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-left-radius: 4px;
  background: $color--black;
  color: $color--white;
  padding: 7px 10px;
}
</style>
