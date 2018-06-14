<template>
  <li class="component-DappListItem" v-if="dapp.rank">
    <ul class="columns">
      <li class="column -rank">
        <div class="wrapper">
          <span>{{ Number(dapp.rank || 0).toLocaleString() }}</span>
        </div>
      </li>
      <li class="column -dapp">
        <div class="wrapper">
          <nuxt-link :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }" class="dapp-link" @click.native="trackDappView(dapp.slug)">{{ dapp.name }}</nuxt-link>
        </div>
      </li>
      <li class="column -tagline">
        <div class="wrapper">
          <span>{{ dapp.teaser }}</span>
        </div>
      </li>
      <li class="column -category">
        <div class="wrapper">
          <span v-if="dapp.tags.length" class="category">{{ dapp.tags[0] }}</span>
        </div>
      </li>
      <li class="column -dau">
        <span class="field-dau -value">{{ Number(dapp.stats.dau || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }}</span>
        <span v-if="dapp.stats.dau_pct === null" class="field-dau -pct">-</span>
        <span v-else class="field-dau -pct" :class="getDappStatsClass(dapp.stats.dau_pct)"><span v-if="dapp.stats.dau_pct > 0">+</span>{{ Number(dapp.stats.dau_pct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span>
      </li>
      <li class="column -mau">
        <span class="field-mau -value">{{ Number(dapp.stats.mau || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }}</span>
        <span v-if="dapp.stats.mau_pct === null" class="field-mau -pct">-</span>
        <span v-else class="field-mau -pct" :class="getDappStatsClass(dapp.stats.mau_pct)"><span v-if="dapp.stats.mau_pct > 0">+</span>{{ Number(dapp.stats.mau_pct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span>
      </li>
      <li class="column -vol_7d">
        <span class="field-vol -value">{{ Number(dapp.stats.value_7d || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }} ETH</span>
        <span v-if="dapp.stats.value_7d_pct === null" class="field-vol -pct">-</span>
        <span v-else class="field-vol -pct" :class="getDappStatsClass(dapp.stats.value_7d_pct)"><span v-if="dapp.stats.value_7d_pct > 0">+</span>{{ Number(dapp.stats.value_7d_pct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span>
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
    getDappStatsClass (value) {
      let result = ''
      if (value && value > 0) {
        result = 'is-positive'
      } else if (value && value < 0) {
        result = 'is-negative'
      }
      return result
    },
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

@include dapp-rankings-widths;

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
  padding: 7px 0;
  border-radius: 4px;
  background: lighten($color--white, 100%);
}

.column {
  &.-rank, &.-dau, &.-mau, &.-vol_7d {
    font-size: 1.05rem;
    @include font-monospace;
  }
  &.-dau {
    display: flex;
    flex-direction: column;
  }
  &.-vol_7d, &.-mau {
    @include tweakpoint('min-width', 800px) {
      display: flex;
      flex-direction: column;
    }
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

.field-dau, .field-vol, .field-mau {
  flex: 1;
  &.-pct {
    font-size: 1rem;
    &.is-positive {
      color: $color--positive;
    }
    &.is-negative {
      color: $color--negative;
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
