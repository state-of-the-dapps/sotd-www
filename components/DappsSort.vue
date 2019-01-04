<template>
  <div class="component-dapps-sort">
    <BaseDropdown
      :options="sortOptions"
      :selected="formattedSortQuery"
      :name="$t(namespace('sortBy'))"
      :title="$t(namespace('sortBy'))"
      theme="inline right"
      @select="selectSort"/>
  </div>
</template>

<script>
import { trackDappsSort } from '~/helpers/mixpanel'
import { dappSortOptions, dappSortOptionsMap } from '~/helpers/constants'
import BaseDropdown from './BaseDropdown'

export default {
  components: {
    BaseDropdown
  },
  data() {
    return {
      sortOptions: dappSortOptions
    }
  },
  computed: {
    sortQuery() {
      return this.$route.query.tab || 'hot'
    },
    formattedSortQuery() {
      return dappSortOptionsMap[this.sortQuery]
    }
  },
  methods: {
    selectSort(selected) {
      let routeName = 'dapps'
      if (this.$route.params.platform) {
        routeName += '-platform'
      }
      if (this.$route.params.category) {
        routeName += '-category'
      }
      this.$router.push(
        this.localePath({
          name: routeName,
          params: { ...this.$route.params },
          query: {
            ...this.$route.query,
            tab: selected || undefined,
            page: 1
          }
        })
      )
      this.trackSort(selected)
    },
    trackSort(sort) {
      const action = trackDappsSort(sort)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>
