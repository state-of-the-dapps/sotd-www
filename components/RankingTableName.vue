<template>
  <div class="component-ranking-table-name">
    <div class="icon-wrapper">
      <nuxt-link 
        :to="{ name: 'dapp-detail', params: { slug } }" 
        :class="!iconUrl ? 'has-no-icon' : ''" 
        class="icon-link" 
        @click.native="trackDappView(slug)">
        <img
          v-if="iconUrl" 
          :src="iconUrl"
          class="icon-image"
          width="42"
          height="42">
        <span
          v-else
          class="icon-placeholder">{{ name | firstLetter }}</span>
      </nuxt-link>
    </div>
    <div class="name-teaser-wrapper">
      <h4 class="name">
        <nuxt-link 
          :to="{ name: 'dapp-detail', params: { slug } }" 
          @click.native="trackDappView(slug)">{{ name }}</nuxt-link>
      </h4>
      <p class="teaser">{{ teaser }}</p>
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
  data() {
    return {
      sourcePath: this.$route.path
    }
  },
  methods: {
    trackDappView(targetDapp) {
      const sourceCollection = ''
      const sourceComponent = 'RankingTable'
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

.component-ranking-table-name {
  padding: 5px 0;
  display: flex;
  align-items: center;
  text-align: left;
  margin-right: 20px;
  justify-content: left;
}

.icon-image {
  display: block;
}

.icon-link {
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 4px;
}

.icon-image {
  border-radius: 4px;
  display: block;
}

.icon-placeholder {
  background: $color--gray;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  border-radius: 4px;
}

.icon-wrapper {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name {
  margin: 0;
  margin-bottom: 0.25rem;
  font-size: 1.2rem;
}

.teaser {
  margin: 0;
  color: lighten($color--black, 15%);
  font-size: 1.05rem;
}
</style>
