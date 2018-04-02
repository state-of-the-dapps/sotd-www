<template>
  <div class="page-home">
    <HomeHero/>
    <HomeEventList/>
  </div>
</template>

<script>
import HomeEventList from '~/components/HomeEventList'
import HomeHero from '~/components/HomeHero'

export default {
  components: {
    HomeEventList,
    HomeHero
  },
  layout: 'home'
}
</script>
