<template>
  <div class="component-HomeHeroContent">
    <HomeHeroContentIntro/>
    <HomeHeroContentIcons/>
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

