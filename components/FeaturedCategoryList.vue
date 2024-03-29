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
            @click.native="trackFeaturedCategory(category.name)">
            <span class="icon-wrapper">
              <component
                :is="category.iconComponent"
                :fill="category.color"/>
            </span>
            <span class="category-text">{{ $t(namespace(category.name)) | capitalize }}</span>
          </nuxt-link>
        </li>
        <li class="category-item all">
          <nuxt-link
            :to="localePath({name: 'rankings'})"
            class="category-link all"
            @click.native="trackFeaturedCategory('all')">
            <span class="icon-wrapper">
              <IconAllCategories
                :width="22"
                :height="22"
                fill="white"
              />
            </span>
          <span class="category-text">{{ $t(namespace('allCategories')) }}</span></nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { trackFeaturedCategory } from '@/helpers/mixpanel'
import IconAllCategories from './IconAllCategories'
import IconCategoryExchanges from './IconCategoryExchanges'
import IconCategoryFinance from './IconCategoryFinance'
import IconCategoryGames from './IconCategoryGames'

export default {
  components: {
    IconAllCategories,
    IconCategoryExchanges,
    IconCategoryFinance,
    IconCategoryGames
  },
  data() {
    return {
      categories: [
        {
          name: 'games',
          iconComponent: 'IconCategoryGames',
          color: 'peach'
        },
        {
          name: 'defi',
          iconComponent: 'IconCategoryFinance',
          color: 'blue'
        },
        {
          name: 'nft',
          iconComponent: 'IconCategoryExchanges',
          color: 'purple'
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
.FeaturedCategoryList {
  padding-top: 2rem;
}

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
  justify-content: left;
  text-decoration: none;
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 30px rgba($color--black, 0.1);
  background: $color--white;
  padding: 0.75rem 13px;
  border-radius: 4px;
  color: $color--purple;
  @include category-bg-colors;
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

.icon-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color--purple;
  border-radius: 50%;
}

.wrapper {
  @include margin-wrapper-main;
  border-top: 1px solid rgba($color--black, 0.15);
  position: relative;
  padding: 2rem 0 0 0;
}
</style>
