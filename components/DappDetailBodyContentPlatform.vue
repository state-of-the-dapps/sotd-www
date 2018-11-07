<template>
<div class="component-DappDetailBodyContentRank">
  <div class="wrapper">
    <p class="description">
      <strong>Platform</strong> 
      &nbsp;
      <nuxt-link
        @click.native="trackPlatform(platform)"
        :to="{
          name: 'rankings-platform',
          params: { platform: platform.toLowerCase()} }">{{ platform }}</nuxt-link>
    </p>
    <div class="software-wrapper" v-if="platform">
      To use {{ platform }} ÐApps on the web, you'll need a browser add-on such as 
      <a
        :href="platformSoftware[platform].url"
        target="_blank"
        @click="trackDappPlatformSoftware(platformSoftware[platform].name, slug)">{{ platformSoftware[platform].name }}</a>
    </div>
  </div>
</div>
</template>

<script>
import { platformSoftware } from '~/helpers/constants'
import { trackDappPlatform, trackDappPlatformSoftware } from '~/helpers/mixpanel'

export default {
  props: ['platform', 'slug'],
  data () {
    return {
      platformSoftware
    }
  },
  methods: {
    trackPlatform (platform) {
      const action = trackDappPlatform(platform, this.slug)
      this.$mixpanel.track(action.name, action.data)
    },
    trackDappPlatformSoftware (platform, slug) {
      const action = trackDappPlatformSoftware(platform, slug)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin-bottom: 0;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.software-wrapper {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed darken($color--gray, 3%);
  font-size: 1rem;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
