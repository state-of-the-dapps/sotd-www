<template>
  <LayoutMain>
    <div class="page-rankings" ref="page">
      <RankingFilters/>
      <RankingTable
        :dapps="dapps"
        :pager="pager"/>
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
      dapps: []
    }
  },
  async asyncData ({ params, query }) {
    const urlParams = {...params, ...query}
    if (!query.sort) {
      urlParams.sort = 'rank'
      urlParams.order = 'asc'
    }
    const data = await getDapps(urlParams)
    const dapps = data.items
    const pager = data.pager
    return { dapps, pager }
  },
  methods: {
    async fetchDapps () {
      const urlParams = {...this.$route.params, ...this.$route.query}
      if (!this.$route.query.sort) {
        urlParams.sort = 'rank'
        urlParams.order = 'asc'
      }
      const data = await getDapps(urlParams)
      const dapps = data.items
      const pager = data.pager
      this.dapps = dapps
      this.pager = pager
    }
  },
  head () {
    return {
      title: 'State of the ÐApps — Ranking the Best ÐApps of Ethereum, EOS, and POA'
    }
  },
  watch: {
    '$route.query' () {
      this.$refs.page.scrollIntoView()
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
