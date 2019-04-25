<template>
  <div class="DappDetailBodyContentModulesContracts">
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
        v-if="goChainMainnet.length"
        :addresses="goChainMainnet"
        :slug="slug"
        platform="GoChain"
        network="mainnet"/>
      <DappDetailBodyContentModulesContractsItem
        v-if="eosMainnet.length"
        :addresses="eosMainnet"
        :slug="slug"
        platform="EOS"
        network="mainnet"/>
      <DappDetailBodyContentModulesContractsItem
        v-if="steemMainnet.length"
        :addresses="steemMainnet"
        :slug="slug"
        platform="Steem"
        network="mainnet"/>
      <DappDetailBodyContentModulesContractsItem
        v-if="xDaiMainnet.length"
        :addresses="xDaiMainnet"
        :slug="slug"
        platform="xDai"
        network="mainnet"/>
    </ul>
  </div>
</template>

<script>
import { platformNetworkList } from '@/helpers/constants'
import DappDetailBodyContentModulesContractsItem from './DappDetailBodyContentModulesContractsItem'

const contractProps = () => {
  const obj = {}
  const networks = platformNetworkList()
  networks.map(network => {
    obj[network] = {
      type: Array,
      required: true,
      default: () => []
    }
  })
  return obj
}

export default {
  components: {
    DappDetailBodyContentModulesContractsItem
  },
  props: {
    ...contractProps(),
    slug: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.subtitle {
  margin: 0;
}
</style>
