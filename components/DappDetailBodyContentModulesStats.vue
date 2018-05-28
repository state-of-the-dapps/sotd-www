<template>
<div class="component-DappDetailBodyContentModulesUsers">
  <h4 class="subtitle">{{ title }}</h4>
  <div class="sparkline">
    <trend
      :data="sparkline"
      :gradient="['#333']"
      :stroke-width="1.5"
      :padding="4"
      auto-draw
      smooth>
    </trend>
  </div>
  <ul class="stat-list">
    <li class="stat-item">
      <span>Daily</span>
      <span class="stat-value">{{ daily.toLocaleString() }}</span>
    </li>
    <li class="stat-item">
      <span>Weekly</span>
      <span class="stat-value">{{ weekly.toLocaleString() }}</span>
    </li>
    <li class="stat-item">
      <span>Monthly</span>
      <span class="stat-value">{{ monthly.toLocaleString() }}</span>
    </li>
    <li class="stat-item">
      <span>Quarterly</span>
      <span class="stat-value">{{ quarterly.toLocaleString() }}</span>
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
    daily: {
      default: 0,
      required: true
    },
    monthly: {
      default: 0,
      required: true
    },
    sparkline: {
      required: true
    },
    quarterly: {
      default: 0,
      required: true
    },
    title: {
      required: true
    },
    weekly: {
      default: 0,
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
