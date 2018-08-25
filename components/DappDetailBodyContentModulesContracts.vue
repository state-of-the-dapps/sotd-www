<template>
<div class="component-DappDetailBodyContentModulesContracts">
  <ul class="contract-list">
    <DappDetailBodyContentModulesContractsItem
      v-if="mainnet.length"
      :addresses="mainnet"
      platform="Ethereum"
      network="mainnet"
      :slug="slug"/>
    <DappDetailBodyContentModulesContractsItem
      v-if="kovan.length"
      :addresses="kovan"
      platform="Ethereum"
      network="kovan"
      :slug="slug"/>
    <DappDetailBodyContentModulesContractsItem
      v-if="rinkeby.length"
      :addresses="rinkeby"
      platform="Ethereum"
      network="rinkeby"
      :slug="slug"/>
    <DappDetailBodyContentModulesContractsItem
      v-if="ropsten.length"
      :addresses="ropsten"
      platform="Ethereum"
      network="ropsten"
      :slug="slug"/>
    <DappDetailBodyContentModulesContractsItem
      v-if="poaMainnet.length"
      :addresses="poaMainnet"
      platform="POA"
      network="mainnet"
      :slug="slug"/>
    <DappDetailBodyContentModulesContractsItem
      v-if="poaTestnet.length"
      :addresses="poaTestnet"
      platform="POA"
      network="testnet"
      :slug="slug"/>
  </ul>
</div>
</template>

<script>
import DappDetailBodyContentModulesContractsItem from './DappDetailBodyContentModulesContractsItem'

export default {
  components: {
    DappDetailBodyContentModulesContractsItem
  },
  props: {
    mainnet: {
      type: Array,
      required: true
    },
    kovan: {
      type: Array,
      required: true
    },
    rinkeby: {
      type: Array,
      required: true
    },
    ropsten: {
      type: Array,
      required: true
    },
    poaMainnet: {
      type: Array,
      required: true
    },
    poaTestnet: {
      type: Array,
      required: true
    },
    slug: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.subtitle {
  margin: 0;
}
</style>
