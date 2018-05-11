<template>
  <div class="page-home">
    <HomeHero/>
    <HomeEventList/>
    <DappFeaturedList/>
    <HomeFeaturedCollections/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DappFeaturedList from '~/components/DappFeaturedList'
import HomeEventList from '~/components/HomeEventList'
import HomeFeaturedCollections from '~/components/HomeFeaturedCollections'
import HomeHero from '~/components/HomeHero'

export default {
  components: {
    HomeFeaturedCollections,
    DappFeaturedList,
    HomeEventList,
    HomeHero
  },
  computed: {
    ...mapGetters([
      'statDappCount'
    ])
  },
  head () {
    return {
      title: 'State of the ÐApps — ' + this.statDappCount.toLocaleString() + ' Projects Built on Ethereum'
    }
  },
  layout: 'home',
  mounted () {
    this.$store.dispatch('setSiteSection', '')
  }
}
</script>
