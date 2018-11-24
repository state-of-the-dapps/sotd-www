<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgIconMagnifier" 
    x="0px" 
    y="0px" 
    viewBox="0 0 1280 1280">
    <path 
      :class="theme" 
      d="M0,538.6c0,297,241.6,538.7,538.7,538.7c129.7,0,248.7-46,341.8-122.7l310,310c10.3,10.3,23.6,15.4,37.1,15.4
    s26.9-5.2,37.1-15.4c20.5-20.4,20.5-53.6,0-74.1l-310-310c76.6-93,122.7-212.1,122.7-341.8C1077.3,241.6,835.7,0,538.7,0
    S0,241.6,0,538.6z M105,538.7c0-239.1,194.6-433.7,433.7-433.7s433.7,194.6,433.7,433.7S777.8,972.4,538.7,972.4
    C299.4,972.4,105,777.8,105,538.7z"/>
  </svg>
</template>

<script>
export default {
  props: {
    theme: {
      default: 'black',
      type: String
    },
    height: {
      default: 17,
      type: Number
    },
    width: {
      default: 17,
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
  fill: $color--white;
}
</style>
