<template>
  <div class="component-DappFeaturedList">
    <div class="wrapper">
      <h2 class="title-2">
        <nuxt-link 
          :to="{ name: 'collections-slug', params: { slug: 'featured' }}" 
          class="header-cta" 
          @click.native="trackCollectionView('featured')">
          <SvgIconFeatured/>Featured ÐApps
        </nuxt-link>
        <nuxt-link 
          :to="{ name: 'collections-slug', params: { slug: 'featured' }}" 
          class="cta" 
          @click.native="trackCollectionView('featured')">View all
          <SvgIconChevron 
            :width="8" 
            :height="8" 
            direction="right" />
        </nuxt-link>
        <nuxt-link 
          :to="{ name: 'promoted-dapps' }" 
          class="cta -promote" 
          @click.native="trackPromotedDappsView()">Promote your ÐApp here</nuxt-link>
      </h2>
      <div class="featured-wrapper">
        <div class="featured-list-wrapper">
          <ul class="featured-list">
            <DappFeaturedListItem 
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
import { trackCollectionView, trackPromotedDappsView } from '~/helpers/mixpanel'
import { dappPromotedSlots } from '~/helpers/constants'
import DappFeaturedListItem from './DappFeaturedListItem'
import SvgIconChevron from './SvgIconChevron'
import SvgIconFeatured from './SvgIconFeatured'

export default {
  components: {
    DappFeaturedListItem,
    SvgIconChevron,
    SvgIconFeatured
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
        const promotedDapps = promoted.data.slice(0, slots).reverse()
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
      return this.$axios.get('collections/featured')
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

.header-cta {
  text-decoration: none;
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

.title-2 {
  position: relative;
  font-size: 2.5rem;
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
}
</style>
