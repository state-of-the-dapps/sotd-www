<template>
  <div class="RankingTableRankHead">
    <nuxt-link
      v-if="sort"
      :to="localePath({name: rankingRouteName, params: rankingParams, query: {}})"
      :class="!$route.query.sort ? 'is-active' : ''"
      class="label head-link"
      @click.native="trackRankingSort('rank')">#</nuxt-link>
    <span 
      v-else 
      class="label">#</span>
    <BaseHelp
      :bottom="true"
      :text="$t(namespace('help'))"/>
  </div>
</template>

<script>
import { trackDappRankingSort } from '~/helpers/mixpanel'
import BaseHelp from './BaseHelp'

export default {
  components: {
    BaseHelp
  },
  props: {
    sort: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rankingRouteName() {
      let routeName = 'rankings'
      if (this.$route.params.platform) {
        routeName += '-platform'
      }
      if (this.$route.params.category) {
        routeName += '-category'
      }
      return routeName
    },
    rankingParams() {
      return { ...this.$route.params }
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
.RankingTableRankHead {
  text-align: center;
}
</style>
