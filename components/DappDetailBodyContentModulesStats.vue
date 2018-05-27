<template>
<div class="component-DappDetailBodyContentModulesUsers">
  <h4 class="subtitle">{{ title }}</h4>
  <div class="sparkline">
    <trend
      :data="sparkline"
      :gradient="['#333']"
      :stroke-width="2"
      :padding="4"
      :height="40"
      auto-draw
      smooth>
    </trend>
  </div>
  <ul class="stat-list">
    <li class="stat-item">
      <span>Daily</span>
      <span class="stat-value">{{ stats.dau.toLocaleString() }}</span>
    </li>
    <li class="stat-item">
      <span>Weekly</span>
      <span class="stat-value">{{ stats.wau.toLocaleString() }}</span>
    </li>
    <li class="stat-item">
      <span>Monthly</span>
      <span class="stat-value">{{ stats.mau.toLocaleString() }}</span>
    </li>
    <li class="stat-item">
      <span>Quarterly</span>
      <span class="stat-value">{{ stats.qau.toLocaleString() }}</span>
    </li>
  </ul>
</div>
</template>

<script>
import Trend from 'vuetrend'

export default {
  components: {
    Trend
  },
  props: {
    sparkline: {
      required: true
    },
    stats: {
      required: true
    },
    title: {
      required: true
    }
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
