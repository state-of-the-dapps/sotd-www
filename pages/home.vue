<template>
  <div class="page-home">
    <HomeHero/>
    <HomeEventList/>
    <DappFeaturedList/>
    <div class="wrapper">
      <h2 class="title-2">Collections</h2>
    </div>
    <DappCollectionPreview v-for="(collection, index) in collections" :key="index"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DappCollectionPreview from '~/components/DappCollectionPreview'
import DappFeaturedList from '~/components/DappFeaturedList'
import HomeEventList from '~/components/HomeEventList'
import HomeHero from '~/components/HomeHero'

export default {
  components: {
    DappCollectionPreview,
    DappFeaturedList,
    HomeEventList,
    HomeHero
  },
  computed: {
    ...mapGetters([
      'statDappCount'
    ])
  },
  data () {
    return {
      collections: [0, 1, 2]
    }
  },
  head () {
    return {
      title: 'State of the ÐApps — ' + this.statDappCount + ' Projects Built on Ethereum'
    }
  },
  layout: 'home'
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.wrapper {
  @include margin-wrapper-main;
}

.title-2 {
  margin-top: .5rem;
  margin-bottom: 1rem;
}
</style>
