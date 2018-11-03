<template>
  <div class="component-ranking-table">
    <div class="wrapper">
      <div class="table">
        <div class="table-header">
          <div class="table-row">
            <div class="table-head col-rank">
              <RankingTableRankHead :sort="true"/>
            </div>
            <media :query="{minWidth: tweakpoint + 1}">
              <div class="table-head col-name">
                <RankingTableNameHead/>
              </div>
            </media>
            <media :query="{minWidth: tweakpoint + 1}">
              <div class="table-head col-platform">
                <RankingTableCategoryHead/>
              </div>
            </media>
            <media :query="{minWidth: tweakpoint + 1}">
              <div class="table-head col-platform">
                <RankingTablePlatformHead/>
              </div>
            </media>
            <div class="table-head col-dau">
              <RankingTableDauHead :sort="true"/>
            </div>
            <div class="table-head col-vol">
              <RankingTableVolumeHead :sort="true"/>
            </div>
            <div class="table-head col-dev">
              <RankingTableDevHead :sort="true"/>
            </div>
            <media :query="{minWidth: tweakpoint + 1}">
              <div class="table-head col-usage">
                <RankingTableUsageHead/>
              </div>  
            </media>   
          </div>
        </div>
        <div class="table-body">
          <p 
            v-if="isLoading"
            class="loader-wrapper">
            <button class="loader"></button>
          </p>
          <p
            v-if="!isLoading && !dapps.length"
            class="no-results">
            There are currently no ÐApps for this category and platform
          </p>
          <template
            v-for="(dapp, index) in dapps"
            class="table-row">
            <div
              v-if="dapp.rank"
              :key="index"
              class="table-row">
              <div class="table-data col-rank">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTableRankHead/>
                </media>
                <RankingTableRank :rank="dapp.rank"/>
              </div>
              <div class="table-data col-name">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTableNameHead/>
                </media>
                <RankingTableName
                  :icon-url="dapp.iconUrl"
                  :name="dapp.name"
                  :slug="dapp.slug"
                  :teaser="dapp.teaser"/>
              </div>
              <div class="table-data col-category">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTableCategoryHead/>
                </media>
                <RankingTableCategory
                  :category="dapp.categories[0] || ''"/>
              </div>
              <div class="table-data col-platform">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTablePlatformHead/>
                </media>
                <RankingTablePlatform
                  :platform="dapp.platform"/>
              </div>
              <div class="table-data col-dau">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTableDauHead/>
                </media>
                <RankingTableValuePct
                  :value="dapp.stats.dau"
                  :value_pct="dapp.stats.dau_pct"/>
              </div>
              <div class="table-data col-vol">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTableVolumeHead/>
                </media>
                <RankingTableVolume
                  :stats="dapp.stats"
                  :platform="dapp.platform"/>
              </div>
              <div class="table-data col-dev">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTableDevHead/>
                </media>
                <RankingTableValuePct
                  :value="dapp.stats.dev_30d"
                  :value_pct="dapp.stats.dev_30d_pct"/> 
              </div>
              <div class="table-data col-usage">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTableUsageHead/>
                </media>
                <RankingTableTrend :users="dapp.sparklines.users"/>
              </div>          
            </div>
          </template>
        </div>
      </div>
      <BasePager
        v-if="!isLoading"
        :limit="pager.limit"
        :offset="pager.offset"
        :totalCount="pager.totalCount"
        @selectPage="selectPage"/>
    </div>
  </div>
</template>

<script>
import { trackDappRankingPage } from '~/helpers/mixpanel'
import BasePager from './BasePager'
import Help from './Help'
import Media from 'vue-media'
import RankingTableCategory from './RankingTableCategory'
import RankingTableCategoryHead from './RankingTableCategoryHead'
import RankingTableDauHead from './RankingTableDauHead'
import RankingTableDevHead from './RankingTableDevHead'
import RankingTableName from './RankingTableName'
import RankingTableNameHead from './RankingTableNameHead'
import RankingTablePlatform from './RankingTablePlatform'
import RankingTablePlatformHead from './RankingTablePlatformHead'
import RankingTableProfile from './RankingTableProfile'
import RankingTableProfileHead from './RankingTableProfileHead'
import RankingTableRank from './RankingTableRank'
import RankingTableRankHead from './RankingTableRankHead'
import RankingTableTrend from './RankingTableTrend'
import RankingTableUsageHead from './RankingTableUsageHead'
import RankingTableValuePct from './RankingTableValuePct'
import RankingTableVolume from './RankingTableVolume'
import RankingTableVolumeHead from './RankingTableVolumeHead'

export default {
  components: {
    BasePager,
    Help,
    Media,
    RankingTableCategory,
    RankingTableCategoryHead,
    RankingTableDauHead,
    RankingTableDevHead,
    RankingTableName,
    RankingTableNameHead,
    RankingTablePlatform,
    RankingTablePlatformHead,
    RankingTableProfile,
    RankingTableProfileHead,
    RankingTableRank,
    RankingTableRankHead,
    RankingTableTrend,
    RankingTableUsageHead,
    RankingTableValuePct,
    RankingTableVolume,
    RankingTableVolumeHead
  },
  props: {
    dapps: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    pager: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweakpoint: 1099
    }
  },
  methods: {
    selectPage (page) {
      const oldPage = this.$route.query.page || 1
      this.trackRankingPage(oldPage, page)
      this.$router.push({query: {...this.$route.query, page: page}})
    },
    trackRankingPage (oldPage, targetPage) {
      const action = trackDappRankingPage(oldPage, targetPage)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.table-head {
  padding: 10px 0;
  margin: 5px 0;
  text-align: center;
  @include tweakpoint('min-width', 1100px) {
    padding: 0;
    margin: 0;
    text-align: initial;
  }
}

.col-category {
  @include tweakpoint('min-width', 1100px) {
    width: 100px;
    text-align: right;
    padding: 0 10px;
  }
}

.col-dau {
  @include tweakpoint('min-width', 1100px) {
    width: 130px;
    text-align: right;
    padding: 0 10px;
  }
}

.col-dev {
  @include tweakpoint('min-width', 1100px) {
    width: 120px;
    text-align: right;
    padding: 0 10px;
  }
}

.col-mau {
  @include tweakpoint('min-width', 1100px) {
    width: 130px;
    text-align: right;
    padding: 0 10px;
  }
}

.col-name {
  @include tweakpoint('min-width', 1100px) {
    flex: 1;
  }
}

.col-platform {
  @include tweakpoint('min-width', 1100px) {
    width: 100px;
    text-align: right;
    padding: 0 10px;
  }
}

.col-profile {
  @include tweakpoint('min-width', 1100px) {
    width: 85px;
    text-align: right;
    padding: 0 10px;
  }
}

.col-rank {
  @include tweakpoint('min-width', 1100px) {
    width: 50px;
    margin-right: 15px;
  }
}

.col-usage {
  width: 180px;
  @include tweakpoint('min-width', 1100px) {
    padding: 0 10px;
  }
}

.col-vol {
  @include tweakpoint('min-width', 1100px) {
    width: 130px;
    text-align: right;
    padding: 0 10px;
  }
}

.loader-wrapper {
  margin: 0 auto;
  padding: 15px 0;
}

.no-results {
  padding: 50px 0;
  font-size: 1.25rem;
  text-align: center;
  font-weight: 700;
  color: darken($color--gray, 40%);
}

.table-header {
  margin: 0 -10px;
  padding: 15px 10px;
  background: $color--gray;
  @include tweakpoint('min-width', 1100px) {
    position: sticky;
    top: 0;
  }
  .table-row {
    box-shadow: none;
    border-radius: 0;
    background: $color--gray;
    margin-bottom: 0;
  }
}

.table-row {
  background: $color--white;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba($color--black, .1);
  margin-bottom: 6px;
  @include tweakpoint('min-width', 1100px) {
    display: flex;
    align-items: center;
  }
}

.wrapper {
  padding: 0 10px;
  max-width: 1200px;
  margin: 0 auto;
}

/deep/ .head-link {
  background: $color--white;
  border-radius: 3px;
  padding: 5px;
  border: 1px solid darken($color--gray, 10%);
  text-decoration: none;
  &.is-active {
    font-weight: 700;
    border-color: $color--black;
    background: $color--black;
    color: $color--white;
  }
  @include tweakpoint('min-width', 1100px) {
    border-radius: 0;
    border: none;
    border-bottom: 1px solid $color--black;
    background: transparent;
    padding: 0;
    &.is-active {
      background: transparent;
      color: $color--black;
    }
  }
}
</style>
