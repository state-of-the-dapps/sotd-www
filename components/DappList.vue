<template>
  <div class="component-DappList">
    <DappListHeadings :fields="fields"/>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      <DappListItem v-for="(dapp, index) in dapps" :key="index"
      :dapp="dapp"/>
    </div>
  </div>
</template>

<script>
import axios from '~/helpers/axios'
import { dappListDefaultLimit, dappListDefaultSortBy, dappListDefaultSortOrder } from '~/helpers/constants'
import DappListHeadings from './DappListHeadings'
import DappListItem from './DappListItem'

export default {
  data () {
    return {
      dapps: [],
      fields: [
        {
          help: 'The default rank is sorted by DAU (Daily Active Users)',
          id: 'rank',
          name: 'Rank',
          sort: true
        },
        {
          id: 'dapp',
          name: 'ÐApp',
          sort: true
        },
        {
          id: 'description',
          name: 'Description'
        },
        {
          filter: 'status',
          id: 'status',
          name: 'Status'
        },
        {
          help: 'Daily Active Users (unique contract addresses from ÐApp transactions)',
          id: 'dau',
          name: 'DAU',
          sort: true
        },
        {
          help: 'Monthly Active Users (unique contract addresses from ÐApp transactions)',
          id: 'mau',
          name: 'MAU',
          sort: true
        },
        {
          id: 'users_30d',
          name: 'Users (30 d)'
        },
        {
          help: '7 day ÐApp transaction volume',
          id: 'vol_7d',
          name: 'Volume (7d)',
          sort: true
        }
      ],
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
    DappListHeadings,
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
