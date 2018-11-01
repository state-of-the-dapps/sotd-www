<template>
  <LayoutMain>
    <div class="page-rankings">
      <RankingFilters/>
      <RankingTable :dapps="dapps"/>
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
    const dapps = await getDapps(urlParams)
    return { dapps }
  },
  methods: {
    async fetchDapps () {
      const urlParams = {...this.$route.params, ...this.$route.query}
      const dapps = await getDapps(urlParams)
      this.dapps = dapps
    }
  },
  head () {
    return {
      title: 'State of the ÐApps — Ranking the Best ÐApps of Ethereum, EOS, and POA'
    }
  },
  watch: {
    '$route.query' () {
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
