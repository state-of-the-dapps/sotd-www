<template>
  <LayoutMain>
    <div class="page-dapp-detail-meta">
      <div class="hero-wrapper">
        <p style="text-align: center;">Head back to <nuxt-link :to="{name: 'dapp-detail', params: {}}">{{ dapp.name }}</nuxt-link></p>

        <h1 class="title-1">{{ dapp.name }} Resources</h1>
        <h2 style="margin-bottom: 5px;">Badges</h2>
        <p style="margin-top: 0;">Feel free to use these badges on your website</p>
        <div 
          v-for="(badge, index) in badges" 
          :key="index" 
          class="badge-wrapper">
          <img :src="`https://badges.stateofthedapps.com/${dapp.slug}/${badge}`"><br>
          <pre><code>&lt;a href=&quot;https://www.stateofthedapps.com/dapps/{{ dapp.slug }}&quot;&gt;
          &lt;img src=&quot;https://badges.stateofthedapps.com/{{ dapp.slug }}/{{ badge }}&quot;&gt;
          &lt;/a&gt;</code></pre>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import * as constants from '~/helpers/constants'
import { trackDappMetaView } from '~/helpers/mixpanel'
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    LayoutMain
  },
  data() {
    return {
      dapp: constants.dappSchema,
      badges: constants.dappMetaBadges
    }
  },
  asyncData({ store, params, error, app }) {
    return app.$axios.get('dapps/' + params.slug).then(response => {
      const data = response.data
      const dapp = data.item
      if (!Object.keys(dapp).length > 0) {
        error({ statusCode: 404 })
      }
      return {
        dapp
      }
    })
  },
  mounted() {
    const action = trackDappMetaView(this.dapp.slug)
    this.$mixpanel.track(action.name, action.data)
  },
  head() {
    return {
      title: this.dapp.name + ' — State of the ÐApps',
      meta: [
        { hid: 'description', name: 'description', content: this.dapp.teaser },
        { hid: 'image', property: 'og:image', content: this.dapp.productImage },
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.badge-wrapper {
  padding: 10px;
  background: rgba($color--black, 0.075);
  border-radius: 4px;
  margin-bottom: 10px;
}

.description {
  margin-top: 0.5rem;
  text-align: center;
}

.hero-wrapper {
  padding: 3rem 0 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}

pre {
  margin-top: 5px;
}
</style>
