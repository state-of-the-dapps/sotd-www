<template>
  <div>
    <nuxt-link class="value" :to="{name: 'rankings-platform', params: { platform: platform.toLowerCase() }}">{{ platform }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    platform: {
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
