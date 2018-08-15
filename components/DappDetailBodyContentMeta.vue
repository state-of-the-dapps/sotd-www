<template>
<div class="component-DappDetailBodyContentRank">
  <div class="wrapper">
    <p class="description"><nuxt-link @click.native="trackDappMetaClick(slug)" :to="{name: 'dapp-detail-meta', params: {slug: slug}}">Add this ÐApp's badges to your website</nuxt-link></p>
  </div>
</div>
</template>

<script>
import { trackDappMetaClick } from '~/helpers/mixpanel'

export default {
  props: ['name', 'slug'],
  methods: {
    trackDappMetaClick () {
      const action = trackDappMetaClick(this.slug)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin-bottom: 0;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
}
</style>
