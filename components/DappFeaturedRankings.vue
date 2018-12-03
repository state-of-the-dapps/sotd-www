<template>
  <div class="component-DappFeaturedList">
    <div class="wrapper">
      <h2 class="title-2">
        <nuxt-link 
          :to="{ name: 'rankings' }" 
          class="header-cta" 
          @click.native="trackDappRankingCategory('all')">
          <img 
            src="~/assets/images/icons/categories.png" 
            width="16" 
            class="icon">Rankings by Category
        </nuxt-link>
        <nuxt-link 
          :to="{ name: 'rankings' }" 
          class="cta" 
          @click.native="trackDappRankingCategory('all')">View all categories
          <SvgIconChevron 
            :width="8" 
            :height="8" 
            direction="right" />
        </nuxt-link>
      </h2>
      <div class="categories">
        <DappFeaturedRankingCategory
          v-for="(category, index) in categories"
          :key="index"
          :category="category"/>
      </div>
    </div>
  </div>
</template>

<script>
import { trackDappRankingCategory } from '~/helpers/mixpanel'
import DappFeaturedListItem from './DappFeaturedListItem'
import DappFeaturedRankingCategory from './DappFeaturedRankingCategory'
import SvgIconChevron from './SvgIconChevron'
import SvgIconFeatured from './SvgIconFeatured'

export default {
  components: {
    DappFeaturedListItem,
    DappFeaturedRankingCategory,
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
      const sourceComponent = 'DappFeaturedRankings'
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

.component-DappFeaturedList {
  margin-bottom: 10px;
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

.header-cta {
  text-decoration: none;
}

.icon {
  margin-right: 7px;
}

.cta {
  position: relative;
  bottom: 4px;
  display: inline-block;
  font-family: 'Overpass';
  font-size: 1rem;
  letter-spacing: -0.25px;
  margin-left: 12px;
  text-decoration: none;
  &.-promote {
    position: absolute;
    right: 0;
    bottom: 10px;
    text-decoration: underline;
  }
}

.title-2 {
  position: relative;
  font-size: 2.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba($color--black, 0.15);
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
  padding-bottom: 1.05rem;
}
</style>
