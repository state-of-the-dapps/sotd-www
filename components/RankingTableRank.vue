<template>
  <div
    :class="'rank-' + rank"
    class="component-ranking-table-rank">
    <span class="value">{{ rank }}</span>
    <BaseDelta
      :value="rankDelta"
      :null-text="$t('new')"/>
  </div>
</template>

<script>
import BaseDelta from './BaseDelta'

export default {
  components: {
    BaseDelta
  },
  props: {
    rank: {
      type: Number,
      required: true,
      default: null
    },
    rankDelta: {
      type: [Number, null],
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.component-ranking-table-rank {
  font-weight: 700;
  padding: 0;
  background: darken($color--white, 2%);
  border-right: 1px solid darken($color--gray, 5%);
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: column;
}
</style>
