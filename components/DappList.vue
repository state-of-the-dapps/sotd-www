<template>
  <div class="component-DappList">
    <div class="wrapper">
      <DappListHeadings :fields="fields"/>
      <div v-if="dapps.length">
        <DappListItem v-for="(dapp, index) in dapps" :key="index"
        :dapp="dapp"/>
      </div>
      <LoadMore
        @loadMore="loadMore"
        :dapps="dapps"
        :isLoading="isLoading"
        :limit="limit"
        :offset="offset"
        :total="total"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DappListHeadings from './DappListHeadings'
import DappListItem from './DappListItem'
import LoadMore from './LoadMore'

export default {
  data () {
    return {
      fields: [
        {
          help: 'The default rank is sorted by DAU (Daily Active Users)',
          id: 'rank',
          sort: true,
          title: 'Rank'
        },
        {
          id: 'dapp',
          sort: true,
          title: 'ÐApp'
        },
        {
          id: 'tagline'
        },
        {
          id: 'category',
          title: 'Category'
        },
        {
          help: 'Daily Active Users (unique contract addresses from ÐApp transactions)',
          id: 'dau',
          sort: true,
          title: 'DAU'
        },
        {
          help: 'Monthly Active Users (unique contract addresses from ÐApp transactions)',
          id: 'mau',
          title: 'MAU'
        },
        {
          help: '7 day ÐApp transaction volume',
          id: 'vol_7d',
          sort: true,
          title: 'Volume (7d)'
        }
      ],
      sourcePath: this.$route.path
    }
  },
  components: {
    DappListHeadings,
    DappListItem,
    LoadMore
  },
  computed: {
    ...mapGetters('dapps/rankings', [
      'dapps',
      'isLoading',
      'limit',
      'offset',
      'total'
    ])
  },
  methods: {
    loadMore () {
      this.incrementOffset()
      this.fetchDapps('append')
      this.$mixpanel.track('DApps - Load more', { offset: this.offset, sourcePath: this.sourcePath })
    },
    ...mapActions('dapps/rankings', [
      'fetchDapps',
      'incrementOffset'
    ])
  },
  mounted () {
    if (this.dapps.length < 1) {
      this.fetchDapps()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappList {
  @include margin-wrapper-main;
}

.loader-wrapper {
  margin: 25px auto;
}

.wrapper {
  background: rgba($color--white, .5);
  box-shadow: 0 10px 30px rgba($color--black, .175);
  border-radius: 4px;
  padding: 20px;
  max-width: 1500px;
  margin: 0 auto;
}
</style>
