<template>
  <div class="component-ranking-table-volume-head">
    <nuxt-link
      v-if="sort"
      :to="{query: {sort: 'usd_value_7d'}}"
      class="label head-link">Volume (7d)</nuxt-link>
    <span v-else class="label">Volume (7d)</span>
    <Help
      :bottom="true"
      text="Transaction volume to ÐApp contracts"/>
  </div>
</template>

<script>
import Help from './Help'

export default {
  components: {
    Help
  },
  props: {
    sort: {
      type: Boolean,
      default: false
    }
  }
}
</script>

