<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgIconFeatured" 
    x="0px" 
    y="0px" 
    viewBox="0 0 1280 1280">
    <path 
      :class="fill" 
      d="M1228.2,0H52.8C23.8,0,0.3,23.5,0.3,52.5v1175.4c0,29,23.5,52.5,52.5,52.5h1175.4c29,0,52.5-23.5,52.5-52.5V52.5
	C1280.7,23.5,1257.2,0,1228.2,0z M613.1,104.9V694l203.1-106l203.1,106V104.9h156.4v899.7H105.2V104.9H613.1z"/>
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

.white {
  fill: lighten($color--white, 100%);
}
</style>
