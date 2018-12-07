<template>
  <LayoutMain>
    <div>
      <Search/>
      <div class="dapps-filters">
        <div class="filters">
          <DappsFilters/>
        </div>
        <div class="results">
          <div class="count-sort">
            <div class="count">
              <CountRefine/>
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
          <Pager/>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import CountRefine from '~/components/dapps/search/CountRefine.vue'
import Collections from '~/components/dapps/search/Collections.vue'
import DappCardList from '~/components/DappCardList'
import DappsFilters from '~/components/DappsFilters'
import DappsSort from '~/components/DappsSort'
import LayoutMain from '~/components/LayoutMain'
import Pager from '~/components/dapps/search/Pager.vue'
import Search from '~/components/dapps/search/Search.vue'

export default {
  components: {
    Collections,
    CountRefine,
    DappCardList,
    DappsFilters,
    DappsSort,
    LayoutMain,
    Pager,
    Search
  },
  computed: {
    dapps() {
      return this.$store.getters['dapps/search/items']
    },
    dappCount() {
      return this.$store.getters['dapps/search/itemCount']
    },
    optionalCardAttribute() {
      return this.tabQuery || ''
    },
    tabQuery() {
      return this.$store.getters['dapps/search/tabQuery']
    },
    statDappCount() {
      return this.$store.getters['statDappCount']
    },
    tagQuery() {
      return this.$store.getters['dapps/search/tagQuery']
    }
  },
  mounted() {
    this.$store.dispatch('setSiteSection', 'dapps')
    this.$store.dispatch('dapps/search/setFriendlyQuery', this.$route.params)
    if (this.dappCount < 1 || this.$route.query.q) {
      this.$store.dispatch('dapps/search/fetchItems')
    }
    this.$router.replace({ query: {} })
  },
  head() {
    return {
      title:
        'State of the ÐApps — ' +
        this.statDappCount.toLocaleString() +
        ' Projects Built on Ethereum, EOS & POA'
    }
  }
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

.results {
  flex: 1;
}

.sort {
  padding-top: 15px;
}
</style>
