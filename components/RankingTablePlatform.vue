<template>
  <div class="RankingTablePlatform">
    <nuxt-link
      :class="platform.toLowerCase() === $route.params.platform ? 'is-selected' : ''"
      :to="localePath({name: 'rankings-platform', params: { platform: platform.toLowerCase() }})"
      class="value"
      @click.native="trackRankingPlatform(platform)">{{ platform }}</nuxt-link>
  </div>
</template>

<script>
import { trackDappPlatformFilter } from '~/helpers/mixpanel'

export default {
  props: {
    platform: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    trackRankingPlatform(platform) {
      const sourceComponent = 'RankingTablePlatform'
      const action = trackDappPlatformFilter(
        sourceComponent,
        this.$route.path,
        platform
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
  padding: 5px 8px;
  border-radius: 1000px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &.is-selected {
    background: transparent;
    padding: 0;
    cursor: initial;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
