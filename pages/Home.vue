<template>
  <div class="page">
    <HomeHero/>
    <FeaturedDappList/>
    <FeaturedSpotlight/>
    <FeaturedRankingByPlatformList/>
    <FeaturedRankingByCategoryList/>
    <FeaturedCategoryList/>
    <FeaturedCollectionList/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FeaturedDappList from '@/components/FeaturedDappList'
import FeaturedCategoryList from '@/components/FeaturedCategoryList'
import FeaturedRankingByPlatformList from '@/components/FeaturedRankingByPlatformList'
import FeaturedRankingByCategoryList from '@/components/FeaturedRankingByCategoryList'
import FeaturedCollectionList from '@/components/FeaturedCollectionList'
import FeaturedSpotlight from '@/components/FeaturedSpotlight'
import HomeHero from '@/components/HomeHero'

export default {
  components: {
    FeaturedCollectionList,
    FeaturedDappList,
    FeaturedCategoryList,
    FeaturedRankingByPlatformList,
    FeaturedRankingByCategoryList,
    FeaturedSpotlight,
    HomeHero
  },
  layout: 'home',
  computed: {
    ...mapGetters(['statDappCount'])
  },
  head() {
    return {
      title:
        'State of the DApps — A list of ' +
        this.statDappCount.toLocaleString() +
        ' blockchain apps for Ethereum, Steem, EOS, and more'
    }
  }
}
</script>
