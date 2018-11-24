<template>
  <div>
    <nuxt-link
      :class="platform.toLowerCase() === $route.params.platform ? 'is-selected' : ''"
      :to="{name: 'rankings-platform', params: { platform: platform.toLowerCase() }}"
      class="value"
      @click.native="trackRankingPlatform(platform)">{{ platform }}</nuxt-link>
  </div>
</template>

<script>
import { trackDappRankingPlatform } from '~/helpers/mixpanel'

export default {
  props: {
    platform: {
      type: String,
      required: true
    }
  },
  methods: {
    trackRankingPlatform(platform) {
      const sourceComponent = 'RankingTablePlatform'
      const action = trackDappRankingPlatform(
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
@import '~assets/css/settings';

.value {
  background: $color--gray;
  font-size: 1rem;
  padding: 5px;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &.is-selected {
    background: transparent;
    cursor: initial;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
