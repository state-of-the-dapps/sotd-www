<template>
  <div class="RankingTableVolumeHead">
    <nuxt-link
      v-if="sort"
      :to="localePath({name: rankingRouteName, params: rankingParams, query: {sort: 'usd_value_7d', order: 'desc'}})"
      :class="$route.query.sort === 'usd_value_7d' ? 'is-active' : ''"
      class="label head-link"
      @click.native="trackRankingSort('usd_value_7d')">{{ $t('rankingColumns.usd_value_7d') }}</nuxt-link>
    <span 
      v-else 
      class="label">{{ $t('rankingColumns.usd_value_7d') }}</span>
    <BaseHelp
      :bottom="true"
      :text="$t('help.volumeUsd')"/>
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
      const order = 'desc'
      const action = trackDappRankingSort(order, sort)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>
