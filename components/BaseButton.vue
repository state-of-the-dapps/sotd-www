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
  position: relative;
  display: inline-block;
  background: $gradient--main-1;
  color: $color--white;
  font-size: 1.25rem;
  text-shadow: 0px 1px rgba($color--purple, 0.2);
  padding: 7px 14px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba($color--purple, 0.1);
  &:active {
    top: 1px;
    box-shadow: none;
  }
  &.full {
    width: 100%;
  }
}
</style>
