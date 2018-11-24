<template>
  <div class="component-ranking-table-rank-head">
    <nuxt-link
      v-if="sort"
      :to="{query: {}}"
      :class="!$route.query.sort ? 'is-active' : ''"
      class="label head-link"
      @click.native="trackRankingSort('rank')">#</nuxt-link>
    <span 
      v-else 
      class="label">#</span>
    <Help
      :bottom="true"
      text="Rank is based on multiple factors including active users (unique source addresses in transactions to ÐApp contracts), transaction volume, developer activity, profile freshness and strength, CTRs, and user recommendations"/>
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
      const order = 'asc'
      const action = trackDappRankingSort(order, sort)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-ranking-table-rank-head {
  text-align: center;
}
</style>
