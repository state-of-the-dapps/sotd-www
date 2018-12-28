<template>
  <div class="page-rankings">
    <RankingFilters/>
    <div ref="table">
      <RankingTable
        :dapps="dapps"
        :is-loading="isLoading"
        :pager="pager"
        :column-options="columnOptions"
        :selected-column="selectedColumn"
        @selectColumn="selectColumn"/>
    </div>
  </div>
</template>

<script>
import { rankingColumns } from '~/helpers/constants'
import { getDapps } from '~/helpers/api'
import RankingFilters from '~/components/RankingFilters'
import RankingTable from '~/components/RankingTable'

export default {
  components: {
    RankingFilters,
    RankingTable
  },
  data() {
    return {
      dapps: [],
      isLoading: false,
      pager: {
        limit: 0,
        offset: 0,
        totalCount: 0
      },
      columnOptions: rankingColumns,
      selectedColumn: rankingColumns[0]
    }
  },
  async asyncData({ params, query, app }) {
    const urlParams = { ...params, ...query }
    if (!query.sort) {
      urlParams.sort = 'rank'
      urlParams.order = 'asc'
    }
    urlParams.view = 'rankings'
    const data = await getDapps(app.$axios, urlParams)
    const dapps = data.items
    const pager = data.pager
    return { dapps, pager }
  },
  watch: {
    '$route.query'() {
      this.$refs.table.scrollIntoView()
      this.fetchDapps()
    }
  },
  methods: {
    async fetchDapps() {
      this.resetData()
      this.isLoading = true
      const urlParams = { ...this.$route.params, ...this.$route.query }
      if (!this.$route.query.sort) {
        urlParams.sort = 'rank'
        urlParams.order = 'asc'
      }
      urlParams.view = 'rankings'
      const data = await getDapps(this.$axios, urlParams)
      this.isLoading = false
      const dapps = data.items
      const pager = data.pager
      this.dapps = dapps
      this.pager = pager
    },
    resetData() {
      this.dapps = []
      this.pager = {
        limit: 0,
        offset: 0,
        totalCount: 0
      }
    },
    selectColumn(column) {
      let columnsObj = {}
      rankingColumns.map(x => {
        columnsObj[x.selection] = {
          selection: x.selection,
          text: x.text,
          sort: x.sort,
          order: x.order
        }
      })
      const selectedColumn = columnsObj[column]
      this.selectedColumn = selectedColumn
      if (typeof selectedColumn !== 'undefined' && selectedColumn.sort) {
        this.$router.push(
          this.localePath({
            name: 'rankings',
            query: {
              sort: selectedColumn.selection,
              order: selectedColumn.order
            }
          })
        )
      }
    }
  },
  head() {
    return {
      title:
        'State of the ÐApps — Ranking the Best ÐApps of Ethereum, EOS, POA & Steem'
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
