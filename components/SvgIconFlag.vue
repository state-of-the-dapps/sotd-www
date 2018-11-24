<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgIconFlag" 
    x="0px" 
    y="0px" 
    viewBox="0 0 1280 1280">
    <path 
      :class="fill" 
      d="M1189.7,0H89.9c-29,0-52.4,23.5-52.4,52.4v912.7v262.5c0,29,23.5,52.4,52.4,52.4s52.4-23.5,52.4-52.4v-210h1047.4
	c29,0,52.4-23.5,52.4-52.4V52.4C1242.2,23.5,1218.7,0,1189.7,0z M1137.3,912.7h-995V104.9h995V912.7z"/>
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
      default: 16,
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
</style>
