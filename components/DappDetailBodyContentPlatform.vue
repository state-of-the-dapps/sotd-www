<template>
  <div class="DappDetailBodyContentPlatform">
    <div class="wrapper">
      <p class="description">
        <strong>{{ $t('platform') }}</strong> 
        &nbsp;
        <nuxt-link
          :to="localePath({
            name: 'rankings-platform',
            params: { platform: platform.toLowerCase()} })"
          class="platform-name"
          @click.native="trackPlatform(platform)">{{ platform }}</nuxt-link>
      </p>
      <div 
        v-if="platform && platform in platformSoftware"
        class="software-wrapper">
        <i18n
          :path="namespace('advise')"
          :places="{ platform: platform }"
          tag="span">
          <a
            :href="platformSoftware[platform].url"
            place="software"
            target="_blank"
            @click="trackDappPlatformSoftware(platformSoftware[platform].name, slug)">{{ platformSoftware[platform].name }}</a>
        </i18n>
      </div>
    </div>
  </div>
</template>

<script>
import { platformSoftware } from '~/helpers/constants'
import {
  trackDappPlatform,
  trackDappPlatformSoftware
} from '~/helpers/mixpanel'

export default {
  props: {
    platform: {
      type: String,
      required: true,
      default: ''
    },
    slug: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      platformSoftware: platformSoftware()
    }
  },
  methods: {
    trackPlatform(platform) {
      const action = trackDappPlatform(platform, this.slug)
      this.$mixpanel.track(action.name, action.data)
    },
    trackDappPlatformSoftware(platform, slug) {
      const action = trackDappPlatformSoftware(platform, slug)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
.description {
  margin-bottom: 0;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.platform-name {
  text-decoration: none;
  padding: 5px 8px;
  margin: 4px;
  background: lighten($color--gray, 2%);
  border-radius: 1000px;
}

.software-wrapper {
  margin-top: 10px;
  padding-top: 10px;
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
