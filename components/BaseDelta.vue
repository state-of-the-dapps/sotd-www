<template>
  <span class="BaseDelta">
    <span
      v-if="value !== 0 && value !== null"
      :class="[{positive: value > 0}, {negative: value < 0}]"
      class="value"><BaseArrow :position="arrowPosition"/>{{ Math.abs(value) }}</span>
    <span
      v-if="nullText && value === null"
      class="null">{{ nullText }}</span>
  </span>
</template>

<script>
import BaseArrow from './BaseArrow'

export default {
  components: {
    BaseArrow
  },
  props: {
    value: {
      type: [Number, null],
      default: 0
    },
    nullText: {
      type: String,
      default: ''
    }
  },
  computed: {
    arrowPosition() {
      return this.value > 0 ? 'up' : 'down'
    }
  }
}
</script>

<style lang="scss" scoped>
.positive {
  color: $color--positive;
}
.negative {
  color: $color--negative;
}
.null {
  color: $color--medium-purple;
}
.value {
  @include font-text-mono;
  display: inline-block;
  border-radius: 3px;
  font-weight: 700;
  line-height: 1;
  font-size: 0.9rem;
}
</style>
