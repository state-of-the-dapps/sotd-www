<template>
<li class="component-DappCardListItem" :class="'-' + dapp.status">
  <nuxt-link class="link" :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }" @click.native="trackDappView(dapp.slug)">
    <div :class="'-' + dapp.status" class="dapp-icon-wrapper">
      <img v-if="dapp.iconUrl" class="dapp-icon" :src="dapp.iconUrl" width="32" height="32">
      <span v-else>{{ dapp.name | firstLetter }}</span>
    </div>
    <h4 class="title-4">{{ dapp.name }}</h4>
    <p class="description">{{ dapp.teaser }}</p>
    <div class="meta" :class="'-' + dapp.status">
      <span class="status">{{ dapp.status }}</span>
      <DappBadgeList v-if="dapp.badges && dapp.badges.length" :badges="dapp.badges" />
    </div>
    <span v-if="dapp.isNew" class="new" :class="'-' + dapp.status">
      New
    </span>
  </nuxt-link>
</li>
</template>

<script>
import { trackDappView } from '~/helpers/mixpanel'
import DappBadgeList from './DappBadgeList'

export default {
  data () {
    return {
      sourcePath: this.$route.path
    }
  },
  components: {
    DappBadgeList
  },
  methods: {
    trackDappView (targetDapp) {
      const sourceCollection = this.sourceCollection
      const sourceComponent = 'DappCardListItem'
      const action = trackDappView(sourceCollection, sourceComponent, this.sourcePath, targetDapp)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  props: {
    dapp: {
      required: true,
      type: Object
    },
    sourceCollection: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappCardListItem {
  position: relative;
  height: 200px;
  margin: 10px;
  box-shadow: 0 10px 30px rgba($color--black, .1);
  transition: all .4s ease;
  border-radius: 4px;
  overflow: hidden;
  &:hover {
    transform: translateY(-2px);
  }
  @include dapp-background-gradients
}

.dapp-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.3rem;
  text-transform: uppercase;
  @include dapp-background-colors
}

.dapp-icon {
  border-radius: 50%;
}

.description {
  max-width: 250px;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
}

.link {
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column; 
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  position: relative;
  padding-top: 30px;
  color: $color--purple;
}

.meta {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 28px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  @include dapp-background-colors
}

.new {
  position: absolute;
  display: inline-block;
  top: 0;
  padding: 4px 6px;
  text-transform: uppercase;
  font-size: .7rem;
  z-index: 2;
  @include dapp-text-colors;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -3px;
    border-top: 18px solid $color--purple;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    height: 0;
    width: 37px;
    z-index: -1;
  }
}

.status {
  text-transform: uppercase;
  font-size: .75rem;
  font-weight: 600;
  flex-grow: 1;
  text-align: left;
}

.title-4 {
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0;
}

</style>
