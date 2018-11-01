<template>
  <div class="component-ranking-filters">
    <DappListFilter
      :important="true"
      :options="categoryOptions"
      :selected="category"
      all-text="All categories"
      filter="Category"
      title="Choose a category"
      @select="filterCategory"/>
    <DappListFilter
      :options="platformOptions"
      :selected="platform"
      all-text="All platforms"
      filter="Platform"
      title="Choose a platform"
      @select="filterPlatform"/>
  </div>
</template>

<script>
import { platformList, platformMap } from '~/helpers/constants'
import { getCategories } from '~/helpers/api'
import { trackDappRankingCategory, trackDappRankingPlatform } from '~/helpers/mixpanel'
import DappListFilter from '~/components/DappListFilter'

export default {
  components: {
    DappListFilter
  },
  data () {
    return {
      category: '',
      dappPlatforms: platformList,
      dappCategories: [],
      platform: '',
      sourcePath: this.$route.path
    }
  },
  computed: {
    categoryOptions () {
      const options = this.dappCategories.map(x => {
        const optionObj = {
          text: x.name,
          selection: x.slug
        }
        return optionObj
      })
      return options
    },
    platformOptions () {
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
  methods: {
    filterCategory (category) {
      this.category = category
      this.trackDappRankingCategory(category)
      let path = '/rankings'
      if (this.platform) {
        path += `/platform/${this.platform.toLowerCase()}`
      }
      if (category) {
        path += `/category/${category.toLowerCase()}`
      }
      this.$router.push({path})
    },
    filterPlatform (platform) {
      this.platform = platformMap[platform]
      this.trackDappRankingPlatform(platform)
      let path = '/rankings'
      if (platform) {
        path += `/platform/${platform.toLowerCase()}`
      }
      if (this.category) {
        path += `/category/${this.category.toLowerCase()}`
      }
      this.$router.push({path})
    },
    trackDappRankingCategory (category) {
      const sourceComponent = 'DappListFilter'
      const action = trackDappRankingCategory(sourceComponent, this.sourcePath, category)
      this.$mixpanel.track(action.name, action.data)
    },
    trackDappRankingPlatform (platform) {
      const sourceComponent = 'DappListFilter'
      const action = trackDappRankingPlatform(sourceComponent, this.sourcePath, platform)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  async mounted () {
    const urlCategory = this.$route.params.category
    const urlPlatform = platformMap[this.$route.params.platform]
    this.category = urlCategory
    this.platform = urlPlatform
    this.dappCategories = await getCategories()
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-ranking-filters {
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
