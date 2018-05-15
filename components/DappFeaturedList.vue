<template>
<div class="component-DappFeaturedList">
  <div class="wrapper">
    <h2 class="title-2">
      <SvgIconFeatured/>Featured ÐApps 
      <nuxt-link :to="{ name: 'collections-slug', params: { slug: 'featured' }}" class="cta" @click.native="trackCollectionView('featured')">View all 
        <SvgIconChevron :width="8" :height="8" direction="right" />
      </nuxt-link>
      <nuxt-link class="cta -promote" :to="{ name: 'promoted-dapps' }" @click.native="trackPromotedDappsView()">Promote your ÐApp here</nuxt-link>
    </h2>
    <div class="featured-wrapper">
      <div class="featured-list-wrapper">
        <ul class="featured-list">
          <DappFeaturedListItem v-for="(dapp, index) in dapps" 
            :key="index"
            :dapp="dapp"
            :index="index"
          />
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { trackCollectionView, trackPromotedDappsView } from '~/helpers/mixpanel'
import axios from '~/helpers/axios'
import DappFeaturedListItem from './DappFeaturedListItem'
import SvgIconChevron from './SvgIconChevron'
import SvgIconFeatured from './SvgIconFeatured'

export default {
  components: {
    DappFeaturedListItem,
    SvgIconChevron,
    SvgIconFeatured
  },
  data () {
    return {
      scrollIndex: 0,
      dapps: [],
      sourcePath: this.$route.path
    }
  },
  methods: {
    trackCollectionView (slug) {
      const sourceComponent = 'DappFeaturedList'
      const targetCollection = slug
      const action = trackCollectionView(sourceComponent, this.sourcePath, targetCollection)
      this.$mixpanel.track(action.name, action.data)
    },
    trackPromotedDappsView () {
      const sourceComponent = 'DappFeaturedList'
      const sourcePageLocation = 'main'
      const action = trackPromotedDappsView(sourceComponent, this.sourcePath)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  mounted () {
    axios
      .get('collections/featured')
      .then(response => {
        const collection = response.data
        const dapps = collection.items
        this.dapps = dapps.slice(0, 3)
      })
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

.cta {
  position: relative;
  bottom: 4px;
  display: inline-block;
  font-family: 'Overpass';
  font-size: 1rem;
  letter-spacing: -.25px;
  margin-left: 12px;
  text-decoration: none;
  &.-promote {
    position: absolute;
    right: 0;
    bottom: 10px;
    text-decoration: underline;
  }
}

.title-2 {
  position: relative;
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
}
</style>

