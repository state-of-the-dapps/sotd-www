<template>
  <div class="component-HomeHero">
    <div class="wrapper">
      <Menu/>
      <HomeHeroContent/>
    </div>
  </div>
</template>

<script>
import HomeHeroContent from '~/components/HomeHeroContent'
import Menu from '~/components/Menu'

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
  background-image: $gradient--hero-1;
  color: lighten($color--white, 100%);
  padding: 10px 0 20px 0;
  @include tweakpoint('min-width', 575px) {
    background-image: $gradient--hero-2;
    padding-top: 17px;
    padding-bottom: 22px;
  }
  /deep/ a {
    color: white;
  }
}

.wrapper {
  @include margin-wrapper-main
}
</style>

