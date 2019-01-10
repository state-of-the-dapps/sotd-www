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
      required: true,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseButton {
  position: relative;
  display: inline-block;
  color: $color--white;
  background: $color--black;
  text-shadow: 0 1px rgba($color--black, 0.1);
  padding: 8px 16px;
  border-radius: 4px;
  &:active {
    top: 1px;
    box-shadow: none;
  }
  &.full {
    width: 100%;
  }
  &.special {
    background: $color--light-purple;
    font-size: 1.15rem;
    font-weight: 600;
    box-shadow: 0 2px 10px rgba($color--black, 0.1);
  }
}
</style>
