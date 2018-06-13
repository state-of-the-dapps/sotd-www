<template>
  <li class="component-DappListItem">
    <ul class="columns">
      <li class="column -rank">
        {{ parseInt(dapp.rank).toLocaleString() }}
      </li>
      <li class="column -dapp">
        <nuxt-link :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }" class="dapp-link" @click.native="trackDappView(dapp.slug)">{{ dapp.name }}</nuxt-link>
      </li>
      <li class="column -tagline">
        {{ dapp.teaser }}
      </li>
      <li class="column -category">
        <span v-if="dapp.tags.length" class="category">{{ dapp.tags[0] }}</span>
      </li>
      <li class="column -dau">
        {{ Number(dapp.stats.dau || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }}
      </li>
      <li class="column -mau">
        {{ Number(dapp.stats.mau || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }}
      </li>
      <li class="column -vol_7d">
        {{ Number(dapp.stats.value_7d || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }} ETH
      </li>
    </ul>
  </li>
</template>

<script>
import { trackDappView } from '~/helpers/mixpanel'

export default {
  data () {
    return {
      sourcePath: this.$route.path
    }
  },
  methods: {
    trackDappView (targetDapp) {
      const sourceCollection = this.sourceCollection
      const sourceComponent = 'DappListItem'
      const action = trackDappView(sourceCollection, sourceComponent, this.sourcePath, targetDapp)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  props: {
    dapp: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.category {
  display: inline-block;
  font-size: .95rem;
  padding: 2px 5px;
  background: rgba($color--gray, .6);
  border-radius: 4px;
}

.component-DappListItem {
  margin-bottom: 5px;
  font-size: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
}

.columns {
  display: flex;
  align-items: center;
  padding: 7px 0;
  border-radius: 4px;
  background: lighten($color--white, 100%);
}

.column {
  &.-rank, &.-dau, &.-mau, &.-vol_7d {
    font-size: 1.05rem;
    @include font-monospace;
  }
  @include tweakpoint('min-width', 800px) {
    border-right: 1px solid darken($color--gray, 10%);
    &:last-child {
      border-right: none;
    }
  } 
}

.dapp-link {
  font-weight: 700;
}

@include dapp-rankings-widths
</style>
