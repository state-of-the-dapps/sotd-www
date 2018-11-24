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
      d="M256.3,0.4c-141.4,0-256,114.6-256,256c0,141.4,114.6,256,256,256s256-114.6,256-256
	C512.3,115,397.7,0.4,256.3,0.4z M422.2,422.4c-44.3,44.3-103.3,68.7-166,68.7s-121.6-24.4-166-68.7C46,378,21.6,319.1,21.6,256.4
	S46,134.8,90.3,90.5c44.3-44.3,103.3-68.7,166-68.7c53.7,0,104.6,17.9,145.9,50.9l-95.8,95.8l-22.3,63.3l63.3-22.3l95.4-95.4
	C474,154.7,491,204.3,491,256.4C491,319.1,466.5,378,422.2,422.4z M115.2,310.3h282.1v34.5H115.2V310.3z M115.2,252.4h282.1v34.5
	H115.2V252.4z M115.2,368.3h197.5v34.5H115.2V368.3z"/>
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
