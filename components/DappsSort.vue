<template>
  <div class="component-dapps-sort">
    <BaseDropdown
      :options="sortOptions"
      :selected="formattedSortQuery"
      title="Sort by"
      @select="selectSort"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    ...mapGetters('dapps/search', {
      sortQuery: 'tabQuery'
    }),
    formattedSortQuery() {
      return dappSortOptionsMap[this.sortQuery]
    }
  },
  methods: {
    ...mapActions('dapps/search', {
      setSortQuery: 'setTabQuery',
      fetchItems: 'fetchItems'
    }),
    selectSort(selected) {
      this.setSortQuery(selected)
      this.fetchItems()
    }
  }
}
</script>
