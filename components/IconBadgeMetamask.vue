<template>
<svg :width="width" :height="height" x="0px" y="0px" viewBox="0 0 320 500">
  <path :class="fill" d="M170.6,301.6l35.8-9.6l-24.7-10.6L170.6,301.6z M138.3,281.4L113.6,292l35.8,9.6L138.3,281.4z M174.5,320.8h-29l-5.1,4.3
    l-3.1,20.3l4.7-2.7h36l4.7,2.7l-3.1-20.3L174.5,320.8z M254,316.4l-11.3,42.8l-43.8-13.8l-25.1,12.8h-27.6l-25.1-12.8l-43.8,13.8
    L66,316.3L79.8,276l-7.2-9.8l3.5-3.3l-7.2-5.9l5-2.2l-5.2-4.4l4.3-2.9l-5.5-29.8l9.3-27.8l56.6,24h53.2l56.6-24l9.3,27.8l-5.5,29.8
    l4.3,2.9l-5.2,4.4l5,2.2l-7.2,5.9l3.5,3.3l-7.2,9.8L254,316.4z"/>
</svg>
</template>

<script>
export default {
  props: {
    'fill': {
      default: 'purple',
      type: String
    },
    'height': {
      default: 20,
      type: Number
    },
    'width': {
      default: 20,
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.purple {
  fill: $color--purple;
}
</style>

