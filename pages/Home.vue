<template>
  <LayoutHome>
    <div class="page-home">
      <HomeHero/>
      <DappFeaturedList/>
      <DappFeaturedPlatforms/>
      <DappFeaturedCategories/>
      <DappFeaturedRankings/>
      <HomeFeaturedCollections/>
    </div>
  </LayoutHome>
</template>

<script>
import { mapGetters } from 'vuex'
import DappFeaturedList from '~/components/DappFeaturedList'
import DappFeaturedCategories from '~/components/DappFeaturedCategories'
import DappFeaturedPlatforms from '~/components/DappFeaturedPlatforms'
import DappFeaturedRankings from '~/components/DappFeaturedRankings'
import HomeFeaturedCollections from '~/components/HomeFeaturedCollections'
import HomeHero from '~/components/HomeHero'
import LayoutHome from '~/components/LayoutHome'

export default {
  components: {
    HomeFeaturedCollections,
    DappFeaturedList,
    DappFeaturedCategories,
    DappFeaturedPlatforms,
    DappFeaturedRankings,
    HomeHero,
    LayoutHome
  },
  computed: {
    ...mapGetters(['statDappCount'])
  },
  head() {
    return {
      title:
        'State of the ÐApps — A List of ' +
        this.statDappCount.toLocaleString() +
        ' Projects Built on Ethereum, EOS & POA'
    }
  },
  mounted() {
    this.$store.dispatch('setSiteSection', '')
  }
}
</script>
