<template>
<div class="component-DappDetailBodyContentModulesTransactions">
  <h4 class="subtitle">Transactions</h4>
  <div class="sparkline">
    <trend
      :data="[0,1]"
      :gradient="['#333']"
      :stroke-width="2"
      :height="40"
      auto-draw
      smooth>
    </trend>
  </div>
  <ul class="stat-list">
    <li class="stat-item">
      <span>Monthly</span>
      <span class="stat-value">1,208,982</span>
    </li>
    <li class="stat-item">
      <span>Weekly</span>
      <span class="stat-value">1,208,982</span>
    </li>
    <li class="stat-item">
      <span>Daily</span>
      <span class="stat-value">1,208,982</span>
    </li>
  </ul>
</div>
</template>

<script>
import Trend from 'vuetrend'

export default {
  components: {
    Trend
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';


.sparkline {
  margin: 10px 0;
}

.subtitle {
  margin: 0;
}

.stat-item {
  padding: 4px 5px;
  &:nth-child(odd) {
    background: lighten($color--white, 100%);
  }
  display: flex;
  align-items: center;
  span {
    width: 50%;
    &:last-child {
      text-align: right;
    }
  }
}

.stat-value {
  font-family: 'Inconsolata', monospace;
}

.subtitle {
  margin: 0;
}
</style>
