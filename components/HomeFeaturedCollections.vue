<template>
  <div class="component-HomeFeaturedCollections">
    <h2 class="title-2">
      <nuxt-link 
        :to="{ name: 'collections'}" 
        class="header-cta" 
        @click.native="trackCollectionView('home')">
        <SvgIconCollection 
          :width="16" 
          :height="16"/>ÐApp Collections
      </nuxt-link>
      <nuxt-link 
        :to="{ name: 'collections'}" 
        class="cta" 
        @click.native="trackCollectionView('home')">View all
        <SvgIconChevron 
          :width="8" 
          :height="8" 
          direction="right" />
      </nuxt-link>
    </h2>
    <DappCollectionList 
      v-for="(collection, index) in collections" 
      :collection="collection" 
      :key="index"/>
  </div>
</template>

<script>
import { trackCollectionView } from '~/helpers/mixpanel'
import DappCollectionList from './DappCollectionList'
import SvgIconChevron from './SvgIconChevron'
import SvgIconCollection from './SvgIconCollection'

export default {
  components: {
    DappCollectionList,
    SvgIconChevron,
    SvgIconCollection
  },
  data() {
    return {
      collections: [],
      sourcePath: this.$route.path
    }
  },
  mounted() {
    this.$axios.get('collections/list/featured').then(response => {
      const collections = response.data
      this.collections = collections.slice(1, 4)
    })
  },
  methods: {
    trackCollectionView(slug) {
      const sourceComponent = 'HomeFeaturedCollections'
      const targetCollection = slug
      const action = trackCollectionView(
        sourceComponent,
        this.sourcePath,
        targetCollection
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-HomeFeaturedCollections {
  @include margin-wrapper-main;
}

.component-SvgIconCollection {
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

.header-cta {
  text-decoration: none;
}

.title-2 {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 2.5rem;
}
</style>
