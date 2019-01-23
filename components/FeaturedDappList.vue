<template>
  <div class="FeaturedDappList">
    <div class="wrapper">
      <SectionHeading
        :cta-route="{ name: 'collection-detail', params: { slug: 'featured' }}"
        :has-line="false"
        :heading="$t(namespace('heading'))"
        :heading-route="{ name: 'collection-detail', params: { slug: 'featured' }}"
        :secondary-cta-route="{ name: 'promoted-dapps' }"
        :cta-text="$t('cta.viewAll')"
        :secondary-cta-text="$t(namespace('promote'))"
        @clickCta="trackCollectionView('featured')"
        @clickHeading="trackCollectionView('featured')"
        @clickSecondaryCta="trackPromotedDappsView">
        <template slot="icon">
          <IconFeatured/>
        </template>
      </SectionHeading>
      <div class="featured-wrapper">
        <div class="featured-list-wrapper">
          <ul class="featured-list">
            <FeaturedDappListItem 
              v-for="(dapp, index) in dapps"
              :key="index"
              :dapp="dapp"
              :index="index"
              :has-promoted-dapp="hasPromotedDapp"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { trackCollectionView, trackPromotedDappsView } from '@/helpers/mixpanel'
import { dappFeaturedSlots, dappPromotedSlots } from '@/helpers/constants'
import FeaturedDappListItem from './FeaturedDappListItem'
import SectionHeading from './SectionHeading'
import IconChevron from './IconChevron'
import IconFeatured from './IconFeatured'

export default {
  components: {
    FeaturedDappListItem,
    SectionHeading,
    IconChevron,
    IconFeatured
  },
  data() {
    return {
      scrollIndex: 0,
      dapps: [],
      hasPromotedDapp: false,
      sourcePath: this.$route.path
    }
  },
  computed: {
    userEntryRoute() {
      return this.$store.getters['userEntryRoute']
    }
  },
  mounted() {
    Promise.all([this.getFeaturedDapps(), this.getPromotedDapps()]).then(
      ([featured, promoted]) => {
        const featuredDapps = featured.data.items
        // slots must be 4 or fewer
        const slots = dappPromotedSlots
        const promotedDapps = promoted.data.slice(0, slots).reverse() || ''
        if (featuredDapps && featuredDapps.length) {
          this.dapps = featuredDapps.slice(0, 4 - promotedDapps.length)
        }
        if (promotedDapps && promotedDapps.length) {
          for (var i = 0; i < promotedDapps.length; i++) {
            let promotedDapp = promotedDapps[i]
            promotedDapp.isPromoted = true
            this.dapps.unshift(promotedDapp)
          }
          this.hasPromotedDapp = true
        }
      }
    )
  },
  methods: {
    getFeaturedDapps() {
      return this.$axios.get('collections/featured?limit=' + dappFeaturedSlots)
    },
    getPromotedDapps() {
      return this.$axios.get('promoted/dapps')
    },
    trackCollectionView(slug) {
      const sourceComponent = 'DappFeaturedList'
      const targetCollection = slug
      const action = trackCollectionView(
        sourceComponent,
        this.sourcePath,
        targetCollection
      )
      this.$mixpanel.track(action.name, action.data)
    },
    trackPromotedDappsView() {
      const sourceComponent = 'DappFeaturedList'
      const action = trackPromotedDappsView(
        sourceComponent,
        this.sourcePath,
        this.userEntryRoute
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.FeaturedDappList {
  padding-top: 10px;
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

.wrapper {
  @include margin-wrapper-main;
  position: relative;
}
</style>
