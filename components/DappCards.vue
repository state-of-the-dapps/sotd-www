<template>
  <ul class="component-DappCards">
    <DappCardsItem v-for="(dapp, index) in dapps" :key="index" />
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

