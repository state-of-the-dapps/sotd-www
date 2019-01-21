<template>
  <div class="PageHome">
    <HomeHero/>
    <FeaturedDappList/>
    <FeaturedRankingByPlatformList/>
    <FeaturedCategoryList/>
    <FeaturedRankingByCategoryList/>
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
import HomeHero from '@/components/HomeHero'

export default {
  components: {
    FeaturedCollectionList,
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
        ' Blockchain Apps for Ethereum, Steem, EOS, and More'
    }
  }
}
</script>
