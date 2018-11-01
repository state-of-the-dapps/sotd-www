<template>
  <div class="component-ranking-table">
    <table class="table">
      <thead class="table-header">
        <tr class="table-row">
          <th class="table-head">
            <div class="table-head-wrapper rank">
              <span class="dapp-rank-head">#</span>
              <Help text="The default rank is based on DAU, or Daily Active Users (unique source addresses in transactions to ÐApp contracts)" :reversed="true"/>
            </div>
          </th>
          <th class="table-head">
            <div class="table-head-wrapper name">
              <span class="dapp-name-head">ÐApp</span>
            </div>
          </th>
          <th class="table-head">
            <div class="table-head-wrapper dau">
              <span class="dapp-name-head">Users (24hr)</span>
              <Help text="Daily Active Users, or DAU (unique source addresses in transactions to ÐApp contracts)"/>
            </div>
          </th>
          <th class="table-head">
            <div class="table-head-wrapper dau">
              <span class="dapp-name-head">Users (30d)</span>
              <Help text="Monthly Active Users, or MAU (unique source addresses in transactions to ÐApp contracts)"/>
            </div>
          </th>
          <th class="table-head">
            <div class="table-head-wrapper dau">
              <span class="dapp-name-head">Volume (7d)</span>
              <Help text="Transaction volume to ÐApp contracts"/>
            </div>
          </th>
          <th class="table-head">
            <div class="table-head-wrapper dau">
              <span class="dapp-name-head">Dev</span>
              <Help text="The number of GitHub events that the project organization / repository generates. This includes code pushes, issues, pull requests, etc."/>
            </div>
          </th>
          <th class="table-head">
            <div class="table-head-wrapper profile">
              <span class="dapp-name-head">Profile score</span>
              <Help text="How complete the profile of the ÐApp is"/>
            </div>
          </th>
          <th class="table-head">
            <div class="table-head-wrapper dau">
              <span class="dapp-name-head">Usage (30d)</span>
              <Help text="Users (unique source addresses in transactions to ÐApp contracts) over the past 30 days"/>
            </div>
          </th>     
        </tr>
      </thead>
      <tbody class="table-body">
        <tr
          v-for="(dapp, index) in dapps"
          :key="index"
          class="table-row">
          <td class="table-data">
            <RankingTableRank :rank="dapp.rank"/>
          </td>
          <td class="table-data">
            <RankingTableName
              :icon-url="dapp.iconUrl"
              :name="dapp.name"
              :slug="dapp.slug"
              :teaser="dapp.teaser"/>
          </td>
          <td class="table-data">
            <RankingTableValuePct
              :value="dapp.stats.dau"
              :value_pct="dapp.stats.dau_pct"/>
          </td>
          <td class="table-data">
            <RankingTableValuePct
              :value="dapp.stats.mau"
              :value_pct="dapp.stats.mau_pct"/>
          </td>
          <td class="table-data">
            <RankingTableVolume
              :stats="dapp.stats"
              :platform="dapp.platform"/>
          </td>
          <td class="table-data">
            <RankingTableValuePct
              :value="dapp.stats.dev_30d"
              :value_pct="dapp.stats.dev_30d_pct"/> 
          </td>
          <td class="table-data">
            <RankingTableProfile :score="dapp.profileScore"/>
          </td>
          <td class="table-data">
            <RankingTableTrend :users="dapp.sparklines.users"/>
          </td>          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Help from './Help'
import RankingTableName from './RankingTableName'
import RankingTableProfile from './RankingTableProfile'
import RankingTableRank from './RankingTableRank'
import RankingTableTrend from './RankingTableTrend'
import RankingTableValuePct from './RankingTableValuePct'
import RankingTableVolume from './RankingTableVolume'

export default {
  components: {
    Help,
    RankingTableName,
    RankingTableProfile,
    RankingTableRank,
    RankingTableTrend,
    RankingTableValuePct,
    RankingTableVolume
  },
  props: {
    dapps: Array,
    required: true
  }
}
</script>
