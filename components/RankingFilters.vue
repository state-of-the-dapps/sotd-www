<template>
  <div class="component-ranking-filters">
    <div class="filter-wrapper">
      <BaseDropdown
        :important="true"
        :options="categoryOptions"
        :selected="category"
        all-text="All categories"
        name="Category"
        title="Choose a category"
        @select="filterCategory"/>
    </div>
    <div class="filter-wrapper">
      <BaseDropdown
        :options="platformOptions"
        :selected="platform"
        all-text="All platforms"
        name="Platform"
        title="Choose a platform"
        @select="filterPlatform"/>
    </div>
  </div>
</template>

<script>
import { platformList, platformMap } from '~/helpers/constants'
import { getCategories } from '~/helpers/api'
import {
  trackDappRankingCategory,
  trackDappRankingPlatform
} from '~/helpers/mixpanel'
import BaseDropdown from '~/components/BaseDropdown'

export default {
  components: {
    BaseDropdown
  },
  data() {
    return {
      category: '',
      dappPlatforms: platformList,
      dappCategories: [],
      platform: '',
      sourcePath: this.$route.path
    }
  },
  computed: {
    categoryOptions() {
      const options = this.dappCategories.map(x => {
        const optionObj = {
          text: x.name,
          selection: x.slug
        }
        return optionObj
      })
      return options
    },
    platformOptions() {
      const options = this.dappPlatforms.map(x => {
        const optionObj = {
          text: x,
          selection: x.toLowerCase()
        }
        return optionObj
      })
      return options
    }
  },
  async mounted() {
    const urlCategory = this.$route.params.category
    const urlPlatform = platformMap[this.$route.params.platform]
    this.category = urlCategory
    this.platform = urlPlatform
    this.dappCategories = await getCategories(this.$axios)
  },
  methods: {
    filterCategory(category) {
      this.category = category
      this.trackDappRankingCategory(category)
      let path = '/rankings'
      if (this.platform) {
        path += `/platform/${this.platform.toLowerCase()}`
      }
      if (category) {
        path += `/category/${category.toLowerCase()}`
      }
      this.$router.push({ path })
    },
    filterPlatform(platform) {
      this.platform = platformMap[platform]
      this.trackDappRankingPlatform(platform)
      let path = '/rankings'
      if (platform) {
        path += `/platform/${platform.toLowerCase()}`
      }
      if (this.category) {
        path += `/category/${this.category.toLowerCase()}`
      }
      this.$router.push({ path })
    },
    trackDappRankingCategory(category) {
      const sourceComponent = 'RankingFilters'
      const action = trackDappRankingCategory(
        sourceComponent,
        this.sourcePath,
        category
      )
      this.$mixpanel.track(action.name, action.data)
    },
    trackDappRankingPlatform(platform) {
      const sourceComponent = 'RankingFilters'
      const action = trackDappRankingPlatform(
        sourceComponent,
        this.sourcePath,
        platform
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-base-filter {
  margin: 10px 6px 5px 6px;
}

.component-ranking-filters {
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-wrapper {
  width: 150px;
  margin: 0 5px;
}
</style>
