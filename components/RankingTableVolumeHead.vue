<template>
  <div class="component-ranking-table-volume-head">
    <nuxt-link
      v-if="sort"
      :to="{query: {sort: 'usd_value_7d', order: 'desc'}}"
      :class="$route.query.sort === 'usd_value_7d' ? 'is-active' : ''"
      class="label head-link"
      @click.native="trackRankingSort('usd_value_7d')">Volume (7d)</nuxt-link>
    <span 
      v-else 
      class="label">Volume (7d)</span>
    <Help
      :bottom="true"
      text="Transaction volume to ÐApp contracts"/>
  </div>
</template>

<script>
import { trackDappRankingSort } from '~/helpers/mixpanel'
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
  },
  methods: {
    trackRankingSort(sort) {
      const order = 'desc'
      const action = trackDappRankingSort(order, sort)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>
