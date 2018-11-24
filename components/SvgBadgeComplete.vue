<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgBadgeComplete" 
    x="0px" 
    y="0px" 
    viewBox="0 0 1280 1152.7">
    <path 
      :class="fill" 
      d="M1271.3,211.8L479.4,1263.5c-16.5,21.4-48.2,22.1-65.4,1.4L9.5,775c-14.4-18-12.4-44.3,5.5-59.5l183-152.9
	c17.9-14.5,44-12.5,59.2,5.5l180.9,217.9L1016,16.7c13.8-18.7,39.9-22.1,58.5-8.3l189.2,143.9
	C1281.6,166.9,1285.7,193.9,1271.3,211.8z"/>
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

.gray {
  fill: $color--gray;
}
</style>
