<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgBadgeToken" 
    x="0px" 
    y="0px" 
    viewBox="-100 0 1280 1152.7">
    <path 
      :class="fill" 
      d="M952,1259.4c0,11.4-9.2,20.6-20.6,20.6h-910c-11.4,0-20.6-9.2-20.6-20.6V1105c0-11.4,9.2-20.6,20.6-20.6h910
	c11.4,0,20.6,9.2,20.6,20.6V1259.4z M476,0c262.5,0,476,213.5,476,476S738.5,952,476,952S0,738.5,0,476S213.5,0,476,0z"/>
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
