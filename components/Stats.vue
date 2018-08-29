<template>
  <div class="component-Stats">
    <ul class="list">
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">
            <span>Total ÐApps</span>
          </h2>
          <p class="value">{{ statDappCount.toLocaleString() }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">
            <span>Daily active users</span>
            <Help text="Unique source addresses in transactions to ÐApp contracts"/>
          </h2>
          <p class="value">{{ statDappDau | abbreviateNumber(2) || 0 }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">
            <span>24 hr transactions</span>
            <Help text="Number of transactions to ÐApp contracts"/>
          </h2>
          <p class="value">{{ statDappTx24Hr | abbreviateNumber(2) || 0 }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">Smart contracts</h2>
          <p class="value">{{ statDappContractCount | abbreviateNumber(2) || 0 }}</p>
        </div>
      </li>
    </ul>
    <h2 class="heading-2">Platforms</h2>
    <div class="platforms-wrapper">
      <table class="platforms">
        <thead class="platform-headings">
          <tr class="platform-heading-row">
            <th class="platform-heading -platform">Platform</th>
            <th class="platform-heading">Total ÐApps</th>
            <th class="platform-heading">
              <span>Daily active users</span>
              <Help text="Unique source addresses in transactions to ÐApp contracts" :bottom="true"/>
            </th>
            <th class="platform-heading">
              <span>24 hr transactions</span>
              <Help text="Number of transactions to ÐApp contracts" :bottom="true"/>
            </th>
            <th class="platform-heading">
              <span>24 hr volume</span>
              <Help text="Transaction volume to ÐApp contracts" :bottom="true"/>
            </th>
            <th class="platform-heading"># of contracts</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(platform, index) in statPlatforms"
            :key="index"
            class="platform-row">
            <td class="platform-data -platform">{{ platform.platform }}</td>
            <td class="platform-data">{{ platform.dappCount.toLocaleString() }}</td>
            <td class="platform-data">{{ platform.dappDau | abbreviateNumber(2) || 0  }}</td>
            <td class="platform-data">{{ platform.dappTx24Hr | abbreviateNumber(2) || 0  }}</td>
            <td class="platform-data">{{ platform.dappVol24Hr | abbreviateNumber(2) || 0  }}</td>
            <td class="platform-data">{{ platform.dappContractCount | abbreviateNumber(2) || 0 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="heading-2">Status</h2>
    <div class="chart-wrapper-bar">
      <StatsStatusBarChart
        :statuses="statStatuses"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Help from './Help'
import StatsStatusBarChart from './StatsStatusBarChart'

export default {
  components: {
    Help,
    StatsStatusBarChart
  },
  computed: {
    ...mapGetters([
      'statDappContractCount',
      'statDappCount',
      'statDappDau',
      'statDappTx24Hr',
      'statDappVol24Hr',
      'statPlatforms',
      'statStatuses'
    ])
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.chart-wrapper-bar {
  max-width: 1000px;
  margin: 0 auto;
}

.chart-wrapper-line {
  max-width: 1200px;
  margin: 0 auto;
}

.list {
  display: block;
  text-align: center;
  margin-bottom: 35px;
  margin-top: 15px;
  @include tweakpoint('min-width', 1000px) {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    justify-content: center;
    text-align: left;
  }
}

.item {
  &:last-child .wrapper {
    border: none;
    margin-right: 0;
    padding-right: 0;
  }
}

.heading {
  font-weight: 300;
  font-size: 1.2rem;
  margin-bottom: 0;
}

.heading-2 {
  @include title-2;
  font-size: 3rem;
  text-align: center;
  margin-top: 6rem;
  margin-bottom: 2rem;
}

.platforms-wrapper {
  overflow-x: scroll;
}

.platforms {
  text-align: right;
  margin: 0 auto;
  border-collapse: collapse;
  width: 900px;
}

.platform-heading-row {
  border-bottom: 1px solid $color--black;
}

.platform-heading, .platform-data {
  padding: 5px 15px;
  &.-platform {
    text-align: left;
  }
}

.platform-heading {
  font-weight: 400;
  padding-bottom: 10px;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
}

.platform-data {
  font-family: 'Dharma-Gothic-Regular';
  font-size: 3.5rem;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
  &.-platform {
    text-transform: uppercase;
  }
}

.platform-row {
  border-bottom: 1px solid rgba($color--black, .2);
}

.value {
  @include title;
  font-size: 7rem;
  margin: 0;
  line-height: 1;
  color: $color--black;
}

.wrapper {
  @include tweakpoint('min-width', 1000px) {
    margin-right: 40px;
    padding-right: 40px;
    border-right: 1px solid rgba($color--black, .2);
  }
}
</style>
