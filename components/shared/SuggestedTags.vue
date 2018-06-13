<template>
  <transition name="fade">
    <div class="container -suggested-tags" v-if="items && items.length > 0" v-on-clickaway="reset">
      <ul class="list">
        <li v-for="(item, key) in items" :key="key" class="item" @click="select(item, key)">{{ item }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'
  import { getCaretPosition } from '~/helpers/mixins'

  export default {
    props: {
      items: {
        type: Array,
        required: true,
        default: []
      },
      textQuery: {
        type: String,
        required: true,
        default: ''
      },
      model: {
        type: String,
        required: true,
        validator: function (value) {
          const allowedValues = [
            'events',
            'dapps'
          ]
          return allowedValues.includes(value)
        }
      }
    },
    destroyed () {
      // reset tags and hide when a new route is activated (v-on-clickaway doesn't fire on route change)
      this.reset()
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
        this.$emit('updateTextQuery', this.textQuery.replace(lastWord, ''))
        document.getElementById('search').focus()
        this.$store.dispatch('tags/selectItem', key)
        this.$store.dispatch('tags/resetItems')
        // contextually dispatch actions based on the model
        if (this.model === 'dapps') {
          this.$store.dispatch(this.model + '/search/addTagToQuery', item)
          this.$store.dispatch(this.model + '/search/fetchItems')
        } else if (this.model === 'events') {
          this.$store.dispatch(this.model + '/list/addTagToQuery', item)
          this.$store.dispatch(this.model + '/list/fetchItems')
        }
        this.$mixpanel.track(this.$options.filters.capitalize(this.model) + ' - Select tag', { tag: item })
      }
    },
    mixins: [getCaretPosition]
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    &.-suggested-tags {
      position: absolute;
      background: rgba($color--gray,.9);
      padding: 10px;
      box-shadow: 0 17px 70px rgba($color--black,.2);
      width: 250px;
      top: 65px;
      left: 50px;
      overflow: hidden;
      z-index: 10;
      @include tweakpoint('min-width', $tweakpoint--default) {
        top: 115px;
        left: 75px;
        width: 500px;
      }
    }
  }

  .item {
    display: block;
    padding: 7px 28px 7px 10px;
    background: lighten($color--gray,2%);
    box-shadow: 0 0 20px rgba($color--black,.1);
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
