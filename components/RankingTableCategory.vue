<template>
  <div>
    <nuxt-link v-if="category" class="value" :to="{name: 'rankings-category', params: { category: category.toLowerCase() }}">{{ category | capitalize }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.value {
  background: $color--gray;
  font-weight: 600;
  text-transform: uppercase;
  font-size: .8rem;
  padding: 5px;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>

