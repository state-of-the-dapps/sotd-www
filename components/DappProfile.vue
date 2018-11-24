<template>
  <div class="component-DappProfile">
    <div class="wrapper">
      <p class="description"><strong>Profile strength</strong> &nbsp;{{ Math.ceil(profileScore * 100) }}%</p>
      <div class="meter-wrapper">
        <div class="meter">
          <span 
            :style="'width: ' + Math.ceil(profileScore * 100) + '%'" 
            class="score"/>
        </div>
      </div>
      <div
        v-if="profileScore !== 1"
        class="improve-wrapper">
        <nuxt-link
          :to="{
            name: 'dapp-detail-improve',
            params: {
              slug: dapp
            }
          }"
          class="improve"
          @click.native="trackImproveProfile(dapp)">Improve this profile</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { trackDappImproveProfileClick } from '~/helpers/mixpanel'

export default {
  props: {
    dapp: {
      type: String,
      required: true
    },
    profileScore: {
      type: Number,
      required: true
    }
  },
  methods: {
    trackImproveProfile(dapp) {
      const action = trackDappImproveProfileClick(dapp)
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
  border-bottom: 1px solid darken($color--gray, 6%);
}

.meter-wrapper {
  margin-top: 8px;
}

.meter {
  border-radius: 3px;
  width: 100%;
  height: 7px;
  background: darken($color--gray, 5%);
  overflow: hidden;
}

.improve-wrapper {
  padding-top: 5px;
}

.improve {
  text-align: left;
  text-decoration: underline;
  font-size: 0.95rem;
}

.score {
  display: block;
  height: 100%;
  background: $color--black;
}
</style>
