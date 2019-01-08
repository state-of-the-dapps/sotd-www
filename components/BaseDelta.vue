<template>
  <span
    :class="[{positive: value > 0}, {negative: value < 0}]"
    class="BaseDelta">{{ value | formatDelta }}</span>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
      default: 0
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
</style>
