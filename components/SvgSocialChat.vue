<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgSocialChat" 
    x="0px" 
    y="0px" 
    viewBox="0 0 512 512">
    <path 
      :class="fill" 
      d="M256,21.3c62.7,0,121.6,24.4,166,68.7c44.3,44.3,68.7,103.3,68.7,166S466.3,377.6,422,422
    c-44.3,44.3-103.3,68.7-166,68.7S134.4,466.3,90,422c-44.3-44.3-68.7-103.3-68.7-166S45.7,134.4,90,90
    C134.4,45.7,193.4,21.3,256,21.3 M256,0C114.7,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0L256,0z
    M355.5,149.5H156.6c-30.4,0-55.1,24.7-55.1,55.1v72.7c0,30.4,24.7,55.1,55.1,55.1h50.6c14.4,0,28.3,5.7,38.5,15.9l44.8,44.8
    c3.9,3.9,10.6,1.1,10.6-4.4v-39.3c0-9.4,7.6-17.1,17.1-17.1h37.3c30.4,0,55.1-24.7,55.1-55.1v-72.6
    C410.6,174.2,385.9,149.5,355.5,149.5z"/>
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
      default: 24,
      type: Number
    },
    width: {
      default: 24,
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
