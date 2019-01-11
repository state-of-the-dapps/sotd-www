<template>
  <div class="component-DappDetailBodyContentModulesDev">
    <div class="wrapper">
      <div class="field -title">
        <h4 class="dev-title">{{ $t(namespace('title')) }}<Help :text="$t(namespace('help'))"/></h4>
      </div>
      <div class="field -data">
        <p class="dev-data">{{ $tc(namespace('events'), dev30d, {count: dev30d}) }}<span 
          v-if="dev30dPct" 
          :class="getDappStatsClass(dev30dPct)" 
          class="dev-pct"> &nbsp;<span v-if="dev30dPct > 0">+</span>{{ Number(dev30dPct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span> ({{ $t(namespace('day'), {count: 30}) }})</p>
        <p class="dev-data">{{ $tc(namespace('events'), dev90d, {count: dev90d}) }}  ({{ $t(namespace('day'), {count: 90}) }})</p>
        <div class="sparkline">
          <trend
            :data="sparkline"
            :gradient="['#333']"
            :stroke-width="1.75"
            :padding="4"
            auto-draw
            smooth/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Help from './Help'
import Trend from 'vuetrend'

export default {
  components: {
    Help,
    Trend
  },
  props: {
    dev30d: {
      type: Number,
      required: true,
      default: null
    },
    dev30dPct: {
      type: Number,
      default: null
    },
    dev90d: {
      type: Number,
      required: true,
      default: null
    },
    sparkline: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    getDappStatsClass(value) {
      let result = ''
      if (value && value > 0) {
        result = 'is-positive'
      } else if (value && value < 0) {
        result = 'is-negative'
      }
      return result
    }
  }
}
</script>


<style lang="scss" scoped>
.field {
  @include tweakpoint('min-width', 800px) {
    display: flex;
    align-items: center;
    &.-title {
      margin-right: 20px;
    }
    &.-data {
      margin-left: auto;
    }
  }
}

.dev-pct {
  font-size: 1rem;
}

.is-positive {
  color: $color--positive;
}

.is-negative {
  color: $color--negative;
}

.explanation {
  font-weight: normal;
}

.sparkline {
  @include tweakpoint('min-width', 800px) {
    max-width: 215px;
    margin-left: 20px;
  }
}

.wrapper {
  @include tweakpoint('min-width', 800px) {
    display: flex;
    align-items: center;
  }
}

.dev-data {
  margin: 0;
  @include tweakpoint('min-width', 800px) {
    padding-left: 20px;
  }
}

.dev-title {
  margin: 0;
}
</style>
