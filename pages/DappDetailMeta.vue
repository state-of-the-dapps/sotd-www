<template>
  <LayoutMain>
    <div class="page-dapp-detail-meta">
      <div class="hero-wrapper">
        <h1 class="title-1">{{ dapp.name }} Resources</h1>
        <h2 style="margin-bottom: 5px;">Badges</h2>
        <p style="margin-top: 0;">Feel free to use these badges on your website</p>
        <div class="badge-wrapper">
          <img :src="`https://badges.stateofthedapps.com/${dapp.slug}/rank`"><br>
          <pre><code>&lt;a href=&quot;https://www.stateofthedapps.com/dapps/{{ dapp.slug }}&quot;&gt;
  &lt;img src=&quot;https://badges.stateofthedapps.com/{{ dapp.slug }}/rank&quot;&gt;
&lt;/a&gt;</code></pre>
        </div>
        <div class="badge-wrapper">
          <img :src="`https://badges.stateofthedapps.com/${dapp.slug}/users`"><br>
          <pre><code>&lt;a href=&quot;https://www.stateofthedapps.com/dapps/{{ dapp.slug }}&quot;&gt;
  &lt;img src=&quot;https://badges.stateofthedapps.com/{{ dapp.slug }}/users&quot;&gt;
&lt;/a&gt;</code></pre>
        </div>
        <div class="badge-wrapper">
          <img :src="`https://badges.stateofthedapps.com/${dapp.slug}/status`"><br>
          <pre><code>&lt;a href=&quot;https://www.stateofthedapps.com/dapps/{{ dapp.slug }}&quot;&gt;
  &lt;img src=&quot;https://badges.stateofthedapps.com/{{ dapp.slug }}/status&quot;&gt;
&lt;/a&gt;</code></pre>
        </div>
        <div class="badge-wrapper">
          <img :src="`https://badges.stateofthedapps.com/${dapp.slug}/feedback`"><br>
          <pre><code>&lt;a href=&quot;https://www.stateofthedapps.com/dapps/{{ dapp.slug }}&quot;&gt;
  &lt;img src=&quot;https://badges.stateofthedapps.com/{{ dapp.slug }}/feedback&quot;&gt;
&lt;/a&gt;</code></pre>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import axios from '~/helpers/axios'
import * as constants from '~/helpers/constants'
import LayoutMain from '~/components/LayoutMain'

export default {
  data () {
    return {
      dapp: constants.dappSchema
    }
  },
  asyncData ({ store, params, error }) {
    return axios
      .get('dapps/' + params.slug)
      .then(response => {
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
  head () {
    return {
      title: this.dapp.name + ' — State of the ÐApps',
      meta: [
        { hid: 'description', name: 'description', content: this.dapp.teaser },
        { hid: 'image', property: 'og:image', content: this.dapp.productImage }
      ]
    }
  },
  components: {
    LayoutMain
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.badge-wrapper {
  padding: 10px;
  background: rgba($color--black, .075);
  border-radius: 4px;
  margin-bottom: 10px;
}

.description {
  margin-top: .5rem;
  text-align: center;
}

.hero-wrapper {
  padding: 4rem 0 3rem 0;
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
