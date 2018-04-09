<template>
<svg class="component-SvgBadgeMetamask" :width="width" :height="height" x="0px" y="0px" viewBox="0 0 1280 1152.7">
  <polygon :class="fill" points="914.2,1280 457,1049.7 -0.2,1280 -0.2,0 914.2,0 "/>
</svg>
</template>

<script>
export default {
  props: {
    'fill': {
      default: 'purple',
      type: String
    },
    'height': {
      default: 18,
      type: Number
    },
    'width': {
      default: 18,
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.purple {
  fill: $color--purple;
}
</style>

