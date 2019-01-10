<template>
  <div class="component-ranking-table">
    <div class="wrapper">
      <div class="table">
        <div class="table-header">
          <div class="table-row">
            <div class="table-head col-rank">
              <RankingTableRankHead :sort="true"/>
            </div>
            <div class="table-head col-name">
              <RankingTableNameHead/>
            </div>
            <media :query="{minWidth: tweakpoint}">
              <div class="table-head col-platform">
                <RankingTablePlatformHead/>
              </div>
            </media>
            <media :query="{minWidth: tweakpoint}">
              <div class="table-head col-category">
                <RankingTableCategoryHead/>
              </div>
            </media>
            <media :query="{minWidth: tweakpoint}">
              <div class="table-head col-dau">
                <RankingTableDauHead :sort="true"/>
              </div>
            </media>
            <media :query="{minWidth: tweakpoint}">
              <div class="table-head col-vol">
                <RankingTableVolumeHead :sort="true"/>
              </div>
            </media>
            <media :query="{minWidth: tweakpoint}">
              <div class="table-head col-dev">
                <RankingTableDevHead :sort="true"/>
              </div>
            </media>
            <media :query="{minWidth: tweakpoint}">
              <div class="table-head col-usage">
                <RankingTableUsageHead/>
              </div>  
            </media>
            <media :query="{maxWidth: tweakpoint - 1}">
              <div class="table-head col-variable">
                <BaseDropdown
                  :options="columnOptions"
                  :selected="selectedColumn.text"
                  title="Choose a column"
                  theme="inline"
                  @select="selectColumn"/>
              </div>
            </media>
          </div>
        </div>
        <div class="table-body">
          <p
            v-if="isLoading"
            class="loader-wrapper">
            <button class="loader"/>
          </p>
          <p
            v-if="!isLoading && !dapps.length"
            class="no-results">
            {{ $t(namespace('noDapps')) }}
          </p>
          <template
            v-for="(dapp, index) in dapps"
            class="table-row">
            <div
              v-if="dapp.rank"
              :key="index"
              class="table-row">
              <media :query="{minWidth: tweakpoint}">
                <div class="table-data col-rank">
                  <RankingTableRank
                    :rank="dapp.rank"
                    :rank-delta="dapp.rankDelta"/>
                </div>
              </media>
              <div class="table-data col-name">
                <RankingTableName
                  :icon-small-url="dapp.iconSmallUrl"
                  :name="dapp.name"
                  :rank="dapp.rank"
                  :rank-delta="dapp.rankDelta"
                  :selected-column="selectedColumn"
                  :slug="dapp.slug"
                  :teaser="dapp.teaser"/>
              </div>
              <media :query="{minWidth: tweakpoint}">
                <div class="table-data col-platform">
                  <RankingTablePlatform
                    :platform="dapp.platform"/>
                </div>
              </media>
              <media :query="{minWidth: tweakpoint}">
                <div class="table-data col-category">
                  <RankingTableCategory
                    :category="dapp.categories[0] || ''"/>
                </div>
              </media>
              <media :query="{minWidth: tweakpoint}">
                <div class="table-data col-dau">
                  <RankingTableValuePct
                    :value="dapp.stats.dau"
                    :value_pct="dapp.stats.dau_pct"/>
                </div>
              </media>
              <media :query="{minWidth: tweakpoint}">
                <div class="table-data col-vol">
                  <RankingTableVolume
                    :stats="dapp.stats"
                    :platform="dapp.platform"/>
                </div>
              </media>
              <media :query="{minWidth: tweakpoint}">
                <div class="table-data col-dev">
                  <RankingTableValuePct
                    :value="dapp.stats.dev_30d"
                    :value_pct="dapp.stats.dev_30d_pct"/> 
                </div>
              </media>
              <media :query="{minWidth: tweakpoint}">
                <div class="table-data col-usage">
                  <RankingTableTrend :users="dapp.sparklines.users"/>
                </div>
              </media>
              <media :query="{maxWidth: tweakpoint - 1}">
                <div class="table-data col-variable">
                  <span
                    v-if="selectedColumn.selection === 'rank'"
                    class="rank">{{ dapp.rank }}<template v-if="dapp.rankDelta !== 0">
                      <br>
                      <BaseDelta 
                        :value="dapp.rankDelta"
                        :null-text="$t('new')"/>
                    </template>
                  </span>
                  <RankingTablePlatform
                    v-if="selectedColumn.selection === 'platform'"
                    :platform="dapp.platform"/>
                  <RankingTableCategory
                    v-if="selectedColumn.selection === 'category'"
                    :category="dapp.categories[0] || ''"/>
                  <RankingTableValuePct
                    v-if="selectedColumn.selection === 'dau'"
                    :value="dapp.stats.dau"
                    :value_pct="dapp.stats.dau_pct"/>
                  <RankingTableVolume
                    v-if="selectedColumn.selection === 'usd_value_7d'"
                    :stats="dapp.stats"
                    :platform="dapp.platform"/>
                  <RankingTableValuePct
                    v-if="selectedColumn.selection === 'dev_30d'"
                    :value="dapp.stats.dev_30d"
                    :value_pct="dapp.stats.dev_30d_pct"/> 
                  <RankingTableTrend 
                    v-if="selectedColumn.selection === 'user_activity_30d'"
                    :users="dapp.sparklines.users"/>
                  <div v-if="selectedColumn.selection === 'description'">
                    {{ dapp.teaser }}
                  </div>
                </div>
              </media>
            </div>
          </template>
        </div>
      </div>
      <BasePager
        v-if="!isLoading"
        :limit="pager.limit"
        :offset="pager.offset"
        :total-count="pager.totalCount"
        @selectPage="selectPage"/>
    </div>
  </div>
</template>

<script>
import { trackDappRankingPager } from '~/helpers/mixpanel'
import BaseDelta from './BaseDelta'
import BaseDropdown from './BaseDropdown'
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
    BaseDelta,
    BaseDropdown,
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
      required: true,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      required: true
      // TODO default value
    },
    pager: {
      type: Object,
      required: true
      // TODO default value
    },
    columnOptions: {
      type: Array,
      required: true
      // TODO default value
    },
    selectedColumn: {
      type: Object,
      required: true,
      default: () => ({
        text: '',
        selection: ''
      })
    }
  },
  data() {
    return {
      tweakpoint: 1099
    }
  },
  methods: {
    selectColumn(column) {
      this.$emit('selectColumn', column)
      this.$mixpanel.track('Select ranking column', {
        column,
        platform: this.$route.params.platform || 'all',
        category: this.$route.params.category || 'all'
      })
    },
    selectPage(page) {
      let routeName = 'rankings'
      if (this.$route.params.platform) {
        routeName += '-platform'
      }
      if (this.$route.params.category) {
        routeName += '-category'
      }
      const oldPage = this.$route.query.page || 1
      this.trackRankingPage(oldPage, page)
      this.$router.push(
        this.localePath({
          name: routeName,
          params: { ...this.$route.params },
          query: { ...this.$route.query, page: page }
        })
      )
    },
    trackRankingPage(oldPage, targetPage) {
      const action = trackDappRankingPager(oldPage, targetPage)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.component-base-pager {
  max-width: 1200px;
  margin: 0 auto;
}

.table {
  display: block;
  max-width: 1200px;
  margin: 0 auto;
}

.table-data {
  margin: 0;
  text-align: inherit;
}

.table-head {
  padding: 0;
  margin: 0;
  text-align: initial;
}

.col-category {
  width: 100px;
  padding: 0 10px;
}

.col-dau {
  width: 130px;
  text-align: right;
  padding: 0 10px;
}

.col-dev {
  width: 160px;
  text-align: right;
  padding: 0 10px;
}

.col-mau {
  width: 130px;
  text-align: right;
  padding: 0 10px;
}

.col-name {
  flex: 1;
}

.col-platform {
  width: 100px;
  padding: 0 10px;
}

.col-profile {
  width: 85px;
  text-align: right;
  padding: 0 10px;
}

.col-rank {
  width: 50px;
  margin-right: 15px;
  align-self: stretch;
}

.col-usage {
  width: 180px;
  padding: 0 10px;
  text-align: right;
}

.col-vol {
  width: 160px;
  text-align: right;
  padding: 0 10px;
}

.col-variable {
  max-width: 160px;
  // padding: 5px 0;
  margin: 0 15px;
  &.table-data {
    text-align: right;
    padding: 5px 0;
  }
  &.table-head {
    width: 160px;
    margin-right: 0;
  }
}

.loader-wrapper {
  margin: 0 auto;
  padding: 15px 0;
}

.narrow-head {
  text-align: center;
  border-top: 1px solid $color--gray;
  font-weight: 600;
  padding: 10px 0 5px 0;
  margin: 20px 0 10px;
}

.no-results {
  padding: 50px 0;
  font-size: 1.25rem;
  text-align: center;
  font-weight: 700;
  color: darken($color--gray, 40%);
}

.rank {
  display: inline-block;
  background: $color--gray;
  width: 50px;
  text-align: center;
  border-radius: 4px;
  padding: 7px 3px;
  font-weight: 600;
  font-size: 0.9rem;
}

.table-header {
  margin: 0 -10px;
  padding: 15px 10px;
  background: $color--gray;
  position: sticky;
  top: 0;
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
  box-shadow: 0 0 10px rgba($color--black, 0.1);
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}

.wrapper {
  @include margin-wrapper-main;
}

/deep/ .head-link {
  border-radius: 0;
  border: none;
  border-bottom: 1px solid $color--black;
  background: transparent;
  padding: 0;
  text-decoration: none;
  &.is-active {
    background: transparent;
    color: $color--black;
    font-weight: 700;
  }
}
</style>
