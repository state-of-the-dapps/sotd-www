<template>
  <div class="component-ranking-table-dau-head">
    <nuxt-link
      v-if="sort"
      :to="localePath({name: rankingRouteName, params: rankingParams, query: {sort: 'dau', order: 'desc'}})"
      :class="$route.query.sort === 'dau' ? 'is-active' : ''"
      class="label head-link"
      @click.native="trackRankingSort('dau')">{{ $t('users24h') }}</nuxt-link>
    <span 
      v-else 
      class="label">{{ $t('users24h') }}</span>
    <Help 
      :bottom="true"
      :text="$t('users24hHelp')"/>
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
