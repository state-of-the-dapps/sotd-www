<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgBadgeMetamask" 
    x="0px" 
    y="0px" 
    viewBox="0 0 1280 1152.7">
    <path 
      :class="fill" 
      d="M712.2,760.5l243.7-65.4l-168.2-72.2L712.2,760.5z M492.3,622.9l-168.2,72.2l243.7,65.4L492.3,622.9z M738.7,891.2H541.3
	l-34.7,29.3l-21.1,138.2l32-18.4h245.1l32,18.4l-21.1-138.2L738.7,891.2z M1280,861.2l-76.9,291.4l-298.2-94L734,1145.8H546
	l-170.9-87.1l-298.2,94L0,860.6l94-274.4l-49-66.7L68.8,497l-49-40.2l34-15l-35.4-30l29.3-19.7L10.2,189.2L73.5,0l385.4,163.4h362.2
	L1206.5,0l63.3,189.3l-37.4,202.9l29.3,19.7l-35.4,30l34,15l-49,40.2l23.8,22.5l-49,66.7L1280,861.2z"/>
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

.purple {
  fill: $color--purple;
}

.black {
  fill: $color--black;
}

.white {
  fill: $color--white;
}
</style>
