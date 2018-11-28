<template>
  <li 
    :class="dapp.categories.length ? '-' + dapp.categories[0] : ''" 
    class="component-DappCardListItem">
    <nuxt-link 
      :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }" 
      class="link" 
      @click.native="trackDappView(dapp.slug)">
      <div 
        :class="dapp.categories.length ? '-' + dapp.categories[0] : ''" 
        class="dapp-icon-wrapper">
        <img 
          v-if="dapp.iconUrl" 
          :src="dapp.iconUrl" 
          class="dapp-icon" 
          width="32" 
          height="32">
        <span 
          v-else 
          class="dapp-icon-placeholder">{{ dapp.name | firstLetter }}</span>
      </div>
      <div class="info-wrapper">
        <h4 class="title-4">{{ dapp.name }}</h4>
        <p class="description">{{ dapp.teaser }}</p>
      </div>
      <div 
        :class="dapp.categories.length ? '-' + dapp.categories[0] : ''" 
        class="meta">
        <span class="category">{{ dapp.categories.length ? dapp.categories[0] : '' }}</span>
      </div>
      <span 
        v-if="dapp.isNew" 
        class="new">
        New
      </span>
      <span 
        v-if="optionalAttribute" 
        class="optional-text">
        {{ optionalText }}
      </span>
    </nuxt-link>
  </li>
</template>

<script>
import formatDate from 'date-fns/format'
import { trackDappView } from '~/helpers/mixpanel'
import DappBadgeList from './DappBadgeList'

export default {
  components: {
    DappBadgeList
  },
  props: {
    dapp: {
      type: Object,
      required: true
    },
    optionalAttribute: {
      type: String,
      default: ''
    },
    sourceCollection: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sourcePath: this.$route.path
    }
  },
  computed: {
    optionalText() {
      let text = ''
      if (this.optionalAttribute === 'new' && this.dapp.created) {
        text = formatDate(this.dapp.created, 'MMM D, YYYY')
      }
      return text
    }
  },
  methods: {
    trackDappView(targetDapp) {
      const sourceCollection = this.sourceCollection
      const sourceComponent = 'DappCardListItem'
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

.component-DappCardListItem {
  position: relative;
  margin: 10px;
  box-shadow: 0 10px 30px rgba($color--black, 0.1);
  transition: all 0.4s ease;
  border-radius: 4px;
  overflow: hidden;
  &:hover {
    transform: translateY(-2px);
  }
  background: $color--white;
}

.dapp-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1.3rem;
  text-transform: uppercase;
  margin-right: 10px;
}

.dapp-icon-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: $color--gray;
}

.dapp-icon {
  border-radius: 50%;
}

.description {
  max-width: 250px;
  margin-top: 2px;
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
  padding: 15px;
  text-decoration: none;
  position: relative;
  padding-bottom: 28px;
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
  @include dapp-category-colors;
}

.new,
.optional-text {
  position: absolute;
  display: inline-block;
  top: 10px;
  left: 10px;
  text-transform: uppercase;
  font-size: 0.8rem;
  z-index: 2;
  font-weight: 700;
  color: $color--purple;
}

.optional-text {
  left: auto;
  right: 10px;
}

.category {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  flex-grow: 1;
  text-align: left;
}

.title-4 {
  font-weight: 600;
  font-size: 1.3rem;
  margin: 0;
}
</style>
