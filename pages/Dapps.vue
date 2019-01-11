<template>
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
        <div
          v-if="!isLoading && pager.totalCount > 0"
          class="pager-wrapper">
          <BasePager
            :limit="pager.limit"
            :offset="pager.offset"
            :total-count="pager.totalCount"
            @selectPage="selectPage"/>
        </div>
        <p
          v-if="!isLoading && pager.totalCount === 0"
          class="no-results">{{ $t('Dapps.noResults') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDapps } from '~/helpers/api'
import { trackDappPager } from '~/helpers/mixpanel'
import BasePager from '~/components/BasePager'
import DappCardList from '~/components/DappCardList'
import DappsFilters from '~/components/DappsFilters'
import DappsResultCount from '~/components/DappsResultCount.vue'
import DappsSearch from '~/components/DappsSearch.vue'
import DappsSort from '~/components/DappsSort'

export default {
  components: {
    BasePager,
    DappsResultCount,
    DappCardList,
    DappsFilters,
    DappsSearch,
    DappsSort
  },
  data() {
    return {
      isLoading: false
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
    const data = await getDapps(app.$axios, urlParams, app.$sentry)
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
    },
    selectPage(page) {
      let routeName = 'dapps'
      if (this.$route.params.platform) {
        routeName += '-platform'
      }
      if (this.$route.params.category) {
        routeName += '-category'
      }
      const oldPage = this.$route.query.page || 1
      this.trackPager(oldPage, page)
      this.$refs.list.scrollIntoView()
      this.$router.push(
        this.localePath({
          name: routeName,
          params: { ...this.$route.params },
          query: { ...this.$route.query, page: page }
        })
      )
    },
    trackPager(oldPage, targetPage) {
      const action = trackDappPager(oldPage, targetPage)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  head() {
    return {
      title:
        'State of the ÐApps — ' +
        this.statDappCount.toLocaleString() +
        ' Projects Built on Ethereum, EOS, POA & Steem'
    }
  },
  scrollToTop: true
}
</script>

<style lang="scss" scoped>
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

.pager-wrapper {
  padding: 1rem 0 2rem;
}

.no-results {
  text-align: center;
  font-size: 1.3rem;
}

.results {
  flex: 1;
}

.sort {
  padding-top: 15px;
}
</style>
