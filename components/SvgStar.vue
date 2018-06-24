<template>
  <svg class="component-SvgStar" :width="width" :height="height" viewBox="0 0 51 48">
    <path fill="none" stroke="#fafafa" stroke-width="2px" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      default: 22
    },
    height: {
      default: 21
    }
  }
}
</script>

