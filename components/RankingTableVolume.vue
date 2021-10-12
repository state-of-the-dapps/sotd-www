<template>
  <div class="RankingTableVolume">
    <span
      v-if="volume === undefined || volume === null"
      class="value">-</span>
    <span
      v-else
      class="value">{{ Number(volume || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }}
      <template v-if="platform === 'EOS'">EOS</template>
      <template v-if="platform === 'POA'">POA</template>
      <template v-if="platform === 'GoChain'">GO</template>
      <template v-if="platform === 'Ethereum'">ETH</template>
      <template v-if="platform === 'Steem'">STEEM</template>
      <template v-if="platform === 'Hive'">HIVE</template>
      <template v-if="platform === 'Klaytn'">KLAY</template>
      <template v-if="platform === 'Neo'">NEO</template>
      <template v-if="platform === 'Obyte'">GBYTE</template>
      <template v-if="platform === 'OST'">OST</template>
      <template v-if="platform === 'TRON'">TRX</template>
      <template v-if="platform === 'ICON'">ICX</template>
      <template v-if="platform === 'NEAR'">NEAR</template>
      <template v-if="platform === 'Moonriver'">MOVR</template>
      <template v-if="platform === 'xDai'">xDAI</template>
    </span>
    <span
      v-if="stats.usd_value_7d === undefined || stats.usd_value_7d === null"
      class="value">-</span>
    <span
      v-else
      class="value">{{ Number(stats.usd_value_7d || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }} USD</span>
    <span
      v-if="volumePct === undefined || volumePct === null"
      class="pct">-</span>
    <span
      v-else
      :class="getValuePosNegClass(volumePct)"
      class="pct">
      <span v-show="volumePct > 0">+</span>{{ Number(volumePct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%
    </span>
  </div>
</template>

<script>
import { getValuePosNegClass } from '~/helpers/mixins'

export default {
  mixins: [getValuePosNegClass],
  props: {
    platform: {
      type: String,
      required: true,
      default: ''
    },
    stats: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    volume() {
      let volume
      let stats = this.stats
      let platform = this.platform
      if (platform === 'Ethereum') {
        volume = stats.value_7d
      } else if (platform === 'EOS') {
        volume = stats.eos_value_7d
      } else if (platform === 'POA') {
        volume = stats.poa_value_7d
      } else if (platform === 'GoChain') {
        volume = stats.gochain_value_7d
      } else if (platform === 'Steem') {
        volume = stats.steem_value_7d
      } else if (platform === 'Hive') {
        volume = stats.hive_value_7d
      } else if (platform === 'xDai') {
        volume = stats.xdai_value_7d
      } else if (platform === 'Klaytn') {
        volume = stats.klaytn_value_7d
      } else if (platform === 'Neo') {
        volume = stats.neo_value_7d
      } else if (platform === 'Obyte') {
        volume = stats.obyte_value_7d
      } else if (platform === 'OST') {
        volume = stats.ost_value_7d
      } else if (platform === 'TRON') {
        volume = stats.tron_value_7d
      } else if (platform === 'ICON') {
        volume = stats.icon_value_7d
      } else if (platform === 'NEAR') {
        volume = stats.near_value_7d
      } else if (platform === 'Moonriver') {
        volume = stats.moonriver_value_7d
      }
      return volume
    },
    volumePct() {
      let volumePct
      let stats = this.stats
      let platform = this.platform
      if (platform === 'Ethereum') {
        volumePct = stats.value_7d_pct
      } else if (platform === 'EOS') {
        volumePct = stats.eos_value_7d_pct
      } else if (platform === 'POA') {
        volumePct = stats.poa_value_7d_pct
      } else if (platform === 'GoChain') {
        volumePct = stats.gochain_value_7d_pct
      } else if (platform === 'Steem') {
        volumePct = stats.steem_value_7d_pct
      } else if (platform === 'Hive') {
        volumePct = stats.hive_value_7d_pct
      } else if (platform === 'xDai') {
        volumePct = stats.xdai_value_7d_pct
      } else if (platform === 'Klaytn') {
        volumePct = stats.klaytn_value_7d_pct
      } else if (platform === 'Neo') {
        volumePct = stats.neo_value_7d_pct
      } else if (platform === 'Obyte') {
        volumePct = stats.obyte_value_7d_pct
      } else if (platform === 'OST') {
        volumePct = stats.ost_value_7d_pct
      } else if (platform === 'TRON') {
        volumePct = stats.tron_value_7d_pct
      } else if (platform === 'ICON') {
        volumePct = stats.icon_value_7d_pct
      } else if (platform === 'NEAR') {
        volumePct = stats.near_value_7d_pct
      } else if (platform === 'Moonriver') {
        volumePct = stats.moonriver_value_7d_pct
      }
      return volumePct
    }
  }
}
</script>

<style lang="scss" scoped>
.RankingTableVolume {
  display: flex;
  flex-direction: column;
  @include font-text-mono;
}

.pct {
  font-size: 0.9rem;
  &.is-positive {
    color: $color--positive;
  }
  &.is-negative {
    color: $color--negative;
  }
}

.value {
  font-size: 0.9rem;
}
</style>
