<template>
  <div class="component-ranking-table-volume">
    <span 
      v-if="volume === undefined || volume === null" 
      class="value">-</span>
    <span 
      v-else 
      class="value">{{ Number(volume || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }} 
      <template v-if="platform === 'EOS'">EOS</template>
      <template v-if="platform === 'POA'">POA</template>
      <template v-if="platform === 'Ethereum'">ETH</template>
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
      required: true
    },
    stats: {
      type: Object,
      required: true
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
      }
      return volumePct
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-ranking-table-volume {
  display: flex;
  flex-direction: column;
  @include font-monospace;
}

.pct {
  font-size: 0.95rem;
  &.is-positive {
    color: $color--positive;
  }
  &.is-negative {
    color: $color--negative;
  }
}

.value {
  font-size: 1.1rem;
}
</style>
