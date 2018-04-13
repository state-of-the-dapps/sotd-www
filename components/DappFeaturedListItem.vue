<template>
<li class="component-DappFeaturedListItem" :id="'dapp-featured-list-item-' + index">
  <nuxt-link 
    :to="{ name: 'dapps-slug', params: { slug: dapp.slug } }" 
    class="link" 
    @click.native="trackDappView(dapp.slug)"
    :style="'background-image: url(' + dapp.imageKeyVisual + ')'">
    <div class="info">
      <h4 class="title-4">{{ dapp.name }}</h4>   
      <p class="tagline">{{ dapp.tagline }}</p>
    </div>
  </nuxt-link>
</li>
</template>

<script>
import { trackDappView } from '~/helpers/mixpanel'

export default {
  methods: {
    trackDappView (targetDapp) {
      const sourceCollection = ''
      const sourceComponent = 'DappFeaturedListItem'
      const sourcePath = this.$route.path
      const action = trackDappView(sourceCollection, sourceComponent, sourcePath, targetDapp)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  props: ['dapp', 'index']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappFeaturedListItem {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba($color--black, .1);
  margin: 0 10px 20px 10px;
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  transition: all .2s ease;
  @include tweakpoint('min-width', 750px) {
    width: calc(50% - 20px);
  }
  @include tweakpoint('min-width', 1200px) {
    width: calc(25% - 20px); 
  }
  &:hover {
    transform: translateY(-2px);
  }
}

.link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-decoration: none;
  background-image: url('');
  background-size: 600px 250px;
  background-position: center center;
  background-repeat: no-repeat;
}

.info {
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 4px solid $color--gray;
  border-bottom-left-radius: 4px;
  background: $color--white;
  color: $color--purple;
  padding: 10px 12px;
  width: 100%;
  text-align: center;
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
