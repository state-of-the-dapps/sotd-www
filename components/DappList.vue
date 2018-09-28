<template>
  <div class="component-DappList" id="component-DappList">
    <ul class="category-list">
      <li class="category-item"><nuxt-link :to="{name: 'rankings'}" class="category-link" :class="!category ? 'is-active' : ''">All categories</nuxt-link></li>
      <li v-for="(dappCategory, index) in dappCategories" :key="index">
        <nuxt-link @click.native="trackDappRankingCategory(dappCategory.slug)" :to="{path: '/rankings/category/' + dappCategory.slug}" class="category-link" :class="dappCategory.slug === category ? 'is-active' : ''">{{ dappCategory.name }}</nuxt-link>
      </li>
    </ul>
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
import { trackDappRankingCategory, trackDappRankingSort } from '~/helpers/mixpanel'
import { getCategories } from '~/helpers/api'
import DappListHeadings from './DappListHeadings'
import DappListItem from './DappListItem'
import LoadMore from './LoadMore'

export default {
  data () {
    return {
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
      'sort',
      'total'
    ])
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
      'setSort'
    ]),
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
    }
  },
  async mounted () {
    this.dappCategories = await getCategories()
    if (this.category) {
      this.$router.replace({name: 'rankings-category', params: {category: this.category}})
    }
    if (this.dapps.length < 1) {
      this.setCategory(this.$route.params.category)
      this.fetchDapps()
    }
  },
  watch: {
    '$route' (to, from) {
      this.setCategory(this.$route.params.category)
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
