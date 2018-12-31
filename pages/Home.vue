<template>
  <div class="PageHome">
    <HomeHero/>
    <FeaturedDappList/>
    <FeaturedRankingByPlatformList/>
    <FeaturedCategoryList/>
    <FeaturedRankingByCategoryList/>
    <HomeFeaturedCollections/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FeaturedDappList from '@/components/FeaturedDappList'
import FeaturedCategoryList from '@/components/FeaturedCategoryList'
import FeaturedRankingByPlatformList from '@/components/FeaturedRankingByPlatformList'
import FeaturedRankingByCategoryList from '@/components/FeaturedRankingByCategoryList'
import HomeFeaturedCollections from '@/components/HomeFeaturedCollections'
import HomeHero from '@/components/HomeHero'

export default {
  components: {
    HomeFeaturedCollections,
    FeaturedDappList,
    FeaturedCategoryList,
    FeaturedRankingByPlatformList,
    FeaturedRankingByCategoryList,
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
  }
}
</script>
