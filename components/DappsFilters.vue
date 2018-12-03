<template>
  <div class="component-dapps-filters">
    <div class="filter">
      <BaseDropdown
        :options="platformOptions"
        :selected="formattedPlatformQuery"
        all-text="All platforms"
        name="Platform"
        title="Choose a platform"
        @select="selectPlatform"/>
    </div>
    <div class="filter">
      <BaseDropdown
        :options="categoryOptions"
        :selected="categoryQuery"
        all-text="All categories"
        name="Category"
        title="Choose a category"
        @select="selectCategory"/>
    </div>
    <div class="filter">
      <BaseDropdown
        :options="statusOptions"
        :selected="statusQuery"
        all-text="All statuses"
        name="Status"
        title="Choose a status"
        @select="selectStatus"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getCategories } from '~/helpers/api'
import { trackDappsFilter } from '~/helpers/mixpanel'
import { dappStatuses, platformList, platformMap } from '~/helpers/constants'
import BaseDropdown from './BaseDropdown'

export default {
  components: {
    BaseDropdown
  },
  data() {
    return {
      categoryOptions: [],
      platformOptions: this.getPlatformOptions(platformList),
      statusOptions: this.getDappStatusOptions(dappStatuses)
    }
  },
  computed: {
    ...mapGetters('dapps/search', [
      'categoryQuery',
      'platformQuery',
      'statusQuery'
    ]),
    formattedPlatformQuery() {
      return platformMap[this.platformQuery.toLowerCase()]
    }
  },
  async mounted() {
    const categories = await this.getCategoryOptions()
    this.categoryOptions = categories
  },
  methods: {
    ...mapActions('dapps/search', [
      'fetchItems',
      'setCategoryQuery',
      'setPlatformQuery',
      'setStatusQuery'
    ]),
    getDappStatusOptions(options) {
      const optionsArr = options.map(x => {
        const optionObj = {
          text: this.$options.filters.capitalize(x),
          selection: x.toLowerCase()
        }
        return optionObj
      })
      return optionsArr
    },
    getPlatformOptions(options) {
      const optionsArr = options.map(x => {
        const optionObj = {
          text: x,
          selection: x.toLowerCase()
        }
        return optionObj
      })
      return optionsArr
    },
    async getCategoryOptions() {
      const categories = await getCategories(this.$axios)
      const optionsArr = categories.map(x => {
        const optionObj = {
          text: x.name,
          selection: x.slug
        }
        return optionObj
      })
      return optionsArr
    },
    selectCategory(category) {
      this.setCategoryQuery(category)
      this.fetchItems()
      this.trackFilter('category', category)
    },
    selectPlatform(platform) {
      this.setPlatformQuery(platform)
      this.fetchItems()
      this.trackFilter('platform', platform)
    },
    selectStatus(status) {
      this.setStatusQuery(status)
      this.fetchItems()
      this.trackFilter('status', status)
    },
    trackFilter(type, option) {
      const action = trackDappsFilter(type, option)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.filter {
  padding-bottom: 15px;
}
</style>
