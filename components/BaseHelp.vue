<template>
  <span
    class="BaseHelp" 
    @mouseover="popoverIsActive = true" 
    @mouseout="popoverIsActive = false">
    <span :class="`help-icon ${size}`">?</span>
    <BasePopover 
      v-if="popoverIsActive" 
      :bottom="bottom" 
      :reversed="reversed" 
      :text="text"/>
  </span>
</template>

<script>
import BasePopover from './BasePopover'

export default {
  components: {
    BasePopover
  },
  props: {
    bottom: {
      type: Boolean,
      default: false
    },
    reversed: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      popoverIsActive: false
    }
  }
}
</script>


<style lang="scss" scoped>
.BaseHelp {
  @include font-text;
  display: inline-block;
  margin-left: 5px;
  position: relative;
}

.help-icon {
  display: inline-block;
  background: rgba($color--black, 0.15);
  text-align: center;
  font-size: 0.9rem;
  width: 1.1rem;
  height: 1.1rem;
  line-height: 1.1rem;
  font-weight: 700;
  border-radius: 50%;
  cursor: help;
  &.lg {
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 1.2rem;
  }
}
</style>
