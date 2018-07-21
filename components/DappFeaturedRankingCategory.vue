<template>
  <div class="component-DappFeaturedRankingCategory">
    <h3 class="title-3">
      <a @click="viewDappRankingCategory(category)" class="link">{{ category.name }} <SvgIconChevron :width="8" :height="8" direction="right" /></a>
      <span class="label-dau">Users (24hr)</span>
    </h3>
    <ul class="dapp-list">
      <li class="dapp-item" v-for="(dapp, index) in dapps" :key="index">
        <span class="dapp-name"><nuxt-link @click.native="trackDappView(dapp.slug)" :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }">{{ dapp.name }}</nuxt-link></span>
        <span class="dapp-dau">{{ dapp.stats.dau.toLocaleString() }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '~/helpers/axios'
import { mapActions } from 'vuex'
import { trackDappRankingCategory, trackDappView } from '~/helpers/mixpanel'
import { dappCategoryTagsMap } from '~/helpers/constants'
import Help from './Help'
import SvgIconChevron from './SvgIconChevron'

export default {
  data () {
    return {
      dapps: [],
      sourcePath: this.$route.path
    }
  },
  components: {
    Help,
    SvgIconChevron
  },
  props: ['category'],
  methods: {
    ...mapActions('dapps/rankings', [
      'fetchDapps',
      'setCategory',
      'setSort'
    ]),
    trackDappView (targetDapp) {
      const sourceCollection = ''
      const sourceComponent = 'DappFeaturedRankingCategory'
      const action = trackDappView(sourceCollection, sourceComponent, this.sourcePath, targetDapp)
      this.$mixpanel.track(action.name, action.data)
    },
    viewDappRankingCategory (category) {
      const sourceComponent = 'DappFeaturedRankingCategory'
      const action = trackDappRankingCategory(sourceComponent, this.sourcePath, category.slug)
      this.$mixpanel.track(action.name, action.data)
      this.setCategory(category.slug)
      this.setSort({ order: 'asc', sort: 'rank' })
      this.fetchDapps()
      this.$router.push({name: 'rankings-category', params: {category: category.slug}})
    }
  },
  mounted () {
    axios
      .get('dapps', {
        params: {
          limit: 5,
          offset: 0,
          order: 'asc',
          sort: 'rank',
          tags: dappCategoryTagsMap[this.category.slug]
        }
      })
      .then((response) => {
        const dapps = response.data.items
        this.dapps = dapps
      })
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
  box-shadow: 0 5px 10px rgba($color--black, .05);
  margin-bottom: 7px;
  padding: 10px;
}

.dapp-list {
  margin-top: 5px;
}

.label-dau {
  font-weight: 300;
  font-size: .95rem;
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
  letter-spacing: -.25px;
  margin-left: 10px;
  text-decoration: none;
  font-weight: 300;
}
</style>
