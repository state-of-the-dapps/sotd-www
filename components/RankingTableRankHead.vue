<template>
  <div class="component-ranking-table-rank-head">
    <nuxt-link
      v-if="sort"
      :to="{query: {}}"
      :class="!$route.query.sort ? 'is-active' : ''"
      class="label head-link">#</nuxt-link>
    <span v-else class="label">#</span>
    <Help
      :bottom="true"
      text="The default rank is based on DAU, or Daily Active Users (unique source addresses in transactions to ÐApp contracts)"/>
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

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-ranking-table-rank-head {
  text-align: center;
}


</style>
