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
  background: darken($color--white, 5%);
  font-weight: 700;
  text-align: center;
  padding: 10px;
  @include tweakpoint('min-width', 1100px) {
    padding: 0;
    background: darken($color--white, 2%);
    border-right: 1px solid darken($color--gray, 5%);
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
}
</style>
