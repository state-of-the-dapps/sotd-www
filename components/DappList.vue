<template>
  <div class="component-DappList" id="component-DappList">
    <DappListFilter
      :options="categoryOptions"
      :selected="category"
      all-text="All categories"
      title="Choose a category"
      @select="filterCategory"/>
    <DappListFilter
      :options="platformOptions"
      :selected="platform"
      all-text="All platforms"
      title="Choose a platform"
      @select="filterPlatform"/>   
    <div class="wrapper">
      <div class="wrapper-2">
        <div class="wrapper-3">
          <DappListHeadings
            :fields="fields"
            :order="order"
            :sort="sort"
            @sortDapps="sortDapps"/>
          <ul v-if="dapps.length">
            <DappListItem v-for="(dapp, index) in dapps" :key="index"
            :dapp="dapp"/>
          </ul>
          <LoadMore
            @loadMore="loadMore"
            :dapps="dapps"
            :isLoading="isLoading"
            :limit="limit"
            :offset="offset"
            :total="total"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { trackDappRankingCategory, trackDappRankingSort, trackDappRankingPlatform } from '~/helpers/mixpanel'
import { platformList } from '~/helpers/constants'
import { getCategories } from '~/helpers/api'
import DappListFilter from './DappListFilter'
import DappListHeadings from './DappListHeadings'
import DappListItem from './DappListItem'
import LoadMore from './LoadMore'

export default {
  data () {
    return {
      dappPlatforms: platformList,
      dappCategories: [],
      fields: [
        {
          help: 'The default rank is based on DAU, or Daily Active Users (unique source addresses in transactions to ÐApp contracts)',
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
          help: 'Daily Active Users, or DAU (unique source addresses in transactions to ÐApp contracts)',
          id: 'dau',
          order: 'desc',
          sort: true,
          title: 'Users (24hr)'
        },
        {
          help: 'Monthly Active Users, or MAU (unique source addresses in transactions to ÐApp contracts)',
          id: 'mau',
          order: 'desc',
          title: 'Users (30d)'
        },
        {
          help: 'Transaction volume to ÐApp contracts',
          id: 'vol_7d',
          order: 'desc',
          title: 'Vol (7d)'
        },
        {
          help: 'The number of GitHub events that the project organization / repository generates. This includes code pushes, issues, pull requests, etc.',
          id: 'dev_30d',
          order: 'desc',
          sort: true,
          title: 'Dev (30d)'
        },
        {
          help: 'Users (unique source addresses in transactions to ÐApp contracts) over the past 30 days',
          id: 'users_30d',
          title: 'Users (30d)'
        }
      ],
      sourcePath: this.$route.path
    }
  },
  components: {
    DappListFilter,
    DappListHeadings,
    DappListItem,
    LoadMore
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
    categoryOptions () {
      const options = this.dappCategories.map(x => {
        const optionObj = {
          text: x.name,
          selection: x.slug
        }
        return optionObj
      })
      return options
    },
    platformOptions () {
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
  methods: {
    loadMore () {
      this.incrementOffset()
      this.fetchDapps('append')
      this.$mixpanel.track('DApps - Load more', { offset: this.offset, sourcePath: this.sourcePath })
    },
    ...mapActions('dapps/rankings', [
      'fetchDapps',
      'incrementOffset',
      'setCategory',
      'setPlatform',
      'setSort'
    ]),
    filterCategory (category) {
      this.trackDappRankingCategory(category)
      let path = '/rankings'
      if (this.platform) {
        path += `/platform/${this.platform.toLowerCase()}`
      }
      if (category) {
        path += `/category/${category.toLowerCase()}`
      }
      this.$router.push({path})
    },
    filterPlatform (platform) {
      this.trackDappRankingPlatform(platform)
      let path = '/rankings'
      if (platform) {
        path += `/platform/${platform.toLowerCase()}`
      }
      if (this.category) {
        path += `/category/${this.category.toLowerCase()}`
      }
      this.$router.push({path})
    },
    sortDapps (sortOptions) {
      this.setSort(sortOptions)
      this.fetchDapps()
      const action = trackDappRankingSort(this.order, this.sort)
      this.$mixpanel.track(action.name, action.data)
      document.getElementById('component-DappList')
              .scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    trackDappRankingCategory (category) {
      const sourceComponent = 'DappList'
      const action = trackDappRankingCategory(sourceComponent, this.sourcePath, category)
      this.$mixpanel.track(action.name, action.data)
    },
    trackDappRankingPlatform (platform) {
      const sourceComponent = 'DappList'
      const action = trackDappRankingPlatform(sourceComponent, this.sourcePath, platform)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  async mounted () {
    this.dappCategories = await getCategories()
    if (this.category && this.platform) {
      this.$router.replace(
        {
          name: 'rankings-platform-category',
          params: {
            category: this.category,
            platform: this.platform
          }
        }
      )
    } else if (this.category) {
      this.$router.replace({name: 'rankings-category', params: {category: this.category}})
    } else if (this.platform) {
      this.$router.replace({name: 'rankings-platform', params: {platform: this.platform}})
    }
    if (this.dapps.length < 1) {
      this.setCategory(this.$route.params.category)
      this.setPlatform(this.$route.params.platform)
      this.fetchDapps()
    }
  },
  watch: {
    '$route' (to, from) {
      this.setCategory(this.$route.params.category)
      this.setPlatform(this.$route.params.platform)
      this.fetchDapps()
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
  box-shadow: 0 2px 15px rgba($color--black, .15);
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

.wrapper {
  background: darken($color--white, 2.5%);
  box-shadow: 0 10px 30px rgba($color--black, .175);
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
