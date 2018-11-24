<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgBadgeStatus" 
    x="0px" 
    y="0px" 
    viewBox="0 0 1280 1280">
    <path 
      :class="fill" 
      d="M362.6,1280C138.7,1280,0,1158.7,0,985.7s133.9-289.5,427.1-289.5c247.9,0,331,29,567.9,20C995,853.3,787.6,1280,362.6,1280
	z M852.2,583.1c-248.6,0-331-29-567.9-20C284.3,426,492.4,0,917.4,0C1141.3,0,1280,121.3,1280,294.3
	C1279.3,466,1145.4,583.1,852.2,583.1z"/>
  </svg>
</template>

<script>
export default {
  props: {
    fill: {
      default: 'purple',
      type: String
    },
    height: {
      default: 18,
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
