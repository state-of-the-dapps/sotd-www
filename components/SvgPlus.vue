<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgPlus" 
    x="0px" 
    y="0px" 
    viewBox="0 0 512 512">
    <path 
      :class="fill" 
      d="M486.3,229.2H283.4l0-203c0-14.6-11.9-26.5-26.5-26.5c-14.6,0-26.5,11.9-26.5,26.5l0,203h-203c-14.6,0-26.5,11.9-26.5,26.5
	c0,14.6,11.9,26.5,26.5,26.5h203l0,203c0,14.6,11.9,26.5,26.5,26.5c14.6,0,26.5-11.9,26.5-26.5l0-203h202.9
	c14.6,0,26.5-11.9,26.5-26.5C512.9,241.1,501,229.2,486.3,229.2z"/>
  </svg>
</template>

<script>
export default {
  props: {
    fill: {
      default: 'white',
      type: String
    },
    height: {
      default: 10,
      type: Number
    },
    width: {
      default: 10,
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.white {
  fill: $color--white;
}

.black {
  fill: $color--black;
}
</style>
