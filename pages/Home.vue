<template>
  <div class="page">
    <HomeHero/>
    <FeaturedDappList/>
    <style>
      #cf {
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 24px !important;
      border-top: 1px solid rgba(51, 51, 51, 0.15);
      }
      @media screen and (min-width: 640px) {
      #cf {
      margin: 0px 22px;
      }
      }
      @media screen and (min-width: 1500px) {
      #cf {
      margin: 0 auto;
      width: calc(100% - 44px);
      max-width: 1500px;
      }
      }
      .cf-wrapper {
      margin-top: 24px !important;
      background: #f8f8f8;
      font-family: 'Overpass', sans-serif !important;
      margin-bottom: 24px !important;
      }
    </style>
    <div id="codefund" />
    <FeaturedSpotlight/>
    <FeaturedRankingByCategoryList/>
    <FeaturedCategoryList/>
    <FeaturedCollectionList/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FeaturedDappList from '@/components/FeaturedDappList'
import FeaturedCategoryList from '@/components/FeaturedCategoryList'
import FeaturedRankingByCategoryList from '@/components/FeaturedRankingByCategoryList'
import FeaturedCollectionList from '@/components/FeaturedCollectionList'
import FeaturedSpotlight from '@/components/FeaturedSpotlight'
import HomeHero from '@/components/HomeHero'

export default {
  components: {
    FeaturedCollectionList,
    FeaturedDappList,
    FeaturedCategoryList,
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
        ' blockchain apps for Ethereum, Steem, Hive, EOS, and more',
      script: [
        {
          src:
            'https://codefund.app/properties/232/funder.js?template=horizontal&theme=horizontal',
          async: true
        }
      ]
    }
  }
}
</script>
