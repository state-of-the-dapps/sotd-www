<template>
  <div class="FeaturedCollectionList">
    <SectionHeading
      :cta-route="{ name: 'collections' }"
      :heading="$t(namespace('heading'))"
      :heading-route="{ name: 'collections' }"
      :cta-text="$t('cta.viewAll')"
      @clickCta="trackCollectionView('home')"
      @clickHeading="trackCollectionView('home')">
      <template slot="icon">
        <IconCollection 
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
import { homeFeaturedCollections } from '@/helpers/constants'
import { trackCollectionView } from '@/helpers/mixpanel'
import DappCollectionList from './DappCollectionList'
import SectionHeading from './SectionHeading'
import IconChevron from './IconChevron'
import IconCollection from './IconCollection'

export default {
  components: {
    DappCollectionList,
    SectionHeading,
    IconChevron,
    IconCollection
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
.FeaturedCollectionList {
  @include margin-wrapper-main;
  padding-bottom: 35px;
}
</style>
