<template>
  <div class="page">
    <style>
      #cf {
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 30px !important;
      }
      @media screen and (min-width: 640px) {
      #cf {
      margin: 0px 22px;
      }
      }
      @media screen and (min-width: 1200px) {
      #cf {
      margin: 0 auto;
      width: calc(100% - 44px);
      max-width: 1200px;
      }
      }
      .cf-wrapper {
      margin-top: 0 !important;
      background: #f8f8f8;
      font-family: 'Overpass', sans-serif !important;
      margin-bottom: 24px !important;
      }
    </style>
    <div id="codefund" />
    <CategoryPlatformFilters base-route="rankings"/>
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
import { platformMap, rankingColumns } from '~/helpers/constants'
import { getDapps } from '~/helpers/api'
import CategoryPlatformFilters from '~/components/CategoryPlatformFilters'
import RankingTable from '~/components/RankingTable'

export default {
  components: {
    CategoryPlatformFilters,
    RankingTable
  },
  data() {
    return {
      dapps: [],
      isLoading: false,
      pager: {},
      selectedColumn: rankingColumns[0]
    }
  },
  async asyncData({ params, query, app }) {
    const urlParams = { ...params, ...query }
    if (!query.sort) {
      urlParams.sort = 'rank'
      urlParams.order = 'asc'
    }
    let dapps = []
    let pager
    urlParams.view = 'rankings'
    try {
      const data = await getDapps(app.$axios, urlParams, app.$sentry)
      dapps = data.items
      pager = data.pager
    } catch (e) {
      this.$sentry.captureException(e)
    } finally {
      return { dapps, pager }
    }
  },
  computed: {
    columnOptions() {
      const options = rankingColumns.map(x => {
        const optionObj = {
          text: this.$t(`rankingColumns.${x.selection}`),
          selection: x.selection
        }
        return optionObj
      })
      return options
    }
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
      let dapps = []
      let pager
      try {
        const data = await getDapps(this.$axios, urlParams)
        dapps = data.items
        pager = data.pager
      } catch (e) {
        this.$sentry.captureException(e)
      } finally {
        this.isLoading = false
        this.dapps = dapps
        this.pager = pager
      }
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
        let routeName = 'rankings'
        if (this.$route.params.platform) {
          routeName += '-platform'
        }
        if (this.$route.params.category) {
          routeName += '-category'
        }
        this.$router
          .push(
            this.localePath({
              name: routeName,
              params: { ...this.$route.params },
              query: {
                sort: selectedColumn.selection,
                order: selectedColumn.order
              }
            })
          )
          .catch(err => {})
      }
    }
  },
  head() {
    const platforms = platformMap()
    let title = 'State of the DApps — Ranking the Best '
    title += this.$route.params.platform
      ? platforms[this.$route.params.platform] + ' '
      : 'Ethereum, EOS & Steem '
    title += this.$route.params.category
      ? this.$options.filters.capitalize(this.$route.params.category) + ' '
      : 'DApps'
    return {
      title,
      script: [
        {
          src:
            'https://codefund.app/properties/232/funder.js?template=horizontal&theme=horizontal',
          async: true
        }
      ]
    }
  },
  scrollToTop: true
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 25px;
  padding-bottom: 50px;
}
</style>
