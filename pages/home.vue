<template>
  <div class="page-home">
    <HomeHero/>
    <HomeEventList/>
    <DappFeaturedList/>
    <HomeFeaturedCollections/>
    <SecondaryCta/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DappFeaturedList from '~/components/DappFeaturedList'
import HomeEventList from '~/components/HomeEventList'
import HomeFeaturedCollections from '~/components/HomeFeaturedCollections'
import HomeHero from '~/components/HomeHero'
import SecondaryCta from '~/components/SecondaryCta'

export default {
  components: {
    HomeFeaturedCollections,
    DappFeaturedList,
    HomeEventList,
    HomeHero,
    SecondaryCta
  },
  computed: {
    ...mapGetters([
      'statDappCount'
    ])
  },
  head () {
    return {
      title: 'State of the ÐApps — ' + this.statDappCount + ' Projects Built on Ethereum'
    }
  }
}
</script>
