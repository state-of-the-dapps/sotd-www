<template>
  <transition name="fade">
    <div class="container" v-if="isActive" v-on-clickaway="hide">
      <ul class="list">
        <li v-for="option in optionsWithoutSelected" v-if="hasRelevance(option)" class="item" @click.stop="select(option)">{{ option | formatDappsTabOptions }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { dappsTabOptions as tabOptions } from '~/helpers/constants'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      isActive () {
        return this.$store.getters['dapps/list/tabsDropdownIsActive']
      },
      optionsWithoutSelected () {
        const selected = this.$store.getters['dapps/list/tabQuery']
        const options = tabOptions.slice() || []
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
        this.$mixpanel.track('DApps - Click away from tabs')
        this.$store.dispatch('dapps/list/toggleBrowseDropdown', 'tabs')
      },
      select (option) {
        this.$mixpanel.track('DApps - Select tab', { option: option })
        this.$store.dispatch('dapps/list/setTabQuery', option)
        this.$store.dispatch('dapps/list/toggleBrowseDropdown', 'tabs')
        this.$store.dispatch('dapps/list/fetchItems')
      }
    }
  }
</script>
