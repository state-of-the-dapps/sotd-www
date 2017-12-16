<template>
  <transition name="fade">
    <div class="container" v-if="isActive" v-on-clickaway="hide">
      <ul class="list">
        <li v-for="option in optionsWithoutSelected" class="item" @click.stop="select(option)">{{ option }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { projectRefineStatusOptions as statusOptions } from '~/helpers/constants'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      isActive () {
        return this.$store.getters['projects/list/statusDropdownIsActive']
      },
      optionsWithoutSelected () {
        const selected = this.$store.getters['projects/list/statusQuery']
        const options = statusOptions.slice() || []
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
        this.$mixpanel.track('Projects - Click away from status')
        this.$store.dispatch('projects/list/toggleRefineDropdown', 'status')
      },
      select (option) {
        this.$mixpanel.track('Projects - Select status', { option: option })
        this.$store.dispatch('projects/list/setStatusQuery', option)
        this.$store.dispatch('projects/list/toggleRefineDropdown', 'status')
        this.$store.dispatch('projects/list/fetchItems')
      }
    }
  }
</script>
