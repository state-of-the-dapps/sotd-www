<template>
  <div class="component-Stats">
    <ul class="list">
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">Total ÐApps</h2>
          <p class="value">{{ '1,650' }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">Daily active users</h2>
          <p class="value">{{ 15000 | abbreviateNumber(2) }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">24 HR transactions</h2>
          <p class="value">{{ 20000 | abbreviateNumber(2) }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">24 HR volume (ETH)</h2>
          <p class="value">{{ 250000 | abbreviateNumber(2) }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">Smart contracts</h2>
          <p class="value">{{ 500 | abbreviateNumber(2) }}</p>
        </div>
      </li>
    </ul>
    <h2 class="heading-2">ÐApps by Category</h2>
    <div class="chart-wrapper">
      <StatsBarChart/>
    </div>
  </div>
</template>

<script>
import StatsBarChart from './StatsBarChart'

export default {
  components: {
    StatsBarChart
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.chart-wrapper {
  max-width: 950px;
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
  margin-bottom: 2.5rem;
}

.value {
  @include title;
  font-size: 7rem;
  margin: 0;
  line-height: 1;
  text-transform: uppercase;
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
