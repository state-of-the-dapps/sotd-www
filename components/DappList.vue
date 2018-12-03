<template>
  <div 
    id="component-DappList" 
    class="component-DappList">
    <div class="filter-wrapper">
      <BaseDropdown
        :important="true"
        :options="categoryOptions"
        :selected="category"
        all-text="All categories"
        name="Category"
        title="Choose a category"
        @select="filterCategory"/>
      <BaseDropdown
        :options="platformOptions"
        :selected="platform"
        all-text="All platforms"
        name="Platform"
        title="Choose a platform"
        @select="filterPlatform"/>
    </div> 
    <div class="wrapper">
      <div class="wrapper-2">
        <div class="wrapper-3">
          <DappListHeadings
            :fields="fields"
            :order="order"
            :sort="sort"
            @sortDapps="sortDapps"/>
          <ul v-if="dapps.length">
            <DappListItem 
              v-for="(dapp, index) in dapps" 
              :key="index"
              :dapp="dapp"/>
          </ul>
        </div>
      </div>
      <LoadMore
        :dapps="dapps"
        :is-loading="isLoading"
        :limit="limit"
        :offset="offset"
        :total="total"
        @loadMore="loadMore"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  trackDappRankingCategory,
  trackDappRankingSort,
  trackDappRankingPlatform
} from '~/helpers/mixpanel'
import { platformList } from '~/helpers/constants'
import { getCategories } from '~/helpers/api'
import BaseDropdown from './BaseDropdown'
import DappListHeadings from './DappListHeadings'
import DappListItem from './DappListItem'
import LoadMore from './LoadMore'

export default {
  components: {
    BaseDropdown,
    DappListHeadings,
    DappListItem,
    LoadMore
  },
  data() {
    return {
      dappPlatforms: platformList,
      dappCategories: [],
      fields: [
        {
          help:
            'Rank is based on multiple factors including active users (unique source addresses in transactions to ÐApp contracts), transaction volume, developer activity, profile freshness and strength, CTRs, and user recommendations',
          id: 'rank',
          order: 'asc',
          title: 'Rank'
        },
        {
          id: 'dapp',
          title: 'ÐApp'
        },
        {
          id: 'tagline'
        },
        {
          id: 'profile',
          title: 'Profile',
          help: 'How complete the profile of the ÐApp is'
        },
        {
          help:
            'Daily Active Users, or DAU (unique source addresses in transactions to ÐApp contracts)',
          id: 'dau',
          order: 'desc',
          sort: true,
          title: 'Users (24hr)'
        },
        {
          help:
            'Monthly Active Users, or MAU (unique source addresses in transactions to ÐApp contracts)',
          id: 'mau',
          order: 'desc',
          title: 'Users (30d)'
        },
        {
          help: 'Transaction volume to ÐApp contracts',
          id: 'vol_7d',
          title: 'Vol (7d)'
        },
        {
          help:
            'The number of GitHub events that the project organization / repository generates. This includes code pushes, issues, pull requests, etc.',
          id: 'dev_30d',
          order: 'desc',
          sort: true,
          title: 'Dev (30d)'
        },
        {
          help:
            'Users (unique source addresses in transactions to ÐApp contracts) over the past 30 days',
          id: 'users_30d',
          title: 'Users (30d)'
        }
      ],
      sourcePath: this.$route.path
    }
  },
  computed: {
    ...mapGetters('dapps/rankings', [
      'category',
      'dapps',
      'isLoading',
      'limit',
      'offset',
      'order',
      'platform',
      'sort',
      'total'
    ]),
    categoryOptions() {
      const options = this.dappCategories.map(x => {
        const optionObj = {
          text: x.name,
          selection: x.slug
        }
        return optionObj
      })
      return options
    },
    platformOptions() {
      const options = this.dappPlatforms.map(x => {
        const optionObj = {
          text: x,
          selection: x.toLowerCase()
        }
        return optionObj
      })
      return options
    }
  },
  watch: {
    $route(to, from) {
      this.setCategory(this.$route.params.category)
      this.setPlatform(this.$route.params.platform)
      this.fetchDapps()
    }
  },
  async mounted() {
    this.dappCategories = await getCategories(this.$axios)
    if (!this.$route.query.reload) {
      if (this.category && this.platform) {
        this.$router.replace({
          name: 'rankings-platform-category',
          params: {
            category: this.category,
            platform: this.platform.toLowerCase()
          }
        })
      } else if (this.category) {
        this.$router.replace({
          name: 'rankings-category',
          params: { category: this.category }
        })
      } else if (this.platform) {
        this.$router.replace({
          name: 'rankings-platform',
          params: { platform: this.platform.toLowerCase() }
        })
      }
    } else {
      this.$router.replace({ query: {} })
    }
    if (this.dapps.length < 1) {
      this.setCategory(this.$route.params.category)
      this.setPlatform(this.$route.params.platform)
      this.fetchDapps()
    }
  },
  methods: {
    loadMore() {
      this.incrementOffset()
      this.fetchDapps('append')
      this.$mixpanel.track('DApps - Load more', {
        offset: this.offset,
        sourcePath: this.sourcePath
      })
    },
    ...mapActions('dapps/rankings', [
      'fetchDapps',
      'incrementOffset',
      'setCategory',
      'setPlatform',
      'setSort'
    ]),
    filterCategory(category) {
      this.trackDappRankingCategory(category)
      let path = '/rankings'
      if (this.platform) {
        path += `/platform/${this.platform.toLowerCase()}`
      }
      if (category) {
        path += `/category/${category.toLowerCase()}`
      }
      this.$router.push({ path })
    },
    filterPlatform(platform) {
      this.trackDappRankingPlatform(platform)
      let path = '/rankings'
      if (platform) {
        path += `/platform/${platform.toLowerCase()}`
      }
      if (this.category) {
        path += `/category/${this.category.toLowerCase()}`
      }
      this.$router.push({ path })
    },
    sortDapps(sortOptions) {
      this.setSort(sortOptions)
      this.fetchDapps()
      const action = trackDappRankingSort(this.order, this.sort)
      this.$mixpanel.track(action.name, action.data)
      document
        .getElementById('component-DappList')
        .scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    trackDappRankingCategory(category) {
      const sourceComponent = 'DappList'
      const action = trackDappRankingCategory(
        sourceComponent,
        this.sourcePath,
        category
      )
      this.$mixpanel.track(action.name, action.data)
    },
    trackDappRankingPlatform(platform) {
      const sourceComponent = 'DappList'
      const action = trackDappRankingPlatform(
        sourceComponent,
        this.sourcePath,
        platform
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.category-link {
  text-decoration: none;
  display: inline-block;
  padding: 7px 9px;
  margin: 3px;
  border-radius: 4px;
  background: lighten($color--white, 100%);
  box-shadow: 0 2px 15px rgba($color--black, 0.15);
  &.is-active {
    background: $color--black;
    color: $color--white;
  }
}

.category-list {
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.component-DappList {
  @include margin-wrapper-main;
}

.loader-wrapper {
  margin: 25px auto;
}

.filter-wrapper {
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  background: darken($color--white, 2.5%);
  box-shadow: 0 10px 30px rgba($color--black, 0.175);
  border-radius: 4px;
  padding: 0 20px;
  max-width: 1500px;
  margin: 0 auto;
}

.wrapper-2 {
  width: 100%;
  overflow: scroll;
}

.wrapper-3 {
  min-width: 1300px;
}
</style>
