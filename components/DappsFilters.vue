<template>
  <div class="DappsFilters">
    <div class="filter">
      <BaseDropdown
        :options="platformOptions"
        :selected="formattedPlatformQuery"
        :all-text="$t('filters.allPlatforms')"
        :name="$t('platform')"
        :title="$t('filters.choosePlatform')"
        @select="selectPlatform"/>
    </div>
    <div class="filter">
      <BaseDropdown
        :options="categoryOptions"
        :selected="categoryQuery ? $t(`categoryOptions.${$options.filters.capitalize(categoryQuery)}`) : ''"
        :all-text="$t('filters.allCategories')"
        :name="$tc('category', 1)"
        :title="$t('filters.chooseCategory')"
        @select="selectCategory"/>
    </div>
    <div class="filter">
      <BaseDropdown
        :options="statusOptions"
        :selected="statusQuery ? $t(`statusOptions.${statusQuery}`) : ''"
        :all-text="$t('filters.allStatuses')"
        :name="$t('status')"
        :title="$t('filters.chooseStatus')"
        @select="selectStatus"/>
    </div>
  </div>
</template>

<script>
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
      platformOptions: this.getPlatformOptions(platformList()),
      statusOptions: this.getDappStatusOptions(dappStatuses)
    }
  },
  computed: {
    categoryQuery() {
      return this.$route.params.category || ''
    },
    platformQuery() {
      return this.$route.params.platform || ''
    },
    statusQuery() {
      return this.$route.query.status || ''
    },
    formattedPlatformQuery() {
      return platformMap[this.platformQuery.toLowerCase()]
    }
  },
  async mounted() {
    try {
      const categories = await this.getCategoryOptions()
      this.categoryOptions = categories
    } catch (e) {
      this.$sentry.captureException(e)
    }
  },
  methods: {
    getDappStatusOptions(options) {
      const optionsArr = options.map(x => {
        const optionObj = {
          text: this.$options.filters.capitalize(this.$t(`statusOptions.${x}`)),
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
      let optionsArr = []
      try {
        const categories = await getCategories(this.$axios)
        optionsArr = categories.map(x => {
          const optionObj = {
            text: this.$t(`categoryOptions.${x.name}`),
            selection: x.slug
          }
          return optionObj
        })
      } catch (e) {
        this.$sentry.captureException(e)
      } finally {
        return optionsArr
      }
    },
    selectCategory(category) {
      let routeName = 'dapps'
      if (this.$route.params.platform) {
        routeName += '-platform'
      }
      if (category) {
        routeName += '-category'
      }
      this.$router.push(
        this.localePath({
          name: routeName,
          params: { ...this.$route.params, category: category || undefined },
          query: { ...this.$route.query, page: 1 }
        })
      )
      this.trackFilter('category', category)
    },
    selectPlatform(platform) {
      let routeName = 'dapps'
      if (platform) {
        routeName += '-platform'
      }
      if (this.$route.params.category) {
        routeName += '-category'
      }
      this.$router.push(
        this.localePath({
          name: routeName,
          params: { ...this.$route.params, platform: platform || undefined },
          query: { ...this.$route.query, page: 1 }
        })
      )
      this.trackFilter('platform', platform)
    },
    selectStatus(status) {
      let routeName = 'dapps'
      if (this.$route.params.platform) {
        routeName += '-platform'
      }
      if (this.$route.params.category) {
        routeName += '-category'
      }
      this.$router.push(
        this.localePath({
          name: routeName,
          params: { ...this.$route.params },
          query: {
            ...this.$route.query,
            status: status || undefined,
            page: 1
          }
        })
      )
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
.filter {
  padding-bottom: 15px;
}
</style>
