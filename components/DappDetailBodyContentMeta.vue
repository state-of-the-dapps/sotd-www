<template>
<div class="component-DappDetailBodyContentMeta">
  <div class="wrapper">
    <p class="description"><nuxt-link @click.native="trackDappMetaClick(slug)" :to="{name: 'dapp-detail-meta', params: {slug: slug}}">Add this ÐApp's badges to your website</nuxt-link></p>
    <ul class="badges">
      <li v-for="(badge, index) in badges" :key="index"><nuxt-link @click.native="trackDappMetaClick(slug)" :to="{name: 'dapp-detail-meta', params: {slug: slug}}" rel="nofollow noindex"><img :src="`https://badges.stateofthedapps.com/${slug}/${badge}`"></nuxt-link></li>
    </ul>
    <p style="margin-top: 5px;">And many more...</p>
  </div>
</div>
</template>

<script>
import { trackDappMetaClick } from '~/helpers/mixpanel'

export default {
  props: ['name', 'slug'],
  data () {
    return {
      badges: [
        'rank',
        'users_30d',
        'value_7d'
      ]
    }
  },
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

.badges {
  padding-top: 10px;
}

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
