<template>
  <div class="component-ranking-table-dau-head">
    <nuxt-link
      v-if="sort"
      :to="{query: {sort: 'dau', order: 'desc'}}"
      :class="$route.query.sort === 'dau' ? 'is-active' : ''"
      class="label head-link">Users (24hr)</nuxt-link>
    <span v-else class="label">Users (24hr)</span>
    <Help 
      :bottom="true"
      text="Daily Active Users, or DAU (unique source addresses in transactions to ÐApp contracts)"/>
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
