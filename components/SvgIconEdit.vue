<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgIconEdit" 
    x="0px" 
    y="0px" 
    viewBox="0 0 1280 1280">
    <path 
      :class="fill" 
      d="M1226.8,1279.4H52.3c-28.9,0-52.4-23.5-52.4-52.4V52.4C-0.1,23.5,23.3,0,52.3,0h587.3c29,0,52.4,23.5,52.4,52.4
	s-23.5,52.4-52.4,52.4H104.7v1069.7h1069.7V639.7c0-28.9,23.5-52.4,52.4-52.4s52.4,23.5,52.4,52.4V1227
	C1279.3,1255.9,1255.8,1279.4,1226.8,1279.4z M407.1,938.6L780.7,814c7.7-2.6,14.7-6.9,20.5-12.7l462.7-462.7
	c20.5-20.5,20.5-53.7,0-74.1c-20.5-20.5-53.7-20.5-74.1,0l-454,454L473.4,806l87.5-262.5l454-454c20.5-20.5,20.5-53.7,0-74.1
	c-20.5-20.5-53.7-20.5-74.1,0L478.1,478.1c-5.8,5.8-10.1,12.8-12.7,20.5L340.8,872.3c-6.3,18.8-1.4,39.6,12.7,53.6
	c10,10,23.4,15.4,37.1,15.4C396,941.3,401.6,940.4,407.1,938.6z"/>
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
