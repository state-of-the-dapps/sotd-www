<template>
<li class="component-DappFeaturedListItem" :class="hasPromotedDapp ? 'has-promotion' : ''" :id="'dapp-featured-list-item-' + index">
  <nuxt-link 
    :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }" 
    class="link" 
    @click.native="trackDappView(dapp.slug)">
    <img class="product-image" :src="dapp.imageKeyVisual"/>
    <div class="info">
      <h4 class="title-4">{{ dapp.name }}</h4>   
      <p class="tagline">{{ dapp.tagline }}</p>
      <span v-if="dapp.isPromoted" class="promoted">promoted</span>
    </div>
  </nuxt-link>
</li>
</template>

<script>
import { trackDappView } from '~/helpers/mixpanel'

export default {
  methods: {
    trackDappView (targetDapp) {
      const sourceCollection = 'featured'
      const sourceComponent = 'DappFeaturedListItem'
      const sourcePath = this.$route.path
      const action = trackDappView(sourceCollection, sourceComponent, sourcePath, targetDapp)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  props: ['dapp', 'hasPromotedDapp', 'index']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappFeaturedListItem {
  box-shadow: 0 10px 30px rgba($color--black, .1);
  background: $color--white;
  margin: 0 10px 20px 10px;
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  transition: all .2s ease;
  transform: translateY(0px);
  @include tweakpoint('min-width', 750px) {
    width: calc(50% - 20px);
  }
  @include tweakpoint('min-width', 1200px) {
    width: calc(33.33% - 20px); 
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
  height: 100%;
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

.product-image {
  max-width: 100%;
  display: block;
}

.promoted {
  text-transform: uppercase;
  font-size: .7rem;
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
