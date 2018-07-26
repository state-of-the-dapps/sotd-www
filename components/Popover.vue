<template>
  <transition name="fade">
    <div class="component-Popover" :class="[bottom ? 'is-bottom' : '', reversed ? 'is-reversed' : '']">
      <div class="wrapper">
        {{ text }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['bottom', 'reversed', 'text']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-Popover {
  text-transform: initial;
  position: absolute;
  bottom: calc(1.1rem + 10px);
  font-size: 1rem;
  font-weight: normal;
  right: 0;
  width: 150px;
  text-align: left;
  padding: 10px;
  border-radius: 4px;
  background: $color--white;
  box-shadow: 0 5px 10px rgba($color--black, .15);
  z-index: 100;
  &:after {
    content: '';
    position: absolute;
    right: 0px;
    bottom: -5px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid $color--white;
  }
  &.is-bottom {
    bottom: auto;
    top: calc(1.1rem + 10px);
    &:after {
      bottom: auto;
      border-top: none;
      border-bottom: 8px solid $color--white;
      top: -5px
    }
  }
  &.is-reversed {
    right: auto;
    left: 0;
    &:after {
      right: auto;
      left: 0;
    }
  }
}
</style>
