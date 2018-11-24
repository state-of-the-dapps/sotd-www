<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgBadgeHot" 
    viewBox="-200 0 1280 1152.7">
    <path 
      :class="fill" 
      d="M398.9,1280c-140.7,0-252.2-55.7-321.8-153.3c-88.3-124.1-95.6-297.9-47.8-436C132.2,396.8,337.2,268.1,156.1,0
	C324,0.7,473.3,81,539.6,252.8c35.8,92.2,43.8,220.3,25.2,321.2c-11.9,65,28.5,68.3,64.4,35.8C679,564.7,722.8,497,762.6,390.2
	c40.5,104.2,81,230.9,81,365C843.5,1006,679.6,1280,398.9,1280z"/>
  </svg>
</template>

<script>
export default {
  props: {
    fill: {
      default: 'purple',
      type: String
    },
    height: {
      default: 18,
      type: Number
    },
    width: {
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

.purple {
  fill: $color--purple;
}
</style>
