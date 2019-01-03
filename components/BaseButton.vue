<template>
  <button
    :class="classes"
    class="BaseButton"
    @click="$emit('clickButton')">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    classes: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.BaseButton {
  display: inline-block;
  background: $color--black;
  color: $color--white;
  padding: 7px 14px;
  border-radius: 4px;
  &.full {
    width: 100%;
  }
}
</style>
