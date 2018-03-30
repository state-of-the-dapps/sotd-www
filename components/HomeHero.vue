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
  background-image: $gradient--hero;
  color: lighten($color--white, 100%);
}

.wrapper {
  @include margin-wrapper-main
}
</style>

