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
      <div 
        v-if="dapp.stats.dev_30d" 
        class="module-wrapper -tier-3">
        <div class="module">
          <DappDetailBodyContentModulesDev
            :dev30d="dapp.stats.dev_30d"
            :dev30d-pct="dapp.stats.dev_30d_pct"
            :dev90d="dapp.stats.dev_90d"
            :sparkline="dapp.sparklines.gh_events"/>
        </div>
      </div>
      <div 
        v-if="stats" 
        class="module-wrapper -tier-4">
        <div 
          v-if="dapp.stats.mau" 
          class="module -dev">
          <DappDetailBodyContentModulesStats 
            :daily="dapp.stats.dau"
            :monthly="dapp.stats.mau"
            :sparkline="dapp.sparklines.users"
            :quarterly="dapp.stats.qau"
            :weekly="dapp.stats.wau"
            title="Active users"/>
        </div>
        <div 
          v-if="dapp.stats.tx_30d" 
          class="module">
          <DappDetailBodyContentModulesStats 
            :daily="dapp.stats.tx_1d"
            :monthly="dapp.stats.tx_30d"
            :sparkline="dapp.sparklines.transactions"
            :quarterly="dapp.stats.tx_90d"
            :weekly="dapp.stats.tx_7d"
            title="Transactions"
            type="numbers"/>
        </div>
        <div 
          v-if="dapp.stats.value_30d || dapp.stats.poa_value_30d || dapp.stats.eos_value_30d" 
          class="module">
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.value_30d" 
            :daily="dapp.stats.value_1d"
            :monthly="dapp.stats.value_30d"
            :sparkline="dapp.sparklines.value"
            :quarterly="dapp.stats.value_90d"
            :weekly="dapp.stats.value_7d"
            title="Volume (ETH)"
            type="numbers"/>
          <br v-if="dapp.stats.value_30d && dapp.stats.poa_value_30d">
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.poa_value_30d" 
            :daily="dapp.stats.poa_value_1d"
            :monthly="dapp.stats.poa_value_30d"
            :sparkline="dapp.sparklines.poa_value"
            :quarterly="dapp.stats.poa_value_90d"
            :weekly="dapp.stats.poa_value_7d"
            title="Volume (POA)"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.eos_value_30d"
            :daily="dapp.stats.eos_value_1d"
            :monthly="dapp.stats.eos_value_30d"
            :sparkline="dapp.sparklines.eos_value"
            :quarterly="dapp.stats.eos_value_90d"
            :weekly="dapp.stats.eos_value_7d"
            title="Volume (EOS)"
            type="numbers"/>
        </div>
      </div>
      <div 
        v-if="dapp.audits.length || dapp.contractsMainnet.length || dapp.contractsKovan.length || dapp.contractsRinkeby.length || dapp.contractsRopsten.length || dapp.contractsPoaMainnet.length || dapp.contractsPoaTestnet.length || dapp.contractsEosMainnet.length"
        class="module-wrapper -tier-5">
        <div
          :class="dapp.audits.length ? 'has-audits' : ''"
          class="module">
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
        <div 
          v-if="dapp.audits.length"
          class="module">
          <DappDetailBodyContentModulesAudits
            :slug="dapp.slug"
            :audits="dapp.audits"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DappDetailBodyContentModulesAudits from './DappDetailBodyContentModulesAudits'
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
    DappDetailBodyContentModulesAudits,
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
  props: {
    dapp: {
      type: Object,
      required: true
    }
  },
  computed: {
    stats() {
      let dauExists = this.dapp.stats.dau !== undefined
      return dauExists
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
  &.-tier-2,
  &.-tier-4 {
    @include tweakpoint('min-width', 800px) {
      .module {
        width: calc(50% - 10px);
      }
    }
  }
  &.-tier-3 {
    align-items: center;
    @include tweakpoint('min-width', 800px) {
      .module {
        width: calc(100% - 10px);
      }
    }
  }
  &.-tier-5 {
    @include tweakpoint('min-width', 800px) {
      .module {
        width: calc(100% - 10px);
      }
      &.has-audits {
        width: calc(50% - 10px);
      }
    }
  }
}
</style>
