<template>
  <div class="component-DappDetailBodyContentModulesStats">
    <h4 class="subtitle">{{ title }} 
      <Help
        v-if="help"
        :text="help"/>
    </h4>
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
        <span v-if="type === 'numbers'">{{ $tc(namespace('day'), 1, {count: 1}) }}</span>
        <span v-else>{{ $t(namespace('daily')) }}</span>
        <span class="stat-value">{{ daily.toLocaleString() }}</span>
      </li>
      <li class="stat-item">
        <span v-if="type === 'numbers'">{{ $tc(namespace('day'), 7, {count: 7}) }}</span>
        <span v-else>{{ $t(namespace('weekly')) }}</span>
        <span class="stat-value">{{ weekly.toLocaleString() }}</span>
      </li>
      <li class="stat-item">
        <span v-if="type === 'numbers'">{{ $tc(namespace('day'), 30, {count: 30}) }}</span>
        <span v-else>{{ $t(namespace('monthly')) }}</span>
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
import Help from './Help'
export default {
  components: {
    Help,
    Trend
  },
  props: {
    daily: {
      type: Number,
      default: 0,
      required: true
    },
    help: {
      type: String,
      default: ''
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
.sparkline {
  margin: 10px 0;
}

.subtitle {
  margin: 0;
}

.stat-item {
  padding: 4px 5px;
  @include font-text-mono;
  font-size: 0.9rem;
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
  @include font-text-mono;
  font-size: 0.9rem;
}

.subtitle {
  margin: 0;
}
</style>
