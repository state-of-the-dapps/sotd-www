<template>
  <div class="DappDetailBodyContentModules">
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
          <DappDetailBodyContentModulesUpdated :updated="dapp.lastUpdated"/>
        </div>
        <div class="module">
          <DappDetailBodyContentModulesSubmitted :submitted="dapp.created"/>
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
        v-if="dapp.stats && dapp.stats.mau"
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
            :title="$t(namespace('activeUsers'))"
            :help="$t(namespace('activeUsersHelp'))"/>
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
            :title="$t(namespace('transactions'))"
            type="numbers"/>
        </div>
        <div
          v-if="dapp.stats.value_30d || dapp.stats.poa_value_30d || dapp.stats.gochain_value_30d || dapp.stats.eos_value_30d || dapp.stats.steem_value_30d || dapp.stats.hive_value_30d ||dapp.stats.xdai_value_30d || dapp.stats.klaytn_value_30d || dapp.stats.neo_value_30d || dapp.stats.obyte_value_30d || dapp.stats.ost_value_30d || dapp.stats.tron_value_30d || dapp.stats.icon_value_30d || dapp.stats.near_value_30d"
          class="module">
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.value_30d"
            :daily="dapp.stats.value_1d"
            :monthly="dapp.stats.value_30d"
            :sparkline="dapp.sparklines.value"
            :quarterly="dapp.stats.value_90d"
            :weekly="dapp.stats.value_7d"
            :title="$t(namespace('volume'), {token: 'ETH'})"
            type="numbers"/>
          <br v-if="dapp.stats.value_30d && dapp.stats.poa_value_30d">
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.poa_value_30d"
            :daily="dapp.stats.poa_value_1d"
            :monthly="dapp.stats.poa_value_30d"
            :sparkline="dapp.sparklines.poa_value"
            :quarterly="dapp.stats.poa_value_90d"
            :weekly="dapp.stats.poa_value_7d"
            :title="$t(namespace('volume'), {token: 'POA'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.gochain_value_30d"
            :daily="dapp.stats.gochain_value_1d"
            :monthly="dapp.stats.gochain_value_30d"
            :sparkline="dapp.sparklines.gochain_value"
            :quarterly="dapp.stats.gochain_value_90d"
            :weekly="dapp.stats.gochain_value_7d"
            :title="$t(namespace('volume'), {token: 'GO'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.eos_value_30d"
            :daily="dapp.stats.eos_value_1d"
            :monthly="dapp.stats.eos_value_30d"
            :sparkline="dapp.sparklines.eos_value"
            :quarterly="dapp.stats.eos_value_90d"
            :weekly="dapp.stats.eos_value_7d"
            :title="$t(namespace('volume'), {token: 'EOS'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.steem_value_30d"
            :daily="dapp.stats.steem_value_1d"
            :monthly="dapp.stats.steem_value_30d"
            :sparkline="dapp.sparklines.steem_value"
            :quarterly="dapp.stats.steem_value_90d"
            :weekly="dapp.stats.steem_value_7d"
            :title="$t(namespace('volume'), {token: 'STEEM'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.hive_value_30d"
            :daily="dapp.stats.hive_value_1d"
            :monthly="dapp.stats.hive_value_30d"
            :sparkline="dapp.sparklines.hive_value"
            :quarterly="dapp.stats.hive_value_90d"
            :weekly="dapp.stats.hive_value_7d"
            :title="$t(namespace('volume'), {token: 'HIVE'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.xdai_value_30d"
            :daily="dapp.stats.xdai_value_1d"
            :monthly="dapp.stats.xdai_value_30d"
            :sparkline="dapp.sparklines.xdai_value"
            :quarterly="dapp.stats.xdai_value_90d"
            :weekly="dapp.stats.xdai_value_7d"
            :title="$t(namespace('volume'), {token: 'xDAI'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.klaytn_value_30d"
            :daily="dapp.stats.klaytn_value_1d"
            :monthly="dapp.stats.klaytn_value_30d"
            :sparkline="dapp.sparklines.klaytn_value"
            :quarterly="dapp.stats.klaytn_value_90d"
            :weekly="dapp.stats.klaytn_value_7d"
            :title="$t(namespace('volume'), {token: 'KLAY'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.neo_value_30d"
            :daily="dapp.stats.neo_value_1d"
            :monthly="dapp.stats.neo_value_30d"
            :sparkline="dapp.sparklines.neo_value"
            :quarterly="dapp.stats.neo_value_90d"
            :weekly="dapp.stats.neo_value_7d"
            :title="$t(namespace('volume'), {token: 'NEO'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.obyte_value_30d"
            :daily="dapp.stats.obyte_value_1d"
            :monthly="dapp.stats.obyte_value_30d"
            :sparkline="dapp.sparklines.obyte_value"
            :quarterly="dapp.stats.obyte_value_90d"
            :weekly="dapp.stats.obyte_value_7d"
            :title="$t(namespace('volume'), {token: 'GBYTE'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.ost_value_30d"
            :daily="dapp.stats.ost_value_1d"
            :monthly="dapp.stats.ost_value_30d"
            :sparkline="dapp.sparklines.ost_value"
            :quarterly="dapp.stats.ost_value_90d"
            :weekly="dapp.stats.ost_value_7d"
            :title="$t(namespace('volume'), {token: 'OST'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.tron_value_30d"
            :daily="dapp.stats.tron_value_1d"
            :monthly="dapp.stats.tron_value_30d"
            :sparkline="dapp.sparklines.tron_value"
            :quarterly="dapp.stats.tron_value_90d"
            :weekly="dapp.stats.tron_value_7d"
            :title="$t(namespace('volume'), {token: 'TRX'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.icon_value_30d"
            :daily="dapp.stats.icon_value_1d"
            :monthly="dapp.stats.icon_value_30d"
            :sparkline="dapp.sparklines.icon_value"
            :quarterly="dapp.stats.icon_value_90d"
            :weekly="dapp.stats.icon_value_7d"
            :title="$t(namespace('volume'), {token: 'ICX'})"
            type="numbers"/>
          <DappDetailBodyContentModulesStats
            v-if="dapp.stats.near_value_30d"
            :daily="dapp.stats.near_value_1d"
            :monthly="dapp.stats.near_value_30d"
            :sparkline="dapp.sparklines.near_value"
            :quarterly="dapp.stats.near_value_90d"
            :weekly="dapp.stats.near_value_7d"
            :title="$t(namespace('volume'), {token: 'NEAR'})"
            type="numbers"/>
        </div>
      </div>
      <div
        v-if="showAuditsContractsModule"
        class="module-wrapper -tier-5">
        <div
          :class="dapp.audits.length ? 'has-audits' : ''"
          class="module">
          <DappDetailBodyContentModulesContracts
            v-bind="contractProps"
            :slug="dapp.slug"/>
        </div>
        <div
          v-if="dapp.audits && dapp.audits.length"
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
import {
  platformContractPropNames,
  platformNetworkList
} from '@/helpers/constants'
import DappDetailBodyContentModulesAudits from './DappDetailBodyContentModulesAudits'
import DappDetailBodyContentModulesAuthors from './DappDetailBodyContentModulesAuthors'
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
      required: true,
      default: () => {
        const obj = {}
        const networks = platformContractPropNames()
        networks.map(network => {
          obj[network] = []
        })
        return {
          ...obj,
          audits: [],
          authors: [],
          sparklines: {},
          stats: {}
        }
      }
    }
  },
  computed: {
    contractProps() {
      const networks = platformNetworkList()
      const obj = {}
      networks.map(network => {
        const contractName =
          'contracts' + this.$options.filters.capitalize(network)
        obj[network] = this.dapp[contractName]
      })
      return obj
    },
    showAuditsContractsModule() {
      const networks = platformContractPropNames()
      const instances = []
      if (this.dapp.audits && this.dapp.audits.length) {
        instances.push('audits')
      }
      networks.forEach(network => {
        if (this.dapp[network] && this.dapp[network].length) {
          instances.push(network)
        }
      })
      const hasInstances = Boolean(instances.length)
      return hasInstances
    }
  }
}
</script>


<style lang="scss" scoped>
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
