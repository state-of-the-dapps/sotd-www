<template>
  <div class="component-dapps-sort">
    <BaseDropdown
      :options="sortOptions"
      :selected="formattedSortQuery"
      name="Sort by"
      title="Sort by"
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
      this.$router.push({
        query: {
          ...this.$route.query,
          tab: selected,
          page: 1
        }
      })
      this.trackSort(selected)
    },
    trackSort(sort) {
      const action = trackDappsSort(sort)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>
