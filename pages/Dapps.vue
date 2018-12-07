<template>
  <LayoutMain>
    <div>
      <DappsSearch/>
      <div class="dapps-filters">
        <div class="filters">
          <DappsFilters/>
        </div>
        <div
          ref="list"
          class="results">
          <div class="count-sort">
            <div class="count">
              <DappsResultCount
                :end="pager.offset + pager.limit"
                :start="pager.offset + 1"
                :total="pager.totalCount"/>
            </div>
            <div class="sort">
              <DappsSort/>
            </div>
          </div>
          <div class="dapp-wrapper">
            <DappCardList
              :dapps="dapps"
              :optional-attribute="optionalCardAttribute"/>
          </div>
          <p 
            v-if="isLoading" 
            class="loader-wrapper"><button class="loader"/></p>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDapps } from '~/helpers/api'
import DappCardList from '~/components/DappCardList'
import DappsFilters from '~/components/DappsFilters'
import DappsLoadMore from '~/components/DappsLoadMore.vue'
import DappsResultCount from '~/components/DappsResultCount.vue'
import DappsSearch from '~/components/DappsSearch.vue'
import DappsSort from '~/components/DappsSort'
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    DappsResultCount,
    DappCardList,
    DappsFilters,
    DappsLoadMore,
    DappsSearch,
    DappsSort,
    LayoutMain
  },
  data() {
    return {
      dapps: [],
      isLoading: false,
      pager: {
        limit: 0,
        offset: 0,
        totalCount: 0
      }
    }
  },
  computed: {
    ...mapGetters(['statDappCount']),
    optionalCardAttribute() {
      return this.$route.query.tab || ''
    }
  },
  async asyncData({ params, query, app }) {
    const urlParams = { ...params, ...query }
    if (!query.tab) {
      urlParams.tab = 'hot'
    }
    const data = await getDapps(app.$axios, urlParams)
    const dapps = data.items
    const pager = data.pager
    return { dapps, pager }
  },
  watch: {
    $route() {
      this.fetchDapps()
    }
  },
  methods: {
    async fetchDapps() {
      this.resetData()
      this.isLoading = true
      const urlParams = { ...this.$route.params, ...this.$route.query }
      if (!this.$route.query.tab) {
        urlParams.tab = 'hot'
      }
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
    }
  },
  head() {
    return {
      title:
        'State of the ÐApps — ' +
        this.statDappCount.toLocaleString() +
        ' Projects Built on Ethereum, EOS & POA'
    }
  },
  scrollToTop: true
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.count-sort {
  @include tweakpoint('min-width', 600px) {
    display: flex;
    align-items: center;
  }
}

.dapps-filters {
  @include margin-wrapper-main;
  @include tweakpoint('min-width', 1200px) {
    display: flex;
  }
}

.filters {
  padding-top: 25px;
  @include tweakpoint('min-width', 1200px) {
    margin-right: 22px;
    width: 225px;
  }
}

.count {
  flex: 1;
}

.loader-wrapper {
  padding-top: 25px;
}

.results {
  flex: 1;
}

.sort {
  padding-top: 15px;
}
</style>
