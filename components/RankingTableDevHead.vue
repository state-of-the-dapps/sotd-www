<template>
  <div class="component-ranking-table-dev-head">
    <nuxt-link
      v-if="sort"
      :to="{query: {sort: 'dev_30d', order: 'desc'}}"
      :class="$route.query.sort === 'dev_30d' ? 'is-active' : ''"
      class="label head-link">Github</nuxt-link>
    <span v-else class="label">Github</span>
    <Help
      :bottom="true"
      text="The number of GitHub events that the project organization / repository generates. This includes code pushes, issues, pull requests, etc."/>
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
