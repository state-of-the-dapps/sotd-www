<template>
  <div class="RankingTableDevHead">
    <nuxt-link
      v-if="sort"
      :to="localePath({name: rankingRouteName, params: rankingParams, query: {sort: 'dev_30d', order: 'desc'}})"
      :class="$route.query.sort === 'dev_30d' ? 'is-active' : ''"
      class="label head-link"
      @click.native="trackRankingSort('dev_30d')">{{ $t('rankingColumns.dev_30d') }}</nuxt-link>
    <span 
      v-else 
      class="label">{{ $t('rankingColumns.dev_30d') }}</span>
    <Help
      :bottom="true"
      :text="$t('devActivity30dHelp')"/>
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
      const order = 'desc'
      const action = trackDappRankingSort(order, sort)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>
