<template>
<svg class="component-SvgIconFlag" :width="width" :height="height" x="0px" y="0px" viewBox="0 0 1280 1280">
</svg>
</template>

<script>
export default {
  props: {
    'fill': {
      default: 'black',
      type: String
    },
    'height': {
      default: 16,
      type: Number
    },
    'width': {
      default: 16,
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.black {
  fill: $color--black;
}
</style>
