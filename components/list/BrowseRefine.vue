<template>
  <transition name="fade">
    <div class="container" v-if="isActive" :style="{ left: position.xPos + 'px', top: position.yPos + 22 + 'px' }" v-on-clickaway="hide">
      <ul class="list">
        <li v-for="option in optionsWithoutSelected" class="item" @click="select(option)">{{ option }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      isActive () {
        return this.$store.getters['dapps/browseRefine/isActive']
      },
      position () {
        return this.$store.getters['dapps/browseRefine/position']
      },
      options () {
        return this.$store.getters['dapps/browseRefine/options']
      },
      optionsWithoutSelected () {
        const selected = this.$store.getters['dapps/browseRefine/selected']
        const options = this.options.slice()
        options.splice(options.indexOf(selected), 1)
        return options
      }
    },
    directives: {
      onClickaway: onClickaway
    },
    methods: {
      hide () {
        this.$mixpanel.track('DApps - Click away from refine')
        this.$store.dispatch('dapps/browseRefine/toggle')
      },
      select (option) {
        this.$mixpanel.track('DApps - Select refine', { option: option })
        this.$store.dispatch('dapps/updateRefineQuery', option)
        this.$store.dispatch('dapps/browseRefine/select', option)
        this.$store.dispatch('dapps/browseRefine/toggle')
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
    width: 100px;
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
