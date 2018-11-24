<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgFeedbackNegative" 
    x="0px" 
    y="0px" 
    viewBox="0 0 512 509.3" 
    style="enable-background:new 0 0 512 509.3;" 
    xml:space="preserve">
    <path 
      d="M256.4,0.2c-141.2,0-256,114.8-256,256c0,141.2,114.8,256,256,256c141.2,0,256-114.8,256-256C512.4,115,397.5,0.2,256.4,0.2
	z M256.4,486.4c-126.9,0-230.2-103.3-230.2-230.2S129.4,26,256.4,26c126.9,0,230.2,103.3,230.2,230.2S383.3,486.4,256.4,486.4z
	 M121.9,184.9c0-7.1,5.8-12.9,12.9-12.9h78.8c7.1,0,12.9,5.8,12.9,12.9c0,7.1-5.8,12.9-12.9,12.9h-78.8
	C127.7,197.8,121.9,192.1,121.9,184.9z M390.8,184.9c0,7.1-5.8,12.9-12.9,12.9h-78.8c-7.1,0-12.9-5.8-12.9-12.9
	c0-7.1,5.8-12.9,12.9-12.9h78.8C385,172,390.8,177.8,390.8,184.9z M390.8,343.1c0,7.1-5.8,12.9-12.9,12.9H134.8
	c-7.1,0-12.9-5.8-12.9-12.9c0-7.1,5.8-12.9,12.9-12.9h243.1C385,330.2,390.8,336,390.8,343.1z"/>
  </svg>
</template>

<script>
export default {
  props: {
    height: {
      default: 20,
      type: Number
    },
    width: {
      default: 20,
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

path {
  pointer-events: all;
  fill: $color--black;
}
</style>
