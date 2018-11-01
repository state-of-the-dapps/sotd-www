<template>
  <div>
    <div>
      <nuxt-link :to="{ name: 'dapp-detail', params: { slug } }" :class="!iconUrl ? 'has-no-icon' : ''" @click.native="trackDappView(slug)">
        <img v-if="iconUrl" :src="iconUrl" width="32" height="32">
        <span v-else>{{ name | firstLetter }}</span>
      </nuxt-link>
    </div>
    <div>
      <h4>
        <nuxt-link :to="{ name: 'dapp-detail', params: { slug } }" @click.native="trackDappView(slug)">{{ name }}</nuxt-link>
      </h4>
      <p>{{ teaser }}</p>
    </div>
  </div>
</template>

<script>
import { trackDappView } from '~/helpers/mixpanel'

export default {
  props: {
    iconUrl: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    teaser: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      sourcePath: this.$route.path
    }
  },
  methods: {
    trackDappView (targetDapp) {
      const sourceCollection = ''
      const sourceComponent = 'RankingTable'
      const action = trackDappView(sourceCollection, sourceComponent, this.sourcePath, targetDapp)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>
