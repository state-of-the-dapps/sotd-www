<template>
  <div class="component-ranking-table">
    <div class="wrapper">
      <div class="table">
        <media :query="{minWidth: tweakpoint}">
          <div class="table-header">
            <div class="table-row">
              <div class="table-head col-rank">
                <RankingTableRankHead/>
              </div>
              <div class="table-head col-name">
                <RankingTableNameHead/>
              </div>
              <div class="table-head col-dau">
                <RankingTableDauHead/>
              </div>
              <div class="table-head col-mau">
                <RankingTableMauHead/>
              </div>
              <div class="table-head col-vol">
                <RankingTableVolumeHead/>
              </div>
              <div class="table-head col-dev">
                <RankingTableDevHead/>
              </div>
              <div class="table-head col-profile">
                <RankingTableProfileHead/>
              </div>
              <div class="table-head col-usage">
                <RankingTableUsageHead/>
              </div>     
            </div>
          </div>
        </media>
        <div class="table-body">
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
              <div class="table-data col-dau">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTableDauHead/>
                </media>
                <RankingTableValuePct
                  :value="dapp.stats.dau"
                  :value_pct="dapp.stats.dau_pct"/>
              </div>
              <div class="table-data col-mau">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTableMauHead/>
                </media>
                <RankingTableValuePct
                  :value="dapp.stats.mau"
                  :value_pct="dapp.stats.mau_pct"/>
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
              <div class="table-data col-profile">
                <media :query="{maxWidth: tweakpoint}">
                  <RankingTableProfileHead/>
                </media>
                <RankingTableProfile :score="dapp.profileScore"/>
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
    </div>
  </div>
</template>

<script>
import Help from './Help'
import Media from 'vue-media'
import RankingTableDauHead from './RankingTableDauHead'
import RankingTableDevHead from './RankingTableDevHead'
import RankingTableMauHead from './RankingTableMauHead'
import RankingTableName from './RankingTableName'
import RankingTableNameHead from './RankingTableNameHead'
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
    Help,
    Media,
    RankingTableDauHead,
    RankingTableDevHead,
    RankingTableMauHead,
    RankingTableName,
    RankingTableNameHead,
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
    dapps: Array,
    required: true
  },
  data () {
    return {
      tweakpoint: 1000
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.col-name {
  @include tweakpoint('min-width', 1000px) {
    flex: 1;
  }
}

.col-rank {
  @include tweakpoint('min-width', 1000px) {
    width: 60px;
    margin-right: 15px;
  }
}

.col-usage {
  width: 175px;
}

.table-header {
  position: sticky;
  top: 0;
  .table-row {
    box-shadow: none;
    border-radius: 0;
    background: $color--gray;
  }
}

.table-row {
  background: $color--white;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba($color--black, .1);
  margin-bottom: 6px;
  @include tweakpoint('min-width', 1000px) {
    display: flex;
    align-items: center;
  }
}

.wrapper {
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
