<template>
  <li 
    v-if="dapp.rank" 
    class="component-DappListItem">
    <ul class="columns">
      <li class="column -rank">
        <div class="wrapper">
          <span>{{ Number(dapp.rank || 0).toLocaleString() }}</span>
        </div>
      </li>
      <li class="column -dapp">
        <div class="wrapper">
          <nuxt-link 
            :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }" 
            :class="!dapp.iconUrl ? 'has-no-icon' : ''" 
            class="dapp-icon-wrapper" 
            @click.native="trackDappView(dapp.slug)">
            <img 
              v-if="dapp.iconUrl" 
              :src="dapp.iconUrl" 
              class="dapp-icon" 
              width="32" 
              height="32">
            <span v-else>{{ dapp.name | firstLetter }}</span>
          </nuxt-link>
          <nuxt-link 
            :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }" 
            class="dapp-link" 
            @click.native="trackDappView(dapp.slug)">{{ dapp.name }}</nuxt-link>
        </div>
      </li>
      <li class="column -tagline">
        <div class="wrapper">
          <span>{{ dapp.teaser }}</span>
        </div>
      </li>
      <li class="column -profile">
        <div class="wrapper">
          <span class="profile-percentage">{{ Math.ceil(dapp.profileScore * 100) }}%</span>
        </div>
      </li>
      <li class="column -dau">
        <span v-if="dapp.stats.dau === undefined || dapp.stats.dau === null">-</span>
        <span 
          v-else 
          class="field-dau -value">{{ Number(dapp.stats.dau || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }}</span>
        <span 
          v-if="dapp.stats.dau_pct === undefined || dapp.stats.dau_pct === null" 
          class="field-dau -pct">-</span>
        <span 
          v-else 
          :class="getDappStatsClass(dapp.stats.dau_pct)" 
          class="field-dau -pct"><span v-if="dapp.stats.dau_pct > 0">+</span>{{ Number(dapp.stats.dau_pct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span>
      </li>
      <li class="column -mau">
        <span v-if="dapp.stats.mau === undefined || dapp.stats.mau === null">-</span>
        <span 
          v-else 
          class="field-mau -value">{{ Number(dapp.stats.mau || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }}</span>
        <span 
          v-if="dapp.stats.mau_pct === undefined || dapp.stats.mau_pct === null" 
          class="field-mau -pct">-</span>
        <span 
          v-else 
          :class="getDappStatsClass(dapp.stats.mau_pct)" 
          class="field-mau -pct"><span v-if="dapp.stats.mau_pct > 0">+</span>{{ Number(dapp.stats.mau_pct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span>
      </li>
      <li class="column -vol_7d">
        <span v-if="volume === undefined || volume === null">-</span>
        <span 
          v-else 
          class="field-vol -value">{{ Number(volume || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }} <template v-if="dapp.platform === 'EOS'">EOS</template><template v-if="dapp.platform === 'POA'">POA</template><template v-if="dapp.platform === 'Ethereum'">ETH</template></span>
        <span 
          v-if="volumePct === undefined || volumePct === null" 
          class="field-vol -pct">-</span>
        <span 
          v-else 
          :class="getDappStatsClass(volumePct)" 
          class="field-vol -pct"><span v-if="volumePct > 0">+</span>{{ Number(volumePct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span>
      </li>
      <li class="column -dev_30d">
        <span v-if="dapp.stats.dev_30d === undefined || dapp.stats.dev_30d === null">-</span>
        <span 
          v-else 
          class="field-dev -value">{{ Number(dapp.stats.dev_30d || 0).toLocaleString(undefined, {maximumFractionDigits: 0}) }}</span>
        <span 
          v-if="dapp.stats.dev_30d_pct === undefined || dapp.stats.dev_30d_pct === null" 
          class="field-dev -pct">-</span>
        <span 
          v-else 
          :class="getDappStatsClass(dapp.stats.dev_30d_pct)" 
          class="field-dev -pct"><span v-if="dapp.stats.dev_30d_pct > 0">+</span>{{ Number(dapp.stats.dev_30d_pct).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}%</span>
      </li>
      <li class="column -users_30d">
        <div class="wrapper">
          <trend
            :data="dapp.sparklines.users"
            :gradient="['#333']"
            :stroke-width="3"
            :padding="4"
            auto-draw
            smooth/>
        </div>
      </li>
    </ul>
  </li>
</template>

<script>
import { trackDappView } from '~/helpers/mixpanel'
import Trend from 'vuetrend'

export default {
  components: {
    Trend
  },
  props: {
    dapp: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      sourcePath: this.$route.path
    }
  },
  computed: {
    volume() {
      let volume
      let stats = this.dapp.stats
      let platform = this.dapp.platform
      if (platform === 'Ethereum') {
        volume = stats.value_7d
      } else if (platform === 'EOS') {
        volume = stats.eos_value_7d
      } else if (platform === 'POA') {
        volume = stats.poa_value_7d
      }
      return volume
    },
    volumePct() {
      let volumePct
      let stats = this.dapp.stats
      let platform = this.dapp.platform
      if (platform === 'Ethereum') {
        volumePct = stats.value_7d_pct
      } else if (platform === 'EOS') {
        volumePct = stats.eos_value_7d_pct
      } else if (platform === 'POA') {
        volumePct = stats.poa_value_7d_pct
      }
      return volumePct
    }
  },
  methods: {
    getDappStatsClass(value) {
      let result = ''
      if (value && value > 0) {
        result = 'is-positive'
      } else if (value && value < 0) {
        result = 'is-negative'
      }
      return result
    },
    trackDappView(targetDapp) {
      const sourceCollection = this.sourceCollection
      const sourceComponent = 'DappListItem'
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

@include dapp-rankings-widths;

.tag {
  display: inline-block;
  font-size: 0.95rem;
  padding: 3px 6px;
  background: rgba($color--gray, 0.6);
  border-radius: 4px;
  margin-right: 4px;
  white-space: nowrap;
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
  &.-rank,
  &.-dau,
  &.-mau,
  &.-vol_7d,
  &.-dev_30d {
    font-size: 1.05rem;
    @include font-monospace;
  }
  &.-dau {
    display: flex;
    flex-direction: column;
  }
  &.-vol_7d,
  &.-mau,
  &.-dev_30d {
    display: flex;
    flex-direction: column;
  }
  &.-profile {
    .profile-percentage {
      @include font-monospace;
      margin-left: auto;
    }
  }
  &:nth-last-child(2) {
    border-width: 0;
    @include tweakpoint('min-width', 1000px) {
      border-width: 1px;
    }
  }
  @include tweakpoint('min-width', 800px) {
    border-right: 1px solid darken($color--gray, 10%);
    &:last-child {
      border-right: none;
    }
  }
}

.dapp-icon {
  width: 32px;
  height: 32px;
  display: block;
  border-radius: 4px;
}

.dapp-icon-wrapper {
  display: block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 4px;
  text-decoration: none;
  &.has-no-icon {
    text-transform: uppercase;
    background: $color--gray;
  }
}

.dapp-link {
  font-weight: 700;
}

.field-dau,
.field-vol,
.field-mau,
.field-dev {
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
  .-users_30d & {
    height: auto;
  }
}
</style>
