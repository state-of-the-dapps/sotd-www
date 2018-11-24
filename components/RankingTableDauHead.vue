<template>
  <div class="component-ranking-table-dau-head">
    <nuxt-link
      v-if="sort"
      :to="{query: {sort: 'dau', order: 'desc'}}"
      :class="$route.query.sort === 'dau' ? 'is-active' : ''"
      class="label head-link"
      @click.native="trackRankingSort('dau')">Users (24hr)</nuxt-link>
    <span 
      v-else 
      class="label">Users (24hr)</span>
    <Help 
      :bottom="true"
      text="Daily Active Users, or DAU (unique source addresses in transactions to ÐApp contracts)"/>
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
