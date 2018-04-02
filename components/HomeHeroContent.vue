<template>
<div class="component-HomeHeroContent">
  <HomeHeroContentIcons/>
  <HomeHeroContentIntro/>
</div>
</template>

<script>
import HomeHeroContentIcons from '~/components/HomeHeroContentIcons'
import HomeHeroContentIntro from '~/components/HomeHeroContentIntro'

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
  @include tweakpoint('min-width', 640px) {
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
}
</style>
