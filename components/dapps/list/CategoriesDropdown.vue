<template>
  <transition name="fade">
    <div class="container" v-if="isActive" v-on-clickaway="hide">
      <ul class="list">
        <li v-for="option in optionsWithoutSelected" v-if="hasRelevance(option)" class="item" @click="select(option)">{{ option | formatBrowseCategoryOptions }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { browseCategoryOptions as options } from '~/helpers/constants'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      isActive () {
        return this.$store.getters['dapps/list/categoriesDropdownIsActive']
      },
      optionsWithoutSelected () {
        const selected = this.$store.getters['dapps/list/categoryQuery']
        const options = this.options.slice() || []
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
        this.$store.dispatch('dapps/browseCategories/toggle')
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

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    position: absolute;
    border: 1px solid $color--mine-shaft;
    background: rgba(lighten($color--gallery, 100%),.95);
    padding: 10px;
    width: 145px;
    z-index: 10;
    box-shadow: 0 0 10px rgba($color--mine-shaft,.1);
  }

  .item {
    margin: 4px 0;
    font-size: .95rem;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      border-left: 1px solid $color--mine-shaft;
      padding-left: 3px;
      margin-left: -4px;
      cursor: pointer;
    }
  }
</style>
