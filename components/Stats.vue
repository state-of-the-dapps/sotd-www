<template>
  <div class="component-Stats">
    <ul class="list">
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">
            <span>{{ $t(namespace('totalDapps')) }}</span>
          </h2>
          <p class="value">{{ statDappCount.toLocaleString() }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">
            <span>{{ $t(namespace('dailyActiveUsers')) }}</span>
            <Help :text="$t(namespace('activeUsersHelp'))"/>
          </h2>
          <p class="value">{{ statDappDau | abbreviateNumber(2) || 0 }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">
            <span>{{ $t(namespace('24htransactions')) }}</span>
            <Help :text="$t(namespace('transactionsHelp'))"/>
          </h2>
          <p class="value">{{ statDappTx24Hr | abbreviateNumber(2) || 0 }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">{{ $t(namespace('smartContracts')) }}</h2>
          <p class="value">{{ statDappContractCount | abbreviateNumber(2) || 0 }}</p>
        </div>
      </li>
    </ul>
    <h2 class="heading-2">{{ $t(namespace('newDappsPerMonth')) }}</h2>
    <div class="new-vs-total-wrapper">
      <div class="new-vs-total-legend">
        <div class="new-vs-total-legend-new">{{ $t(namespace('newDapps')) }}</div>
        <div>{{ $t(namespace('totalDapps')) }}</div>
      </div>
      <canvas id="new-vs-total"/>
    </div>
    <h2 class="heading-2">{{ $tc('category', 2) }}</h2>
    <div class="table-wrapper">
      <table class="table">
        <thead class="table-headings">
          <tr class="table-heading-row">
            <th class="table-heading -name">{{ $tc('category', 1) }}</th>
            <th class="table-heading">{{ $t(namespace('totalDapps')) }}</th>
            <th class="table-heading">
              <span>{{ $t(namespace('monthlyActiveUsers')) }}</span>
              <Help 
                :bottom="true" 
                :text="$t(namespace('activeUsersHelp'))"/>
            </th>
            <th class="table-heading">
              <span>{{ $t(namespace('transactions30d')) }}</span>
              <Help 
                :bottom="true" 
                :text="$t(namespace('transactionsHelp'))"/>
            </th>
            <th class="table-heading">{{ $t(namespace('nrOfContracts')) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(category, index) in statCategories"
            :key="index"
            class="table-row">
            <td class="table-data -name">
              <nuxt-link
                :to="localePath({
                  name: 'rankings-category',
                  params: { category: category.category.toLowerCase() }
                })"
                class="table-link">{{ $t(`categoryOptions.${$options.filters.capitalize(category.category)}`) }}</nuxt-link>
            </td>
            <td class="table-data">{{ category.dappCount.toLocaleString() }}</td>
            <td class="table-data">{{ category.dappMau | abbreviateNumber(2) || 0 }}</td>
            <td class="table-data">{{ category.dappTx30D | abbreviateNumber(2) || 0 }}</td>
            <td class="table-data">{{ category.dappContractCount | abbreviateNumber(2) || 0 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="heading-2">{{ $t('platform') | pluralize }}</h2>
    <div class="table-wrapper">
      <table class="table">
        <thead class="table-headings">
          <tr class="table-heading-row">
            <th class="table-heading -name">{{ $t('platform') }}</th>
            <th class="table-heading">{{ $t(namespace('totalDapps')) }}</th>
            <th class="table-heading">
              <span>{{ $t(namespace('dailyActiveUsers')) }}</span>
              <Help 
                :bottom="true" 
                :text="$t(namespace('activeUsersHelp'))"/>
            </th>
            <th class="table-heading">
              <span>{{ $t(namespace('transactions24h')) }}</span>
              <Help 
                :bottom="true" 
                :text="$t(namespace('transactionsHelp'))"/>
            </th>
            <th class="table-heading">
              <span>{{ $t(namespace('volume24h')) }}</span>
              <Help 
                :bottom="true" 
                text="Transaction volume to ÐApp contracts. Platforms use different currencies, so numbers should not be compared directly"/>
            </th>
            <th class="table-heading">{{ $t(namespace('nrOfContracts')) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(platform, index) in statPlatforms"
            :key="index"
            class="table-row">
            <td class="table-data -name">
              <nuxt-link
                :to="localePath({
                  name: 'rankings-platform',
                  params: { platform: platform.platform.toLowerCase() }
                })"
                class="table-link">{{ platform.platform }}</nuxt-link>
            </td>
            <td class="table-data">{{ platform.dappCount.toLocaleString() }}</td>
            <td class="table-data">{{ platform.dappDau | abbreviateNumber(2) || 0 }}</td>
            <td class="table-data">{{ platform.dappTx24Hr | abbreviateNumber(2) || 0 }}</td>
            <td class="table-data">{{ platform.dappVol24Hr | abbreviateNumber(2) || 0 }}</td>
            <td class="table-data">{{ platform.dappContractCount | abbreviateNumber(2) || 0 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="heading-2">{{ $t('status') }}</h2>
    <div class="chart-wrapper-bar">
      <StatsStatusBarChart
        :statuses="statStatuses"/>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import formatDate from 'date-fns/format'
import { newDapps } from '~/helpers/constants'
import Help from './Help'
import StatsStatusBarChart from './StatsStatusBarChart'

const labels = [
  '2015-04-30',
  '2015-05-31',
  '2015-06-30',
  '2015-07-31',
  '2015-08-31',
  '2015-09-30',
  '2015-10-31',
  '2015-11-30',
  '2015-12-31',
  '2016-01-31',
  '2016-02-29',
  '2016-03-31',
  '2016-04-30',
  '2016-05-31',
  '2016-06-30',
  '2016-07-31',
  '2016-08-31',
  '2016-09-30',
  '2016-10-31',
  '2016-11-30',
  '2016-12-31',
  '2017-01-31',
  '2017-02-28',
  '2017-03-31',
  '2017-04-30',
  '2017-05-31',
  '2017-06-30',
  '2017-07-31',
  '2017-08-31',
  '2017-09-30',
  '2017-10-31',
  '2017-11-30',
  '2017-12-31',
  '2018-01-31',
  '2018-02-28',
  '2018-03-31',
  '2018-04-30',
  '2018-05-31',
  '2018-06-30',
  '2018-07-31',
  '2018-08-31',
  '2018-09-30',
  '2018-10-31',
  '2018-11-30',
  '2018-12-31'
]

const formattedLabels = labels.map(x => formatDate(x, "MMM 'YY"))

function totalDapps() {
  let totalDappArr = []
  let totalDapps = 0
  let i = 0
  for (i; i < newDapps.length; i++) {
    totalDapps += newDapps[i]
    totalDappArr.push(totalDapps)
  }
  return totalDappArr
}

export default {
  components: {
    Help,
    StatsStatusBarChart
  },
  props: {
    statCategories: {
      type: Array,
      required: true,
      default: () => []
    },
    statDappContractCount: {
      type: Number,
      required: true,
      default: null
    },
    statDappCount: {
      type: Number,
      required: true,
      default: 0
    },
    statDappDau: {
      type: Number,
      required: true,
      default: 0
    },
    statDappTx24Hr: {
      type: Number,
      required: true,
      default: 0
    },
    statPlatforms: {
      type: Array,
      required: true,
      default: () => []
    },
    statStatuses: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      newVsTotalData: {
        labels: formattedLabels,
        datasets: [
          {
            type: 'line',
            label: 'Total DApps',
            borderColor: '#333333',
            backgroundColor: '#333333',
            borderWidth: '2',
            fill: false,
            data: totalDapps(),
            yAxisID: 'y-axis-2'
          },
          {
            label: 'New DApps',
            borderColor: '#bd5eff',
            backgroundColor: '#bd5eff',
            borderWidth: '2',
            data: newDapps,
            yAxisID: 'y-axis-1'
          }
        ]
      }
    }
  },
  mounted() {
    this.createChart('new-vs-total', this.newVsTotalData)
  },
  methods: {
    createChart(chartId, chartData) {
      var ctx = document.getElementById(chartId)
      var lineChart = new Chart(ctx, {
        // eslint-disable-line no-unused-vars
        type: 'bar',
        data: chartData,
        options: {
          legend: {
            display: false
          },
          responsive: true,
          hoverMode: 'index',
          stacked: false,
          title: {
            display: false
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  fontFamily: 'Overpass',
                  fontStyle: 'bold'
                }
              }
            ],
            yAxes: [
              {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'y-axis-1',
                ticks: {
                  beginAtZero: true,
                  fontFamily: 'Overpass',
                  fontStyle: 'bold'
                }
              },
              {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'right',
                id: 'y-axis-2',
                // grid line settings
                gridLines: {
                  drawOnChartArea: false // only want the grid lines for one axis to show up
                },
                ticks: {
                  beginAtZero: true,
                  fontFamily: 'Overpass',
                  fontStyle: 'bold'
                }
              }
            ]
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.table-link {
  text-decoration: none;
  border-bottom: 1px solid $color--black;
}

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
  margin-bottom: 1rem;
  margin-top: 3rem;
  @include tweakpoint('min-width', 1000px) {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    justify-content: center;
    text-align: left;
  }
}

.new-vs-total-wrapper {
  max-width: 1300px;
  margin: 0 auto;
}

.new-vs-total-legend {
  font-weight: 700;
  padding: 0 5px 20px 5px;
  font-size: 1.2rem;
  display: flex;
}

.new-vs-total-legend-new {
  margin-right: auto;
  color: #bd5eff;
}

.item {
  &:last-child .wrapper {
    border: none;
    margin-right: 0;
    padding-right: 0;
  }
}

.heading {
  font-weight: normal;
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

.table-wrapper {
  overflow-x: scroll;
}

.table {
  text-align: right;
  margin: 0 auto;
  border-collapse: collapse;
  width: 900px;
}

.table-heading-row {
  border-bottom: 1px solid $color--black;
}

.table-heading,
.table-data {
  padding: 5px 15px;
  &.-name {
    text-align: left;
  }
}

.table-heading {
  font-weight: normal;
  padding-bottom: 10px;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
}

.table-data {
  font-family: 'Dharma-Gothic-Regular';
  font-size: 3.5rem;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
  &.-name {
    text-transform: uppercase;
  }
}

.table-row {
  border-bottom: 1px solid rgba($color--black, 0.2);
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
    border-right: 1px solid rgba($color--black, 0.2);
  }
}
</style>
