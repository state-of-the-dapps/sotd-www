<template>
  <transition name="fade">
    <div class="container" v-if="isActive" v-on-clickaway="hide">
      <ul class="list">
        <li v-for="option in optionsWithoutSelected" v-if="hasRelevance(option)" class="item" @click.stop="select(option)">{{ option | formatDappsCategoryOptions }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { dappsCategoryOptions as categoryOptions } from '~/helpers/constants'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      isActive () {
        return this.$store.getters['dapps/list/categoriesDropdownIsActive']
      },
      optionsWithoutSelected () {
        const selected = this.$store.getters['dapps/list/categoryQuery']
        const options = categoryOptions.slice() || []
        if (options.indexOf(selected) !== -1) {
          options.splice(options.indexOf(selected), 1)
        } else {
          options.shift()
        }
        return options
      }
    },
    directives: {
      onClickaway: onClickaway
    },
    methods: {
      hasRelevance (option) {
        if (option === 'most-relevant') {
          var textQuery = this.$store.getters['dapps/list/textQuery']
          return textQuery.length > 0
        } else {
          return true
        }
      },
      hide () {
        this.$mixpanel.track('DApps - Click away from categories')
        this.$store.dispatch('dapps/list/toggleBrowseDropdown', 'categories')
      },
      select (option) {
        this.$mixpanel.track('DApps - Select category', { option: option })
        this.$store.dispatch('dapps/list/setCategoryQuery', option)
        this.$store.dispatch('dapps/list/toggleBrowseDropdown', 'categories')
        this.$store.dispatch('dapps/list/fetchItems')
      }
    }
  }
</script>
