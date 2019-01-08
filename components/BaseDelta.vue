<template>
  <span
    v-if="value !== 0"
    :class="[{positive: value > 0}, {negative: value < 0}]"
    class="BaseDelta">{{ value | formatDelta }}
    <span
      v-if="nullText && value === null"
      class="null">{{ nullText }}</span>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, null],
      default: 0
    },
    nullText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseDelta {
  @include font-monospace;
  display: inline-block;
  border-radius: 3px;
  font-weight: 700;
  line-height: 1;
  font-size: 1rem;
}
.positive {
  color: $color--positive;
}
.negative {
  color: $color--negative;
}
.null {
  color: $color--light-purple;
}
</style>
