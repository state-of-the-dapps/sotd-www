<template>
<div class="component-HomeHero">
  <div class="wrapper">
    <Menu color="white" />
    <HomeHeroContent/>
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
  overflow: hidden;
  @include tweakpoint('min-width', 575px) {
    background-image: $gradient--main-2;
    padding-top: 7px;
    padding-bottom: 22px;
  }
  /deep/ a {
    color: white;
  }
}

.wrapper {
  @include margin-wrapper-main;
}
</style>

