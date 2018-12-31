<template>
  <div class="FeaturedCollectionList">
    <SectionHeading
      :cta-route="{ name: 'collections' }"
      :heading="$t(namespace('heading'))"
      :heading-is-translated="$te(namespace('heading'))"
      :heading-route="{ name: 'collections' }"
      :cta-text="$t('cta.viewAll')"
      @clickCta="trackCollectionView('home')"
      @clickHeading="trackCollectionView('home')">
      <template slot="icon">
        <SvgIconCollection 
          :width="16" 
          :height="16"/>
      </template>
    </SectionHeading>
    <DappCollectionList 
      v-for="(collection, index) in collections" 
      :collection="collection" 
      :key="index"/>
  </div>
</template>

<script>
import { componentNamespace } from '@/helpers/mixins'
import { homeFeaturedCollections } from '@/helpers/constants'
import { trackCollectionView } from '@/helpers/mixpanel'
import DappCollectionList from './DappCollectionList'
import SectionHeading from './SectionHeading'
import SvgIconChevron from './SvgIconChevron'
import SvgIconCollection from './SvgIconCollection'

export default {
  components: {
    DappCollectionList,
    SectionHeading,
    SvgIconChevron,
    SvgIconCollection
  },
  mixins: [componentNamespace],
  data() {
    return {
      collections: [],
      sourcePath: this.$route.path
    }
  },
  mounted() {
    this.$axios.get('collections/list/featured').then(response => {
      const collections = response.data
      this.collections = collections.slice(1, homeFeaturedCollections)
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

.FeaturedCollectionList {
  @include margin-wrapper-main;
  padding-bottom: 35px;
}
</style>
