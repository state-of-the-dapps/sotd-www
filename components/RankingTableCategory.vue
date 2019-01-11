<template>
  <div>
    <nuxt-link
      v-if="category"
      :class="[
        category.toLowerCase() === $route.params.category ? 'is-selected' : '',
        '-' + category
      ]"
      :to="localePath({name: 'rankings-category', params: { category: category.toLowerCase() }})"
      class="value"
      @click.native="trackRankingCategory(category)">{{ $t(`categoryOptions.${$options.filters.capitalize(category)}`) }}</nuxt-link>
  </div>
</template>

<script>
import { trackDappCategoryFilter } from '~/helpers/mixpanel'

export default {
  props: {
    category: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    trackRankingCategory(category) {
      const sourceComponent = 'RankingTableCategory'
      const action = trackDappCategoryFilter(
        sourceComponent,
        this.$route.path,
        category
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.value {
  background: $color--gray;
  font-size: 1rem;
  padding: 5px;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  @include dapp-category-colors;
  &.is-selected {
    background: transparent;
    cursor: initial;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
