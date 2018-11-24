<template>
  <div class="component-ranking-table-profile">
    <span>{{ Math.ceil(score * 100) }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-ranking-table-profile {
  @include font-monospace;
}
</style>
