<template>
  <svg 
    :class="'-' + direction" 
    :width="width" 
    :height="height" 
    class="component-SvgIconChevron" 
    viewBox="0 0 1280 670.4" 
    x="0px" 
    y="0px" 
    style="enable-background:new 0 0 1280 1280;" 
    xml:space="preserve">
    <path 
      :class="fill" 
      d="M640,670.4c-16.3,0-31.9-6.2-43.4-17.2L18,100.1C-6,77.2-6,40,18,17.2c23.9-22.9,62.8-22.9,86.8,0L640,528.9l535.3-511.7
c23.9-22.9,62.8-22.9,86.8,0c24,22.9,23.9,60.1,0,82.9L683.4,653.3C671.9,664.3,656.3,670.4,640,670.4z"/>
  </svg>
</template>

<script>
export default {
  props: {
    direction: {
      default: 'down',
      type: String
    },
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

.component-SvgIconChevron {
  &.-left {
    transform: rotate(90deg);
    margin-right: 1px;
  }
  &.-right {
    transform: rotate(-90deg);
    margin-left: 1px;
  }
  &.-empty {
    visibility: hidden;
  }
}

.black {
  fill: $color--black;
}

.white {
  fill: lighten($color--white, 100%);
}

path {
  @include dapp-fill-colors;
  @include category-fill-colors;
}
</style>
