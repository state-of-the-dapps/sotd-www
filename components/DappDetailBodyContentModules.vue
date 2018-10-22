<template>
  <div class="component-DappDetailBodyContentModules">
    <div class="main-wrapper">
      <div class="module-wrapper -tier-1">
        <div class="module -status">
          <DappDetailBodyContentModulesStatus :status="dapp.status"/>
        </div>
        <div class="module">
          <DappDetailBodyContentModulesAuthors :authors="dapp.authors"/>
        </div>
        <div class="module">
          <DappDetailBodyContentModulesLicense :license="dapp.license"/>
        </div>
      </div>
      <div class="module-wrapper -tier-2">
        <div class="module">
          <DappDetailBodyContentModulesSubmitted :submitted="dapp.created"/>
        </div>
        <div class="module">
          <DappDetailBodyContentModulesUpdated :updated="dapp.lastUpdated"/>
        </div>
      </div>
      <div class="module-wrapper -tier-3" v-if="dapp.stats.dev_30d">
        <div class="module">
          <DappDetailBodyContentModulesDev
            :dev30d="dapp.stats.dev_30d"
            :dev30dPct="dapp.stats.dev_30d_pct"
            :dev90d="dapp.stats.dev_90d"
            :sparkline="dapp.sparklines.gh_events"/>
        </div>
      </div>
      <div class="module-wrapper -tier-4" v-if="stats">
        <div class="module -dev" v-if="dapp.stats.mau">
          <DappDetailBodyContentModulesStats 
            :daily="dapp.stats.dau"
            :monthly="dapp.stats.mau"
            :sparkline="dapp.sparklines.users"
            :quarterly="dapp.stats.qau"
            title="Active users"
            :weekly="dapp.stats.wau"/>
        </div>
        <div class="module" v-if="dapp.stats.tx_30d">
          <DappDetailBodyContentModulesStats 
            :daily="dapp.stats.tx_1d"
            :monthly="dapp.stats.tx_30d"
            :sparkline="dapp.sparklines.transactions"
            :quarterly="dapp.stats.tx_90d"
            title="Transactions"
            type="numbers"
            :weekly="dapp.stats.tx_7d"/>
        </div>
        <div class="module" v-if="dapp.stats.value_30d || dapp.stats.poa_value_30d || dapp.stats.eos_value_30d">
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.value_30d" 
            :daily="dapp.stats.value_1d"
            :monthly="dapp.stats.value_30d"
            :sparkline="dapp.sparklines.value"
            :quarterly="dapp.stats.value_90d"
            title="Volume (ETH)"
            type="numbers"
            :weekly="dapp.stats.value_7d"/>
          <br v-if="dapp.stats.value_30d && dapp.stats.poa_value_30d">
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.poa_value_30d" 
            :daily="dapp.stats.poa_value_1d"
            :monthly="dapp.stats.poa_value_30d"
            :sparkline="dapp.sparklines.poa_value"
            :quarterly="dapp.stats.poa_value_90d"
            title="Volume (POA)"
            type="numbers"
            :weekly="dapp.stats.poa_value_7d"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.eos_value_30d"
            :daily="dapp.stats.eos_value_1d"
            :monthly="dapp.stats.eos_value_30d"
            :sparkline="dapp.sparklines.eos_value"
            :quarterly="dapp.stats.eos_value_90d"
            title="Volume (EOS)"
            type="numbers"
            :weekly="dapp.stats.eos_value_7d"/>
        </div>
      </div>
      <div class="module-wrapper -tier-5"
        v-if="dapp.contractsMainnet.length || dapp.contractsKovan.length || dapp.contractsRinkeby.length || dapp.contractsRopsten.length || dapp.contractsPoaMainnet.length || dapp.contractsPoaTestnet.length || dapp.contractsEosMainnet.length">
        <div class="module">
          <DappDetailBodyContentModulesContracts
            :mainnet="dapp.contractsMainnet"
            :kovan="dapp.contractsKovan"
            :rinkeby="dapp.contractsRinkeby"
            :ropsten="dapp.contractsRopsten"
            :poa-mainnet="dapp.contractsPoaMainnet"
            :poa-testnet="dapp.contractsPoaTestnet"
            :eos-mainnet="dapp.contractsEosMainnet"
            :slug="dapp.slug"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DappDetailBodyContentModulesAuthors from './DappDetailBodyContentModulesAuthors'
import DappDetailBodyContentModulesCollections from './DappDetailBodyContentModulesCollections'
import DappDetailBodyContentModulesContracts from './DappDetailBodyContentModulesContracts'
import DappDetailBodyContentModulesDev from './DappDetailBodyContentModulesDev'
import DappDetailBodyContentModulesLicense from './DappDetailBodyContentModulesLicense'
import DappDetailBodyContentModulesStatus from './DappDetailBodyContentModulesStatus'
import DappDetailBodyContentModulesStats from './DappDetailBodyContentModulesStats'
import DappDetailBodyContentModulesSubmitted from './DappDetailBodyContentModulesSubmitted'
import DappDetailBodyContentModulesUpdated from './DappDetailBodyContentModulesUpdated'

export default {
  components: {
    DappDetailBodyContentModulesAuthors,
    DappDetailBodyContentModulesCollections,
    DappDetailBodyContentModulesContracts,
    DappDetailBodyContentModulesDev,
    DappDetailBodyContentModulesLicense,
    DappDetailBodyContentModulesStatus,
    DappDetailBodyContentModulesStats,
    DappDetailBodyContentModulesSubmitted,
    DappDetailBodyContentModulesUpdated
  },
  computed: {
    stats () {
      let dauExists = this.dapp.stats.dau !== undefined
      return dauExists
    }
  },
  props: {
    dapp: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.main-wrapper {
  padding: 10px;
  @include tweakpoint('min-width', 700px) {
    padding: 5px;
  }
}

.module {
  background: lighten($color--gray, 3%);
  padding: 10px;
  margin-bottom: 10px;
  @include tweakpoint('min-width', 800px) {
    padding: 20px;
  }
  &.-status {
    display: flex;
    align-items: center;
  }
}

.module-wrapper {
  @include tweakpoint('min-width', 800px) {
    display: flex;
    .module {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  &.-tier-1 {
    @include tweakpoint('min-width', 800px) {
      .module {
        width: calc(33.33% - 10px);
      }
    }
  }
  &.-tier-2, &.-tier-4 {
    @include tweakpoint('min-width', 800px) {
      .module {
        width: calc(50% - 10px);
      }
    }
  }
  &.-tier-3 {
    align-items: center;
  }
  &.-tier-3, &.-tier-5 {
    @include tweakpoint('min-width', 800px) {
      .module {
        width: calc(100% - 10px);
      }
    }    
  }
}
</style>
