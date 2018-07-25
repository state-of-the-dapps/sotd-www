<template>
<div class="component-DappDetailBodyContentModulesGithub">
  <div class="wrapper">
    <div class="field -title">
      <h4 class="github-title">Github activity <span class="explanation">(code pushes, issues, pull requests, etc.)</span></h4>
    </div>
    <div class="field -data">
      <p class="github-data"><strong>{{ dev30d }} events</strong> <span v-if="dev30dPct" :class="getDappStatsClass(dev30dPct)" class="dev-pct"> &nbsp;<span v-if="dev30dPct > 0">+</span>{{ Number(dev30dPct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span> (30d)</p>
      <p class="github-data"><strong>{{ dev90d }} events</strong> (90d)</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['dev30d', 'dev30dPct', 'dev90d'],
  methods: {
    getDappStatsClass (value) {
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
@import '~assets/css/settings';

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
  font-weight: 400;
}

.wrapper {
  @include tweakpoint('min-width', 800px) {
    display: flex;
    align-items: center;
  }
}

.github-data {
  margin: 0;
  @include tweakpoint('min-width', 800px) {
    padding-left: 20px;
  }
}

.github-title {
  margin: 0;
}
</style>
