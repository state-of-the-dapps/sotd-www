<template>
  <div class="DappDetailBodyContentCategories">
    <div class="wrapper">
      <h4 class="subtitle">{{ $tc('category', 2) }}</h4>
      <ul class="category-list">
        <li 
          v-for="(category, index) in categories" 
          :key="index" 
          class="category-item">
          <nuxt-link 
            :to="localePath({name: 'rankings-category', params: {category: category}})" 
            :class="'-' + category" 
            class="category-link" 
            @click.native="trackDappCategory(category)">{{ $t(`categoryOptions.${$options.filters.capitalize(category)}`) }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { trackDappCategory } from '~/helpers/mixpanel'

export default {
  props: {
    slug: {
      type: String,
      required: true,
      default: ''
    },
    categories: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    trackDappCategory(category) {
      const action = trackDappCategory(category, this.slug)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
.subtitle {
  font-weight: normal;
  margin-bottom: 0.75rem;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
  justify-content: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.category-link {
  text-decoration: none;
  display: block;
  padding: 5px 8px;
  margin: 4px;
  background: lighten($color--gray, 2%);
  border-radius: 4px;
  @include dapp-category-colors;
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
