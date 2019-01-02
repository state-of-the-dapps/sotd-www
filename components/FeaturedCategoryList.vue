<template>
  <div class="FeaturedCategoryList">
    <div class="wrapper">
      <ul class="category-list">
        <li
          v-for="(category, index) in categories"
          :key="index"
          class="category-item">
          <nuxt-link 
            :to="localePath({name: 'rankings-category', params: {category: category.name}})"
            :class="'-' + category.name.toLowerCase()"
            class="category-link"
            @click.native="trackFeaturedCategory(category.name)"><component :is="category.iconComponent"/><span class="category-text">{{ $t(namespace(category.name)) | capitalize }}</span></nuxt-link>
        </li>
        <li class="category-item all">
          <nuxt-link
            :to="localePath({name: 'rankings'})"
            class="category-link all"
            @click.native="trackFeaturedCategory('all')">{{ $t(namespace('allCategories')) }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { trackFeaturedCategory } from '@/helpers/mixpanel'
import SvgCategoryExchanges from './SvgCategoryExchanges'
import SvgCategoryFinance from './SvgCategoryFinance'
import SvgCategoryGames from './SvgCategoryGames'

export default {
  components: {
    SvgCategoryExchanges,
    SvgCategoryFinance,
    SvgCategoryGames
  },
  data() {
    return {
      categories: [
        {
          name: 'games',
          iconComponent: 'SvgCategoryGames'
        },
        {
          name: 'finance',
          iconComponent: 'SvgCategoryFinance'
        },
        {
          name: 'exchanges',
          iconComponent: 'SvgCategoryExchanges'
        }
      ]
    }
  },
  methods: {
    trackFeaturedCategory(category) {
      const action = trackFeaturedCategory(category)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.category-item {
  margin: 10px;
  font-size: 1.325rem;
  font-weight: 600;
  @include tweakpoint('min-width', 750px) {
    width: calc(25% - 20px);
  }
}

.category-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 30px rgba($color--black, 0.1);
  background: $color--white;
  padding: 1.5rem 20px;
  border-radius: 4px;
  color: $color--purple;
  @include dapp-category-colors;
}

.category-list {
  margin: 0 -10px;
  @include tweakpoint('min-width', 750px) {
    display: flex;
  }
}

.category-text {
  padding-left: 10px;
}

.wrapper {
  @include margin-wrapper-main;
  border-top: 1px solid rgba($color--black, 0.15);
  position: relative;
  padding: 1.5rem 0 0 0;
}
</style>
