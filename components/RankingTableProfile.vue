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
      required: true,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.component-ranking-table-profile {
  @include font-text-mono;
}
</style>
