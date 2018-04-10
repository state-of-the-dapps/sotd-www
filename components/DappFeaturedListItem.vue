<template>
<li class="component-DappFeaturedListItem" :id="'dapps-featured-list-item-' + index">
  <nuxt-link :to="{ name: 'dapps-slug', params: { slug: dapp.slug } }" class="dapp-link" @click.native="trackDappView(dapp.slug)">
    <img class="dapp-image" src="">
    <div class="dapp-name" :class="'-' + dapp.status">{{ dapp.name }}</div>
  </nuxt-link>
</li>
</template>

<script>
import { trackDappView } from '~/helpers/mixpanel'

export default {
  methods: {
    trackDappView (targetDapp) {
      const sourceComponent = 'DappFeaturedListItem'
      const sourcePath = this.$route.path
      const action = trackDappView(sourceComponent, sourcePath, targetDapp)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  props: ['dapp', 'index']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappFeaturedListItem {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px rgba($color--black, .15);
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

.dapp-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.dapp-name {
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-left-radius: 4px;
  background: $color--black;
  color: $color--white;
  padding: 7px 10px;
}
</style>
