<template>
  <transition name="fade">
    <div 
      v-on-clickaway="hide" 
      v-if="isActive" 
      class="container">
      <ul class="list">
        <li 
          v-for="(option, index) in optionsWithoutSelected" 
          v-if="hasRelevance(option)" 
          :key="index" 
          class="item" 
          @click.stop="select(option)">{{ option | formatDappTabOptions }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { dappRefineTabOptions as tabOptions } from '~/helpers/constants'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    isActive() {
      return this.$store.getters['dapps/search/tabDropdownIsActive']
    },
    optionsWithoutSelected() {
      const selected = this.$store.getters['dapps/search/tabQuery']
      const options = tabOptions.slice() || []
      if (options.indexOf(selected) !== -1) {
        options.splice(options.indexOf(selected), 1)
      } else {
        options.shift()
      }
      return options
    }
  },
  methods: {
    hasRelevance(option) {
      if (option === 'most-relevant') {
        var textQuery = this.$store.getters['dapps/search/textQuery']
        return textQuery.length > 0
      } else {
        return true
      }
    },
    hide() {
      this.$mixpanel.track('DApps - Hide tab dropdown')
      this.$store.dispatch('dapps/search/toggleRefineDropdown', 'tab')
    },
    select(option) {
      this.$mixpanel.track('DApps - Select tab', { option: option })
      this.$store.dispatch('dapps/search/setTabQuery', option)
      this.$store.dispatch('dapps/search/toggleRefineDropdown', 'tab')
      this.$store.dispatch('dapps/search/fetchItems')
    }
  }
}
</script>
