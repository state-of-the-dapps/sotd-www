<template>
  <div>
    <span v-if="value === null">-</span>
    <span v-else>{{ Number(value || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }}</span>
    <span v-if="value_pct === null">-</span>
    <span v-else :class="getValuePosNegClass(value_pct)"><span v-if="value_pct > 0">+</span>{{ Number(value_pct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span>
  </div>
</template>

<script>
import { getValuePosNegClass } from '~/helpers/mixins'

export default {
  props: {
    value: {
      type: Number,
      default: null
    },
    value_pct: {
      type: Number,
      default: null
    }
  },
  mixins: [getValuePosNegClass]
}
</script>
