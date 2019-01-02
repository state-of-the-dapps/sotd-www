<template>
  <div class="FeaturedRankingByCategoryList">
    <div class="wrapper">
      <SectionHeading
        :cta-route="{ name: 'rankings' }"
        :heading="$t(namespace('heading'))"
        :heading-route="{ name: 'rankings' }"
        :cta-text="$t('cta.viewAll')"
        @clickCta="trackDappRankingCategory('all')"
        @clickHeading="trackDappRankingCategory('all')">
        <template slot="icon">
          <img 
            src="~/assets/images/icons/categories.png" 
            width="16">
        </template>
      </SectionHeading>
      <div class="categories">
        <FeaturedRankingByCategoryListItem
          v-for="(category, index) in categories"
          :key="index"
          :category="category"/>
      </div>
    </div>
  </div>
</template>

<script>
import { trackDappRankingCategory } from '@/helpers/mixpanel'
import FeaturedRankingByCategoryListItem from './FeaturedRankingByCategoryListItem'
import SectionHeading from './SectionHeading'
import SvgIconChevron from './SvgIconChevron'
import SvgIconFeatured from './SvgIconFeatured'

export default {
  components: {
    FeaturedRankingByCategoryListItem,
    SectionHeading,
    SvgIconChevron,
    SvgIconFeatured
  },
  data() {
    return {
      categories: [],
      sourcePath: this.$route.path
    }
  },
  mounted() {
    this.$axios.get('categories').then(response => {
      const items = response.data.items
      const categoryNum = 4
      let categories = []
      for (let i = 0; i < categoryNum; i++) {
        let randomItemIndex = Math.floor(Math.random() * items.length)
        let category = items.splice(randomItemIndex, 1)
        categories = categories.concat(category)
      }
      this.categories = categories
    })
  },
  methods: {
    trackDappRankingCategory(category) {
      const sourceComponent = 'FeaturedRankingByCategoryList'
      const action = trackDappRankingCategory(
        sourceComponent,
        this.sourcePath,
        category
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.categories {
  margin: 0 -10px;
  display: flex;
  flex-wrap: wrap;
}

.component-SvgIconFeatured {
  margin-right: 7px;
}

.featured-list-wrapper {
  position: relative;
  margin-left: -10px;
  margin-right: -10px;
  flex: 1;
}

.featured-list {
  display: flex;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
    display: none;
  }
}

.featured-list-spacer {
  width: 10px;
}

.featured-wrapper {
  @include tweakpoint('min-width', 750px) {
    display: flex;
  }
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
}
</style>
