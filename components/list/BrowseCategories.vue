<template>
  <transition name="fade">
    <div class="container" v-if="isActive" :style="{ left: position.xPos + 'px', top: position.yPos + 22 + 'px' }" v-on-clickaway="hide">
      <ul class="list">
        <li v-for="option in optionsWithoutSelected" class="item" @click="select(option)">{{ option | formatBrowseCategoryOptions }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      isActive () {
        return this.$store.getters['dapps/browseCategories/isActive']
      },
      options () {
        return this.$store.getters['dapps/browseCategories/options']
      },
      optionsWithoutSelected () {
        const selected = this.$store.getters['dapps/categoryQuery']
        const options = this.options.slice() || []
        if (options.indexOf(selected) !== -1) {
          options.splice(options.indexOf(selected), 1)
        } else {
          options.shift()
        }
        return options
      },
      position () {
        return this.$store.getters['dapps/browseCategories/position']
      }
    },
    directives: {
      onClickaway: onClickaway
    },
    methods: {
      hide () {
        this.$mixpanel.track('DApps - Click away from categories')
        this.$store.dispatch('dapps/browseCategories/toggle')
      },
      select (option) {
        this.$mixpanel.track('DApps - Select category', { option: option })
        this.$store.dispatch('dapps/updateCategoryQuery', option)
        this.$store.dispatch('dapps/browseCategories/toggle')
        this.$store.dispatch('dapps/findItems')
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
