<template>
  <div class="component-DappDetailBodyContentModulesStats">
    <h4 class="subtitle">{{ title }}</h4>
    <div class="sparkline">
      <trend
        :data="sparkline"
        :gradient="['#333']"
        :stroke-width="1.75"
        :padding="4"
        auto-draw
        smooth/>
    </div>
    <ul class="stat-list">
      <li class="stat-item">
        <span v-if="type === 'numbers'">1 day</span>
        <span v-else>Daily</span>
        <span class="stat-value">{{ daily.toLocaleString() }}</span>
      </li>
      <li class="stat-item">
        <span v-if="type === 'numbers'">7 days</span>
        <span v-else>Weekly</span>
        <span class="stat-value">{{ weekly.toLocaleString() }}</span>
      </li>
      <li class="stat-item">
        <span v-if="type === 'numbers'">30 days</span>
        <span v-else>Monthly</span>
        <span class="stat-value">{{ monthly.toLocaleString() }}</span>
      </li>
    <!--
    <li class="stat-item">
      <span v-if="type === 'numbers'">90 days</span>
      <span v-else>Quarterly</span>
      <span class="stat-value">{{ quarterly.toLocaleString() }}</span>
    </li>
    -->
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
      type: Number,
      default: 0,
      required: true
    },
    monthly: {
      type: Number,
      default: 0,
      required: true
    },
    sparkline: {
      type: Array,
      required: true
    },
    quarterly: {
      type: Number,
      default: 0,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'words'
    },
    weekly: {
      type: Number,
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
  font-size: 1rem;
  padding: 4px 5px;
  font-family: 'Inconsolata', monospace;
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
