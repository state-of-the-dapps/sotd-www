<template>
  <div class="component-DappDetailBodyContentModulesContracts">
    <ul class="contract-list">
      <DappDetailBodyContentModulesContractsItem
        v-if="mainnet.length"
        :addresses="mainnet"
        :slug="slug"
        platform="Ethereum"
        network="mainnet"/>
      <DappDetailBodyContentModulesContractsItem
        v-if="kovan.length"
        :addresses="kovan"
        :slug="slug"
        platform="Ethereum"
        network="kovan"/>
      <DappDetailBodyContentModulesContractsItem
        v-if="rinkeby.length"
        :addresses="rinkeby"
        :slug="slug"
        platform="Ethereum"
        network="rinkeby"/>
      <DappDetailBodyContentModulesContractsItem
        v-if="ropsten.length"
        :addresses="ropsten"
        :slug="slug"
        platform="Ethereum"
        network="ropsten"/>
      <DappDetailBodyContentModulesContractsItem
        v-if="poaMainnet.length"
        :addresses="poaMainnet"
        :slug="slug"
        platform="POA"
        network="mainnet"/>
      <DappDetailBodyContentModulesContractsItem
        v-if="poaTestnet.length"
        :addresses="poaTestnet"
        :slug="slug"
        platform="POA"
        network="Sokol Testnet"/>
      <DappDetailBodyContentModulesContractsItem
        v-if="eosMainnet.length"
        :addresses="eosMainnet"
        :slug="slug"
        platform="EOS"
        network="mainnet"/>
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
    eosMainnet: {
      type: Array,
      required: true
    },
    slug: {
      type: String,
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
