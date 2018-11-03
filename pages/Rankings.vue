<template>
  <LayoutMain>
    <div class="page-rankings">
      <RankingFilters/>
      <div ref="table">
        <RankingTable
          :dapps="dapps"
          :is-loading="isLoading"
          :pager="pager"/>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import { getDapps } from '~/helpers/api'
import LayoutMain from '~/components/LayoutMain'
import RankingFilters from '~/components/RankingFilters'
import RankingTable from '~/components/RankingTable'

export default {
  components: {
    LayoutMain,
    RankingFilters,
    RankingTable
  },
  data () {
    return {
      dapps: [],
      isLoading: true,
      pager: {
        limit: 0,
        offset: 0,
        totalCount: 0
      }
    }
  },
  mounted () {
    this.fetchDapps()
  },
  methods: {
    async fetchDapps () {
      this.resetData()
      this.isLoading = true
      const urlParams = {...this.$route.params, ...this.$route.query}
      if (!this.$route.query.sort) {
        urlParams.sort = 'rank'
        urlParams.order = 'asc'
      }
      const data = await getDapps(urlParams)
      this.isLoading = false
      const dapps = data.items
      const pager = data.pager
      this.dapps = dapps
      this.pager = pager
    },
    resetData () {
      this.dapps = []
      this.pager = {
        limit: 0,
        offset: 0,
        totalCount: 0
      }
    }
  },
  head () {
    return {
      title: 'State of the ÐApps — Ranking the Best ÐApps of Ethereum, EOS, and POA'
    }
  },
  watch: {
    '$route.query' () {
      this.$refs.table.scrollIntoView()
      this.fetchDapps()
    }
  },
  scrollToTop: true
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.page-rankings {
  padding-top: 25px;
  padding-bottom: 50px;
}
</style>
