<template>
<div class="component-DappFeaturedList">
  <div class="wrapper">
    <h2 class="title-2">
      <SvgIconFeatured/>Featured ÐApps 
      <nuxt-link :to="{ name: 'collections-slug', params: { slug: 'featured' }}" class="cta" @click.native="trackCollectionView('featured')">View all 
        <SvgIconChevron :width="8" :height="8" direction="right" />
      </nuxt-link>
      <nuxt-link class="cta -promote" :to="{ name: 'promoted-dapps' }" @click.native="trackPagePromotedDapps()">Promote your ÐApp here</nuxt-link>
    </h2>
    <div class="featured-wrapper">
      <div class="featured-list-wrapper">
        <ul class="featured-list">
          <DappFeaturedListItem v-for="(dapp, index) in dapps" 
            :key="index"
            :dapp="dapp"
            :index="index"
          />
          <li class="linkexchange">
            <Linkexchange/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { trackCollectionView, trackPagePromotedDapps } from '~/helpers/mixpanel'
import axios from '~/helpers/axios'
import DappFeaturedListItem from './DappFeaturedListItem'
import Linkexchange from './Linkexchange'
import SvgIconChevron from './SvgIconChevron'
import SvgIconFeatured from './SvgIconFeatured'

export default {
  components: {
    DappFeaturedListItem,
    Linkexchange,
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
    trackPagePromotedDapps () {
      const sourceComponent = 'DappFeaturedList'
      const sourcePageLocation = 'main'
      const action = trackPagePromotedDapps(sourceComponent, sourcePageLocation, this.sourcePath)
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

.linkexchange {
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba($color--black, .1);
  width: 100%;
  height: 250px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @include tweakpoint('min-width', 750px) {
    width: calc(50% - 20px); 
  }
  @include tweakpoint('min-width', 1200px) {
    width: calc(25% - 20px); 
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

