<template>
  <div>
    <span v-if="stats.usd_value_7d">{{ stats.usd_value_7d }} USD</span>
    <span v-else>- USD</span>
    <span v-if="volume === undefined || volume === null">-</span>
    <span v-else>{{ Number(volume || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }} 
      <template v-if="platform === 'EOS'">EOS</template>
      <template v-if="platform === 'POA'">POA</template>
      <template v-if="platform === 'Ethereum'">ETH</template>
    </span>
    <span v-if="volume === undefined || volumePct === null">-</span>
    <span v-else :class="getValuePosNegClass(volumePct)">
      <span v-if="volumePct > 0">+</span>
      {{ Number(volumePct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%
    </span>
  </div>
</template>

<script>
import { getValuePosNegClass } from '~/helpers/mixins'

export default {
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
    volume () {
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
    volumePct () {
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
  },
  mixins: [getValuePosNegClass]
}
</script>
