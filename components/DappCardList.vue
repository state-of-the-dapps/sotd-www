<template>
  <ul class="component-DappCardList">
    <DappCardListItem 
      v-for="(dapp, index) in dapps"
      :key="index"
      :dapp="dapp"
      :optional-attribute="optionalAttribute"
      :source-collection="sourceCollection"/>
  </ul>
</template>

<script>
import DappCardListItem from './DappCardListItem'

export default {
  components: {
    DappCardListItem
  },
  props: {
    dapps: {
      type: Array,
      default: () => []
    },
    optionalAttribute: {
      type: String,
      default: ''
    },
    sourceCollection: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappCardList {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -10px;
}

.component-DappCardListItem {
  height: 175px;
  width: calc(100% - 20px);
  @include tweakpoint('min-width', 480px) {
    width: calc(50% - 20px);
  }
  @include tweakpoint('min-width', 775px) {
    width: calc(33.33% - 20px);
  }
  @include tweakpoint('min-width', 1250px) {
    width: calc(25% - 20px);
  }
}
</style>
