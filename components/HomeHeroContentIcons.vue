<template>
  <div class="component-HomeHeroContentIcons">
    <HomeHeroContentIconsItem v-for="(status, index) in cards" 
      :key="index"
      :index="index"
      :status="status"
    />
  </div>
</template>

<script>
import HomeHeroContentIconsItem from '~/components/HomeHeroContentIconsItem'

export default {
  data () {
    return {
      cards: [
        'live',
        'concept',
        'live',
        'beta',
        'live',
        'live',
        'live',
        'live',
        'live',
        'beta',
        'live',
        'beta',
        'wip',
        'wip'
      ]
    }
  },
  components: {
    HomeHeroContentIconsItem
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-HomeHeroContentIcons {
  position: relative;
  bottom: 0;
  left: 30px;
  height: 270px;
  @include tweakpoint('min-width', 575px) {
    left: 0;
    bottom: 10px;
  }
  @include tweakpoint('min-width', 1400px) {
    bottom: 25px;
  }
}

.card {
  position: absolute;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 7px 7px 40px rgba($color--black, .3);
  transform-origin: bottom left;
  z-index: 5;
  color: $color--purple;
  transition: opacity 1s ease;
  opacity: 0;
  &.is-active {
    opacity: 1;
  }
  &.is-waiting {
    opacity: 0;
  }
  &.-dapp-0 {
    transform: scale(.55);
    bottom: 50px;
    left: 0;
    z-index: 1;
    &.is-active {
      transition-delay: 2s;
    }
  }
  &.-dapp-1 {
    transform: scale(.4);
    bottom: 130px;
    left: 77px;
    z-index: 2;
    &.is-active {
      transition-delay: 2.2s;
    }
  }
  &.-dapp-2 {
    transform: scale(.4);
    bottom: 37px;
    left: 125px;
    z-index: 4;
    &.is-active {
      transition-delay: 1.8s;
    }
  }
  &.-dapp-3 {
    transform: scale(.57);
    bottom: 114px;
    left: 157px;
    z-index: 3;
    &.is-active {
      transition-delay: 1.2s;
    }
  }
  &.-dapp-4 {
    transform: scale(.29);
    bottom: 45px;
    left: 216px;
    z-index: 3;
    &.is-active {
      transition-delay: 2.75s;
    }
  }
  &.-dapp-5 {
    transform: scale(.46);
    bottom: 83px;
    left: 257px;
    z-index: 3;
    &.is-active {
      transition-delay: 2s;
    }
  }
  &.-dapp-6 {
    transform: scale(.35);
    bottom: 5px;
    left: 298px;
    z-index: 3;
    &.is-active {
      transition-delay: 1.5s;
    }
  }
  &.-dapp-7 {
    transform: scale(0.46);
    bottom: 150px;
    left: 337px;
    z-index: 3;
    &.is-active {
      transition-delay: 1.75s;
    }
  }
  &.-dapp-8 {
    transform: scale(0.57);
    bottom: 25px;
    left: 361px;
    z-index: 3;
    &.is-active {
      transition-delay: 2.2s;
    }
  }
  &.-dapp-9 {
    transform: scale(0.46);
    bottom: 146px;
    left: 444px;
    z-index: 1;
    &.is-active {
      transition-delay: 2.4s;
    }
  }
  &.-dapp-10 {
    transform: scale(0.46);
    bottom: 63px;
    left: 486px;
    z-index: 4;
    &.is-active {
      transition-delay: 1.9s;
    }
  }
  &.-dapp-11 {
    transform: scale(0.57);
    bottom: 0px;
    left: 563px;
    z-index: 3;
    &.is-active {
      transition-delay: 2.6s;
    }
  }
  &.-dapp-12 {
    transform: scale(0.57);
    bottom: 127px;
    left: 575px;
    z-index: 1;
    &.is-active {
      transition-delay: 1.6s;
    }
  }
  &.-dapp-13 {
    transform: scale(0.55);
    bottom: 81px;
    left: 645px;
    z-index: 2;
    &.is-active {
      transition-delay: 1.4s;
    }
  }
}
</style>

