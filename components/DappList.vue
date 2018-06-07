<template>
  <ul class="component-DappList">
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      <DappListItem v-for="(dapp, index) in dapps" :key="index"
      :dapp="dapp"/>
    </div>
  </ul>
</template>

<script>
import axios from '~/helpers/axios'
import { dappListDefaultLimit, dappListDefaultSortBy, dappListDefaultSortOrder } from '~/helpers/constants'
import DappListItem from './DappListItem'

export default {
  data () {
    return {
      dapps: [],
      isLoading: true,
      pager: {
        limit: dappListDefaultLimit,
        offset: 0,
        totalCount: 0
      },
      sort: {
        by: dappListDefaultSortBy,
        order: dappListDefaultSortOrder
      },
      status: ''
    }
  },
  components: {
    DappListItem
  },
  methods: {
    findDapps () {
      this.isLoading = true
      axios
        .get('dapps', {
          params: {
            limit: this.pager.limit,
            offset: this.pager.offset,
            order: this.sort.order,
            sort: this.sort.by,
            status: this.status
          }
        })
        .then(response => {
          const data = response.data
          this.dapps = data.items
          this.pager = data.pager
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.findDapps()
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappList {
  @include margin-wrapper-main;
}
</style>
