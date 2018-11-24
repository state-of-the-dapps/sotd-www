<template>
  <transition name="fade">
    <div 
      v-on-clickaway="hide" 
      v-if="isActive" 
      class="container">
      <ul class="list">
        <li 
          v-for="(option, index) in optionsWithoutSelected" 
          :key="index" 
          class="item" 
          @click.stop="select(option)">{{ option }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { dappRefineStatusOptions as statusOptions } from '~/helpers/constants'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    isActive() {
      return this.$store.getters['dapps/search/statusDropdownIsActive']
    },
    optionsWithoutSelected() {
      const selected = this.$store.getters['dapps/search/statusQuery']
      const options = statusOptions.slice() || []
      if (options.indexOf(selected) !== -1) {
        options.splice(options.indexOf(selected), 1)
      } else {
        options.shift()
      }
      return options
    }
  },
  methods: {
    hide() {
      this.$mixpanel.track('DApps - Hide status dropdown')
      this.$store.dispatch('dapps/search/toggleRefineDropdown', 'status')
    },
    select(option) {
      this.$mixpanel.track('DApps - Select status', { option: option })
      this.$store.dispatch('dapps/search/setStatusQuery', option)
      this.$store.dispatch('dapps/search/toggleRefineDropdown', 'status')
      this.$store.dispatch('dapps/search/fetchItems')
    }
  }
}
</script>
