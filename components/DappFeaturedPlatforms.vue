<template>
  <div class="component-DappFeaturedList">
    <div class="wrapper">
      <h2 class="title-2">
        <nuxt-link 
          :to="{ name: 'rankings' }" 
          class="header-cta" 
          @click.native="trackDappRankingPlatform('all')">
          <img 
            src="~/assets/images/icons/platforms.png" 
            width="16" 
            class="icon">Rankings by Platform
        </nuxt-link>
        <nuxt-link 
          :to="{ name: 'rankings' }" 
          class="cta" 
          @click.native="trackDappRankingPlatform('all')">View all
          <SvgIconChevron 
            :width="8" 
            :height="8" 
            direction="right" />
        </nuxt-link>
      </h2>
      <div class="platforms">
        <DappFeaturedRankingPlatform
          v-for="(platform, index) in platforms"
          :key="index"
          :platform="platform"/>
      </div>
    </div>
  </div>
</template>

<script>
import { platformList } from '~/helpers/constants'
import { trackDappRankingPlatform } from '~/helpers/mixpanel'
import DappFeaturedListItem from './DappFeaturedListItem'
import DappFeaturedRankingPlatform from './DappFeaturedRankingPlatform'
import SvgIconChevron from './SvgIconChevron'
import SvgIconFeatured from './SvgIconFeatured'

export default {
  components: {
    DappFeaturedListItem,
    DappFeaturedRankingPlatform,
    SvgIconChevron,
    SvgIconFeatured
  },
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

.component-DappFeaturedList {
  margin-bottom: 10px;
}

.component-SvgIconFeatured {
  margin-right: 7px;
}

.cta {
  position: relative;
  bottom: 4px;
  display: inline-block;
  font-family: 'Overpass';
  font-size: 1rem;
  letter-spacing: -0.25px;
  margin-left: 12px;
  text-decoration: none;
  &.-promote {
    position: absolute;
    right: 0;
    bottom: 10px;
    text-decoration: underline;
  }
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
  &::-webkit-scrollbar {
    display: none;
  }
}

.featured-list-spacer {
  width: 10px;
}

.featured-wrapper {
  @include tweakpoint('min-width', 750px) {
    display: flex;
  }
}

.header-cta {
  text-decoration: none;
}

.icon {
  margin-right: 7px;
}

.platforms {
  margin: 0 -10px;
  display: flex;
  flex-wrap: wrap;
}

.title-2 {
  position: relative;
  font-size: 2.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba($color--black, 0.15);
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
  padding-bottom: 1.05rem;
}
</style>
