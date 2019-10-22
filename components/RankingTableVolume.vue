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
      <span v-if="volumePct > 0">+</span>{{ Number(volumePct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%
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
      } else if (platform === 'xDai') {
        volume = stats.xdai_value_7d
      } else if (platform === 'NEO') {
        volume = stats.neo_value_7d
      } else if (platform === 'OST') {
        volume = stats.ost_value_7d
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
      } else if (platform === 'xDai') {
        volumePct = stats.xdai_value_7d_pct
      } else if (platform === 'NEO') {
        volumePct = stats.neo_value_7d_pct
      } else if (platform === 'OST') {
        volumePct = stats.ost_value_7d_pct
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
