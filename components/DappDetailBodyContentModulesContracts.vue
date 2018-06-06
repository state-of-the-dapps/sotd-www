<template>
<div class="component-DappDetailBodyContentModulesContracts">
  <h4 class="subtitle">Contract address<span v-if="contracts.length > 1">(es)</span></h4>
  <ul class="contract-list">
    <DappDetailBodyContentModulesContractsItem v-for="(contract, index) in mainnet" 
      :key="index"
      :address="contract.address"
      :network="contract.network"
      :slug="slug"/>
    <DappDetailBodyContentModulesContractsItem v-for="(contract, index) in additionalMainnet" 
      :key="index + mainnet.length"
      :address="contract"
      :excludeLabel="true"
      network="mainnet"
      :slug="slug"/>
    <DappDetailBodyContentModulesContractsItem v-for="(contract, index) in testnet" 
      :key="index + mainnet.length + additionalMainnet.length"
      :address="contract.address"
      :network="contract.network"
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
  computed: {
    mainnet () {
      let contracts = this.contracts
      let mainnet = []
      for (let i = 0; i < contracts.length; i++) {
        if (contracts[i].network === 'mainnet') {
          mainnet.push(contracts[i])
        }
      }
      return mainnet
    },
    testnet () {
      let contracts = this.contracts
      let testnet = []
      for (let i = 0; i < contracts.length; i++) {
        if (contracts[i].network !== 'mainnet') {
          testnet.push(contracts[i])
        }
      }
      return testnet
    }
  },
  props: {
    contracts: {
      required: true
    },
    additionalMainnet: {
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

.contract-list {
  margin-top: 10px;
}

.subtitle {
  margin: 0;
}
</style>
