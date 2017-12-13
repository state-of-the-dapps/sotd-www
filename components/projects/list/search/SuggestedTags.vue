<template>
  <transition name="fade">
    <div class="container" v-if="items && items.length > 0" v-on-clickaway="reset">
      <ul class="list">
        <li v-for="(item, key) in items" class="item" @click="select(item, key)">{{ item }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'
  import { getCaretPosition } from '~/helpers/mixins'

  export default {
    computed: {
      items () {
        return this.$store.getters['tags/items']
      },
      textQuery: {
        get () {
          return this.$store.getters['projects/list/textQuery']
        },
        set (value) {
          this.$store.dispatch('projects/list/setTextQuery', value)
        }
      }
    },
    directives: {
      onClickaway: onClickaway
    },
    methods: {
      reset () {
        this.$store.dispatch('tags/resetItems')
      },
      select (item, key) {
        var caret = this.getCaretPosition(this.textQuery)
        var result = /\S+$/.exec(this.textQuery.slice(0, caret.end))
        var lastWord = result ? result[0] : null
        this.textQuery = this.textQuery.replace(lastWord, '')
        document.getElementById('search').focus()
        this.$store.dispatch('tags/selectItem', key)
        this.$store.dispatch('tags/resetItems')
        this.$store.dispatch('projects/list/addTagToQuery', item)
        this.$store.dispatch('projects/list/fetchItems')
        this.$mixpanel.track('Projects - Select tag', { tag: item })
      }
    },
    mixins: [getCaretPosition]
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    position: absolute;
    background: rgba($color--gallery,.9);
    padding: 10px;
    box-shadow: 0 17px 70px rgba($color--mine-shaft,.2);
    width: 250px;
    top: 65px;
    left: 10px;
    overflow: hidden;
    z-index: 10;
    @include tweakpoint('min-width', $tweakpoint--default) {
      top: 85px;
      left: 75px;
      width: 500px;
    }
  }

  .item {
    display: block;
    padding: 7px 28px 7px 10px;
    background: lighten($color--gallery,2%);
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    text-decoration: none;
    position: relative;
    margin: 2px;
    &:hover {
      cursor: pointer;
    }
    &:after {
      content: "";
      position: absolute;
      right: 10px;
      bottom: 9px;
      background: url('~/assets/images/close/small.png') center center no-repeat;
      background-size: 9px 9px;
      width: 9px;
      height: 9px;
      transform: rotate(45deg);
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
</style>
