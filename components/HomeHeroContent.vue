<template>
  <div class="component-HomeHeroContent">
    <HomeHeroContentIcons/>
    <HomeHeroContentIntro/>
  </div>
</template>

<script>
import HomeHeroContentIcons from './HomeHeroContentIcons'
import HomeHeroContentIntro from './HomeHeroContentIntro'

export default {
  components: {
    HomeHeroContentIcons,
    HomeHeroContentIntro
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-HomeHeroContent {
  @include tweakpoint('min-width', 575px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-top: 30px;
    .component-HomeHeroContentIntro {
      width: 400px;
    }
    .component-HomeHeroContentIcons {
      flex-grow: 1;
    }
  }
  @include tweakpoint('min-width', 1150px) {
    .component-HomeHeroContentIntro {
      width: 500px;
    }
  }
  @include tweakpoint('min-width', 1250px) {
    .component-HomeHeroContentIntro {
      width: 650px;
      margin: 40px auto;
    }
  }
  @include tweakpoint('min-width', 1400px) {
    .component-HomeHeroContentIcons {
      position: absolute;
      top: 75px;
      left: 0;
      width: 100%;
    }
  }
}
</style>
