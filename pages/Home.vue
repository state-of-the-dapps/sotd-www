<template>
<LayoutHome>
  <div class="page-home">
    <HomeHero/>
    <DappFeaturedList/>
    <DappFeaturedRankings/>
    <HomeFeaturedCollections/>
  </div>
</LayoutHome>
</template>

<script>
import { mapGetters } from 'vuex'
import DappFeaturedList from '~/components/DappFeaturedList'
import DappFeaturedRankings from '~/components/DappFeaturedRankings'
import HomeFeaturedCollections from '~/components/HomeFeaturedCollections'
import HomeHero from '~/components/HomeHero'
import LayoutHome from '~/components/LayoutHome'

export default {
  components: {
    HomeFeaturedCollections,
    DappFeaturedList,
    DappFeaturedRankings,
    HomeHero,
    LayoutHome
  },
  computed: {
    ...mapGetters([
      'statDappCount'
    ])
  },
  head () {
    return {
      title: 'State of the ÐApps — A List of ' + this.statDappCount.toLocaleString() + ' Projects Built on Ethereum'
    }
  },
  mounted () {
    this.$store.dispatch('setSiteSection', '')
  }
}
</script>
