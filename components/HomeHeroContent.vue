<template>
  <div class="HomeHeroContent">
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
.HomeHeroContent {
  @include tweakpoint('min-width', 575px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-top: 30px;
    .HomeHeroContentIntro {
      width: 400px;
    }
    .HomeHeroContentIcons {
      flex-grow: 1;
    }
  }
  @include tweakpoint('min-width', 1150px) {
    .HomeHeroContentIntro {
      width: 500px;
    }
  }
  @include tweakpoint('min-width', 1250px) {
    .HomeHeroContentIntro {
      width: 650px;
      margin: 40px auto;
    }
  }
  @include tweakpoint('min-width', 1400px) {
    .HomeHeroContentIcons {
      position: absolute;
      top: 75px;
      left: 0;
      width: 100%;
    }
  }
}
</style>
