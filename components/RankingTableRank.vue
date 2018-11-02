<template>
  <div
    :class="'rank-' + rank"
    class="component-ranking-table-rank">
    <span
      class="value">{{ rank }}</span>
  </div>
</template>

<script>
export default {
  props: {
    rank: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-ranking-table-rank {
  background: rgba($color--purple, 0.55);
  color: $color--white;
  font-weight: 700;
  text-align: center;
  &.rank-1, &.rank-2, &.rank-3, &.rank-4, &.rank-5 {
    background: rgba($color--purple, 1);
  }
  @include tweakpoint('min-width', 1000px) {
    display: flex;
    height: 65px;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
}
</style>
