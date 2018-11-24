<template>
  <div class="component-dapp-featured-categories">
    <div class="wrapper">
      <ul class="category-list">
        <li
          v-for="(category, index) in categories"
          :key="index"
          class="category-item">
          <nuxt-link 
            :to="{name: 'rankings-category', params: {category}}"
            :class="'-' + category.toLowerCase()"
            class="category-link"
            @click.native="trackFeaturedCategory(category)">{{ category | capitalize }}</nuxt-link>
        </li>
        <li class="category-item">
          <nuxt-link
            :to="{name: 'rankings'}"
            class="category-link"
            @click.native="trackFeaturedCategory('all')">All categories</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { trackFeaturedCategory } from '~/helpers/mixpanel'

export default {
  data() {
    return {
      categories: ['games', 'finance', 'exchanges']
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
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  @include tweakpoint('min-width', 640px) {
    width: calc(25% - 20px);
  }
}

.category-link {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  box-shadow: 0 10px 30px rgba($color--black, 0.1);
  background: $color--white;
  padding: 2rem 0;
  border-radius: 4px;
  color: $color--purple;
  @include dapp-category-colors;
}

.category-list {
  margin: 0 -10px;
  @include tweakpoint('min-width', 640px) {
    display: flex;
  }
}

.wrapper {
  @include margin-wrapper-main;
  border-top: 1px solid rgba($color--black, 0.15);
  position: relative;
  padding: 1.5rem 0;
}
</style>
