<template>
  <li 
    :class="hasPromotedDapp ? 'has-promotion' : ''" 
    :id="'dapp-featured-list-item-' + index" 
    class="component-DappFeaturedListItem">
    <nuxt-link 
      :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }" 
      class="link" 
      @click.native="trackDappView(dapp.slug)">
      <div
        :style="`background-image: url('${dapp.productImage || dapp.imageKeyVisual}')`"
        class="product-image-wrapper"/>
      <div class="info">
        <h4 class="title-4">{{ dapp.name }}</h4>   
        <p class="tagline">{{ dapp.teaser | truncate(50) }}</p>
        <span 
          v-if="dapp.isPromoted" 
          class="promoted">promoted</span>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
import { trackDappView } from '~/helpers/mixpanel'

export default {
  props: {
    dapp: {
      type: Object,
      required: true
    },
    hasPromotedDapp: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      sourcePath: this.$route.path
    }
  },
  methods: {
    trackDappView(targetDapp) {
      const sourceCollection = 'featured'
      const sourceComponent = 'DappFeaturedListItem'
      const action = trackDappView(
        sourceCollection,
        sourceComponent,
        this.sourcePath,
        targetDapp
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappFeaturedListItem {
  box-shadow: 0 10px 30px rgba($color--black, 0.1);
  background: $color--white;
  margin: 0 10px 20px 10px;
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  transition: all 0.2s ease;
  transform: translateY(0px);
  @include tweakpoint('min-width', 750px) {
    width: calc(50% - 20px);
  }
  @include tweakpoint('min-width', 1200px) {
    width: calc(25% - 20px);
  }
  &.has-promotion {
    @include tweakpoint('min-width', 1200px) {
      width: calc(25% - 20px);
    }
  }
  &:hover {
    transform: translateY(-2px);
  }
}

.link {
  display: block;
  position: relative;
  width: 100%;
  text-decoration: none;
}

.info {
  position: relative;
  border-top: 4px solid $color--gray;
  border-bottom-left-radius: 4px;
  background: $color--white;
  color: $color--purple;
  padding: 10px 12px;
  width: 100%;
  text-align: center;
}

.product-image-wrapper {
  height: 0;
  padding-bottom: 52.5%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: lighten($color--black, 62%);
}

.promoted {
  text-transform: uppercase;
  font-size: 0.7rem;
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  padding: 3px 5px;
  font-weight: 600;
  background: $color--gray;
  border-bottom-left-radius: 4px;
}

.tagline {
  margin: 0;
}

.title-4 {
  margin: 0;
  font-weight: 600;
  font-size: 1.05rem;
}
</style>
