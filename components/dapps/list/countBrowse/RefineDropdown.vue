<template>
  <transition name="fade">
    <div class="container" v-if="isActive" v-on-clickaway="hide">
      <ul class="list">
        <li v-for="option in optionsWithoutSelected" class="item" @click="select(option)">{{ option }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { dappsRefineOptions as refineOptions } from '~/helpers/constants'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      isActive () {
        return this.$store.getters['dapps/list/refineDropdownIsActive']
      },
      optionsWithoutSelected () {
        const selected = this.$store.getters['dapps/list/refineQuery']
        const options = refineOptions || []
        options.slice()
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
        this.$mixpanel.track('DApps - Click away from refine')
        this.$store.dispatch('dapps/list/toggleBrowseDropdown', 'refine')
      },
      select (option) {
        this.$mixpanel.track('DApps - Select refine', { option: option })
        this.$store.dispatch('dapps/list/updateRefineQuery', option)
        this.$store.dispatch('dapps/list/toggleBrowseDropdown', 'refine')
        this.$store.dispatch('dapps/list/fetchItems')
      }
    }
  }
</script>
