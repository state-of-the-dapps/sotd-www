<template>
  <div class="RankingTableProfile">
    <span>{{ Math.ceil(score * 100) }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      required: true,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.RankingTableProfile {
  @include font-text-mono;
}
</style>
