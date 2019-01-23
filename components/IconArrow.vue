<template>
  <span
    :class="position"
    class="IconArrow"/>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      required: true,
      default: 'up'
    }
  }
}
</script>

<style lang="scss" scoped>
.IconArrow {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 0.38em solid transparent;
  border-right: 0.38em solid transparent;
  margin-right: 2px;
  &.down {
    border-top: 0.67em solid $color--negative;
  }
  &.up {
    border-bottom: 0.67em solid $color--positive;
  }
}
</style>
