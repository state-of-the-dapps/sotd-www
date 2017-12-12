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
  import { dappsStatusOptions as statusOptions } from '~/helpers/constants'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      isActive () {
        return this.$store.getters['dapps/list/statusDropdownIsActive']
      },
      optionsWithoutSelected () {
        const selected = this.$store.getters['dapps/list/statusQuery']
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
        this.$mixpanel.track('DApps - Click away from status')
        this.$store.dispatch('dapps/list/toggleBrowseDropdown', 'status')
      },
      select (option) {
        this.$mixpanel.track('DApps - Select status', { option: option })
        this.$store.dispatch('dapps/list/setStatusQuery', option)
        this.$store.dispatch('dapps/list/toggleBrowseDropdown', 'status')
        this.$store.dispatch('dapps/list/fetchItems')
      }
    }
  }
</script>
