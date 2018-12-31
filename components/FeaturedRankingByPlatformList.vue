<template>
  <div class="FeaturedRankingByPlatformList">
    <div class="wrapper">
      <SectionHeading
        :cta-route="{ name: 'rankings' }"
        :heading="$t(namespace('heading'))"
        :heading-is-translated="$te(namespace('heading'))"
        :heading-route="{ name: 'rankings' }"
        cta-text="View all"
        @clickCta="trackDappRankingPlatform('all')"
        @clickHeading="trackDappRankingPlatform('all')">
        <template slot="icon">
          <img 
            src="~/assets/images/icons/platforms.png" 
            width="16">
        </template>
      </SectionHeading>
      <div class="platforms">
        <FeaturedRankingByPlatformListItem
          v-for="(platform, index) in platforms"
          :key="index"
          :platform="platform"/>
      </div>
    </div>
  </div>
</template>

<script>
import { componentNamespace } from '@/helpers/mixins'
import { platformList } from '@/helpers/constants'
import { trackDappRankingPlatform } from '@/helpers/mixpanel'
import FeaturedRankingByPlatformListItem from './FeaturedRankingByPlatformListItem'
import SectionHeading from './SectionHeading'
import SvgIconChevron from './SvgIconChevron'
import SvgIconFeatured from './SvgIconFeatured'

export default {
  components: {
    FeaturedRankingByPlatformListItem,
    SectionHeading,
    SvgIconChevron,
    SvgIconFeatured
  },
  mixins: [componentNamespace],
  data() {
    return {
      platforms: platformList,
      sourcePath: this.$route.path
    }
  },
  methods: {
    trackDappRankingPlatform(category) {
      const sourceComponent = 'DappFeaturedPlatform'
      const action = trackDappRankingPlatform(
        sourceComponent,
        this.sourcePath,
        category
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.FeaturedRankingByPlatformList {
  padding-top: 5px;
}

.featured-list-wrapper {
  position: relative;
  margin-left: -10px;
  margin-right: -10px;
  flex: 1;
}

.featured-list {
  display: flex;
  flex-wrap: wrap;
}

.featured-list-spacer {
  width: 10px;
}

.featured-wrapper {
  @include tweakpoint('min-width', 750px) {
    display: flex;
  }
}

.platforms {
  margin: 0 -10px;
  display: flex;
  flex-wrap: wrap;
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
  padding-bottom: 1.05rem;
}
</style>
