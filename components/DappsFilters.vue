<template>
  <div class="component-dapps-filters">
    <template v-for="(filter, index) in filters">
      <div
        :key="index"
        class="filter">
        <BaseFilter
          :all-text="filter.allText"
          :filter="filter.name"
          :options="filter.options"
          :selected="filter.selected"
          :title="filter.title"/>
      </div>
    </template>
  </div>
</template>

<script>
import { getCategories } from '~/helpers/api'
import { dappStatuses, platformList } from '~/helpers/constants'
import BaseFilter from './BaseFilter'

export default {
  components: {
    BaseFilter
  },
  data () {
    return {
      filters: [
        {
          allText: 'All platforms',
          name: 'Platform',
          options: this.getPlatformOptions(platformList),
          selected: '',
          title: 'Choose a platform'
        },
        {
          allText: 'All categories',
          name: 'Category',
          options: [],
          selected: '',
          title: 'Choose a category'
        },
        {
          allText: 'All statuses',
          name: 'Status',
          options: this.getDappStatusOptions(dappStatuses),
          selected: '',
          title: 'Choose a status'
        }
      ]
    }
  },
  methods: {
    getDappStatusOptions (options) {
      const optionsArr = options.map(x => {
        const optionObj = {
          text: this.$options.filters.capitalize(x),
          selection: x.toLowerCase()
        }
        return optionObj
      })
      return optionsArr
    },
    getPlatformOptions (options) {
      const optionsArr = options.map(x => {
        const optionObj = {
          text: x,
          selection: x.toLowerCase()
        }
        return optionObj
      })
      return optionsArr
    },
    async getCategoryOptions () {
      const categories = await getCategories()
      const optionsArr = categories.map(x => {
        const optionObj = {
          text: x.name,
          selection: x.slug
        }
        return optionObj
      })
      return optionsArr
    }
  },
  async mounted () {
    const categories = await this.getCategoryOptions()
    this.filters[1].options = categories
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.filter {
  padding-bottom: 15px;
}
</style>
