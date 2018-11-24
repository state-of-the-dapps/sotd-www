<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgSocialBlog" 
    x="0px" 
    y="0px" 
    viewBox="0 0 512 512">
    <path 
      :class="fill" 
      d="M256,21.7c62.7,0,121.6,24.4,166,68.7c44.3,44.3,68.7,103.3,68.7,166s-24.4,121.6-68.7,166
	c-44.3,44.3-103.3,68.7-166,68.7s-121.6-24.4-166-68.7c-44.3-44.3-68.7-103.3-68.7-166S45.7,134.8,90,90.5
	C134.3,46.1,193.3,21.7,256,21.7 M256,0.4C114.6,0.4,0,115,0,256.4c0,141.4,114.6,256,256,256s256-114.6,256-256
	C512,115,397.3,0.4,256,0.4L256,0.4z M277.2,205.3v-21.1c0-10.3,6.9-12.7,11.7-12.7c4.8,0,29.6,0,29.6,0v-45.2l-40.7-0.2
	c-45.2,0-55.5,33.7-55.5,55.3v23.8h-26.1v31.9V258h26.4c0,59.8,0,131.8,0,131.8h52.7c0,0,0-72.8,0-131.8h39.1l1.9-20.7l2.9-32H277.2
	z"/>
  </svg>
</template>

<script>
export default {
  props: {
    fill: {
      default: 'black',
      type: String
    },
    height: {
      default: 24,
      type: Number
    },
    width: {
      default: 24,
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
