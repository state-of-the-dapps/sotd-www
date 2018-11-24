<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgIconCalendar" 
    x="0px" 
    y="0px" 
    viewBox="0 0 1280 1280">
    <path 
      :class="fill" 
      d="M1227.5,153.8h-165.8V53.2c0-29-23.5-52.5-52.5-52.5s-52.5,23.5-52.5,52.5v100.5H322.4V53.2c0-29-23.5-52.5-52.5-52.5
	c-29,0-52.5,23.5-52.5,52.5v100.5H51.7c-29,0-52.5,23.5-52.5,52.5v1022.8c0,29,23.5,52.5,52.5,52.5h1175.9c29,0,52.5-23.5,52.5-52.5
	V206.2C1280,177.3,1256.5,153.8,1227.5,153.8z M104.1,1176.6V546.1H1175v630.5H104.1z"/>
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

.purple {
  fill: $color--purple;
}
</style>
