<template>
  <svg 
    :width="width" 
    :height="height" 
    class="component-SvgIconLogo" 
    viewBox="0 0 512 512">
    <path 
      :class="fill" 
      d="M492.3,512.1H19.7C8.8,512.1,0,503.3,0,492.4V19.6C0,8.8,8.8,0,19.7,0h472.6C503.2,0,512,8.8,512,19.6v472.6
	C512.1,503.1,503.3,512.1,492.3,512.1z M178.6,366.8c0,11.5-1,15.5-10,15.5h-3c-9.5,0-10.5-4-10.5-15.5v-69.9h-50.4v76.3
	c0,46.4,11,59.9,53.4,59.9h21c42.4,0,53.4-13.5,53.4-59.9v-44.4c0-45.4-12-62.4-42.9-95.8c-25-26.5-31.4-36-31.4-60.9v-27.9
	c0-10.5,1.4-14.5,10.5-14.5h3c8.9,0,10.5,4,10.5,15.5v55.9h50.4v-62.4c0-46.4-11-59.9-53.4-59.9h-21c-42.4,0-53.4,13.5-53.4,59.9
	V170c0,45.4,11.5,62.4,42.4,96.4c25,26,31.4,36,31.4,60.4V366.8z M263.7,430.7h90.1c42.4,0,53.4-13.5,53.4-59.9V141.1
	c0-46.4-11-59.9-53.4-59.9h-90.1v149.3h-20.2v50.8h20.2V430.7z M317.5,379.7v-98.3H341v-50.8h-23.3v-98.3h25.2
	c9.5,0,10.5,4,10.5,15.5v216.6c0,11.5-1,15.5-10.5,15.5H317.5z"/>
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
      default: 45,
      type: Number
    },
    width: {
      default: 45,
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
