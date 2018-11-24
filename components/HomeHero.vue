<template>
  <div class="component-HomeHero">
    <div class="wrapper">
      <Menu color="white" />
      <div class="hero-wrapper">
        <HomeHeroContent/>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeroContent from './HomeHeroContent'
import Menu from './Menu'

export default {
  components: {
    HomeHeroContent,
    Menu
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-HomeHero {
  background-image: $gradient--main-1;
  color: lighten($color--white, 100%);
  padding: 10px 0 20px 0;
  @include tweakpoint('min-width', 575px) {
    background-image: $gradient--main-2;
    padding-top: 7px;
    padding-bottom: 22px;
  }
  /deep/ a {
    color: white;
  }
  /deep/ .results a {
    color: $color--black;
  }
}

.hero-wrapper {
  overflow: hidden;
  margin-right: -10px;
  margin-left: -10px;
  padding-left: 10px;
  padding-right: 10px;
  @include tweakpoint('min-width', 575px) {
    margin-right: -22px;
    margin-left: -22px;
    padding-left: 22px;
    padding-right: 22px;
  }
}

.wrapper {
  @include margin-wrapper-main;
}
</style>
