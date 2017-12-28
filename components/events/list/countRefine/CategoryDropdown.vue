<template>
  <transition name="fade">
    <div class="container" v-if="isActive" v-on-clickaway="hide">
      <ul class="list">
        <li v-for="(option, index) in optionsWithoutSelected" :key="index" class="item" @click.stop="select(option)">{{ option }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { eventRefineCategoryOptions as categoryOptions } from '~/helpers/constants'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      isActive () {
        return this.$store.getters['events/list/categoryDropdownIsActive']
      },
      optionsWithoutSelected () {
        const selected = this.$store.getters['events/list/categoryQuery']
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
      hide () {
        this.$mixpanel.track('Events - Hide categories dropdown')
        this.$store.dispatch('events/list/toggleRefineDropdown', 'category')
      },
      select (option) {
        this.$mixpanel.track('Events - Select category', { option: option })
        this.$store.dispatch('events/list/setCategoryQuery', option)
        this.$store.dispatch('events/list/toggleRefineDropdown', 'category')
        this.$store.dispatch('events/list/fetchItems')
      }
    }
  }
</script>
