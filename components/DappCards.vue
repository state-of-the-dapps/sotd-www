<template>
<ul class="component-DappCards">
  <DappCardsItem v-for="(dapp, index) in dapps" :key="index" :dapp="dapp" />
</ul>
</template>

<script>
import DappCardsItem from '~/components/DappCardsItem'

export default {
  components: {
    DappCardsItem
  },
  props: {
    dapps: {
      default () {
        return []
      },
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappCards {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -10px;
}

.component-DappCardsItem {
  width: calc(100% - 20px);
  @include tweakpoint('min-width', 480px) {
    width: calc(50% - 20px);
  }
  @include tweakpoint('min-width', 775px) {
    width: calc(33.33% - 20px);
  }
  @include tweakpoint('min-width', 1500px) {
    width: calc(16.66% - 20px);
  }
}
</style>
