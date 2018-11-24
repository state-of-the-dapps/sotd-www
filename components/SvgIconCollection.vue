<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgIconCollection" 
    viewBox="0 0 1280 1280" 
    x="0px" 
    y="0px" 
    style="enable-background:new 0 0 1280 1280;" 
    xml:space="preserve">
    <path 
      :class="fill" 
      d="M1228.2,0H502.9c-29,0-52.5,23.5-52.5,52.5v191.9H276.9c-29,0-52.5,23.5-52.5,52.5v155H50.9c-13.9,0-27.3,5.5-37.2,15.4
c-9.9,9.9-15.4,23.2-15.4,37.2l0,725.3c0,29,23.5,52.5,52.5,52.5h725.3c29,0,52.5-23.5,52.5-52.5v-155h173.4
c29,0,52.5-23.5,52.5-52.5V830.4l173.4,0c29,0,52.5-23.5,52.5-52.5V52.5C1280.7,23.5,1257.2,0,1228.2,0z M723.7,1024.7H103.5
l0-467.7l620.2,0V1024.7z M949.7,817.2H828.8V504.5c0-13.9-5.5-27.3-15.4-37.2c-9.9-9.9-23.2-15.4-37.2-15.4l-446.8,0V349.5h620.2
V817.2z M1175.6,572.8h-120.9V297c0-29-23.5-52.5-52.5-52.5H555.4V105.1h620.2V572.8z"/>
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
      default: 18,
      type: Number
    },
    width: {
      default: 18,
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
.white {
  fill: lighten($color--white, 100%);
}
</style>
