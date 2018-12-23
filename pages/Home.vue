<template>
  <div class="page-home">
    <HomeHero/>
    <DappFeaturedList/>
    <DappFeaturedPlatforms/>
    <DappFeaturedCategories/>
    <DappFeaturedRankings/>
    <HomeFeaturedCollections/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DappFeaturedList from '~/components/DappFeaturedList'
import DappFeaturedCategories from '~/components/DappFeaturedCategories'
import DappFeaturedPlatforms from '~/components/DappFeaturedPlatforms'
import DappFeaturedRankings from '~/components/DappFeaturedRankings'
import HomeFeaturedCollections from '~/components/HomeFeaturedCollections'
import HomeHero from '~/components/HomeHero'

export default {
  components: {
    HomeFeaturedCollections,
    DappFeaturedList,
    DappFeaturedCategories,
    DappFeaturedPlatforms,
    DappFeaturedRankings,
    HomeHero
  },
  layout: 'home',
  computed: {
    ...mapGetters(['statDappCount'])
  },
  head() {
    return {
      title:
        'State of the ÐApps — A List of ' +
        this.statDappCount.toLocaleString() +
        ' Projects Built on Ethereum, EOS, POA & Steem'
    }
  },
  mounted() {
    this.$store.dispatch('setSiteSection', '')
  }
}
</script>
