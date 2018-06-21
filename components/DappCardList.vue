<template>
<ul class="component-DappCardList">
  <DappCardListItem v-for="(dapp, index) in dapps"
    :key="index"
    :dapp="dapp"
    :sourceCollection="sourceCollection"/>
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
      default () {
        return []
      },
      type: Array
    },
    sourceCollection: {
      type: String
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
  width: calc(100% - 20px);
  @include tweakpoint('min-width', 480px) {
    width: calc(50% - 20px);
  }
  @include tweakpoint('min-width', 775px) {
    width: calc(33.33% - 20px);
  }
  @include tweakpoint('min-width', 1250px) {
    width: calc(16.66% - 20px);
  }
}
</style>
