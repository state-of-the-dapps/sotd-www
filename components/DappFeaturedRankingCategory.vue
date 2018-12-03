<template>
  <div class="component-DappFeaturedRankingCategory">
    <h3 class="title-3">
      <a 
        class="link" 
        @click="viewDappRankingCategory(category)">{{ category.name }} <SvgIconChevron 
          :width="8" 
          :height="8" 
          direction="right" /></a>
      <span class="label-dau">Users (24hr)</span>
    </h3>
    <ul class="dapp-list">
      <li 
        v-for="(dapp, index) in dapps" 
        :key="index" 
        class="dapp-item">
        <span
          :class="dapp.categories ? '-' + dapp.categories[0] : ''"
          class="dapp-rank"><span>{{ index + 1 }}</span></span>
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
        <span class="dapp-name"><nuxt-link 
          :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }" 
          @click.native="trackDappView(dapp.slug)">{{ dapp.name }}</nuxt-link></span>
        <span class="dapp-dau"><span v-if="dapp.stats.dau !== undefined">{{ dapp.stats.dau.toLocaleString() }}</span><span v-else>-</span></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { trackDappRankingCategory, trackDappView } from '~/helpers/mixpanel'
import Help from './Help'
import SvgIconChevron from './SvgIconChevron'

export default {
  components: {
    Help,
    SvgIconChevron
  },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dapps: [],
      sourcePath: this.$route.path
    }
  },
  async mounted() {
    this.$axios
      .get('dapps', {
        params: {
          category: this.category.slug,
          limit: 5,
          offset: 0,
          order: 'asc',
          sort: 'rank'
        }
      })
      .then(response => {
        const dapps = response.data.items
        this.dapps = dapps
      })
  },
  methods: {
    ...mapActions('dapps/rankings', ['fetchDapps', 'setCategory', 'setSort']),
    trackDappView(targetDapp) {
      const sourceCollection = ''
      const sourceComponent = 'DappFeaturedRankingCategory'
      const action = trackDappView(
        sourceCollection,
        sourceComponent,
        this.sourcePath,
        targetDapp
      )
      this.$mixpanel.track(action.name, action.data)
    },
    viewDappRankingCategory(category) {
      const sourceComponent = 'DappFeaturedRankingCategory'
      const action = trackDappRankingCategory(
        sourceComponent,
        this.sourcePath,
        category.slug
      )
      this.$mixpanel.track(action.name, action.data)
      this.setCategory(category.slug)
      this.setSort({ order: 'asc', sort: 'rank' })
      this.fetchDapps()
      this.$router.push({
        name: 'rankings-category',
        params: { category: category.slug }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappFeaturedRankingCategory {
  margin: 10px;
  width: 100%;
  @include tweakpoint('min-width', 600px) {
    width: calc(50% - 20px);
  }
  @include tweakpoint('min-width', 1100px) {
    width: calc(25% - 20px);
  }
}

.dapp-dau {
  @include font-monospace;
  line-height: 1;
  font-size: 1.15rem;
  margin-left: auto;
}

.dapp-item {
  display: flex;
  align-items: center;
  background: $color--white;
  border-radius: 4px;
  box-shadow: 0 5px 10px rgba($color--black, 0.05);
  margin-bottom: 7px;
  padding: 10px;
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

.dapp-list {
  margin-top: 5px;
}

.dapp-rank {
  padding: 5px;
  margin: -10px 15px -10px -10px;
  font-weight: 700;
  height: 52px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  color: $color--purple;
  line-height: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  .dapp-item & {
    @include dapp-category-colors;
  }
}

.label-dau {
  font-weight: 300;
  font-size: 0.95rem;
  position: absolute;
  right: 0;
  top: 3px;
}

.link {
  text-decoration: none;
}

.title-3 {
  @include title-3;
  margin-top: 1rem;
  margin-bottom: 1.15rem;
  position: relative;
}

.view {
  display: inline-block;
  font-size: 1rem;
  letter-spacing: -0.25px;
  margin-left: 10px;
  text-decoration: none;
  font-weight: 300;
}
</style>
