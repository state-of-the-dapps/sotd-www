<template>
  <transition name="fade">
    <div class="container" v-if="isActive" v-on-clickaway="hide">
      <ul class="list">
        <li v-for="(option, index) in optionsWithoutSelected" :key="index" v-if="hasRelevance(option)" class="item" @click.stop="select(option)">{{ option | formatProjectTabOptions }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { projectRefineTabOptions as tabOptions } from '~/helpers/constants'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      isActive () {
        return this.$store.getters['projects/list/tabDropdownIsActive']
      },
      optionsWithoutSelected () {
        const selected = this.$store.getters['projects/list/tabQuery']
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
          var textQuery = this.$store.getters['projects/list/textQuery']
          return textQuery.length > 0
        } else {
          return true
        }
      },
      hide () {
        this.$mixpanel.track('Projects - Hide tab dropdown')
        this.$store.dispatch('projects/list/toggleRefineDropdown', 'tab')
      },
      select (option) {
        this.$mixpanel.track('Projects - Select tab', { option: option })
        this.$store.dispatch('projects/list/setTabQuery', option)
        this.$store.dispatch('projects/list/toggleRefineDropdown', 'tab')
        this.$store.dispatch('projects/list/fetchItems')
      }
    }
  }
</script>
