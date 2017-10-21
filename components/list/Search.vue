<template>
  <div class="wrapper">
    <a @click.prevent="$mixpanel.track('DApps - Search icon')" class="icon" href="#"><img src="/images/search.png" width="20"></a>
    <ul class="input-wrapper">
      <li v-for="(tag, key) in tags" class="tag">#{{ tag }} <span @click="removeTag(tag, key)" class="remove"><img src="/images/close/small.png" width="9" alt="Close" class="close"></span></li>
      <li class="input-text"><input class="input" v-model="textQuery" @input="search" @keyup.enter="enter" @click="findSuggestedTags" id="search" placeholder="Search by ÐApp name or tag" autocomplete="off" @keydown.delete="removeLastTag"></li>
    </ul>
  </div>
</template>

<script>
  import { getCaretPosition } from '~/plugins/mixins'
  var searchTimer
  var trackTimer

  export default {
    computed: {
      tags: {
        get () {
          return this.$store.getters['dapps/tagsQuery']
        }
      },
      textQuery: {
        get () {
          return this.$store.getters['dapps/textQuery']
        },
        set (value) {
          this.$store.dispatch('dapps/updateTextQuery', value)
        }
      }
    },
    methods: {
      enter () {
        document.getElementById('search').blur()
      },
      findSuggestedTags () {
        if (this.textQuery.length === 0 && this.tags.length === 0) {
          this.$store.dispatch('tags/findItems', '')
        }
      },
      removeLastTag () {
        if (this.textQuery.length < 1 && this.tags.length > 0) {
          this.$mixpanel.track('DApps - Remove tag', { method: 'delete' })
          this.$store.dispatch('dapps/removeLastTag')
          this.$store.dispatch('dapps/findItems')
          this.findSuggestedTags()
        }
      },
      removeTag (tag, key) {
        document.getElementById('search').focus()
        this.$mixpanel.track('DApps - Remove tag', { method: 'click' })
        this.$store.dispatch('dapps/removeTagsQuery', key)
        this.$store.dispatch('tags/reset')
        this.$store.dispatch('dapps/findItems')
        this.findSuggestedTags()
      },
      search (event) {
        clearTimeout(searchTimer)
        clearTimeout(trackTimer)
        var caret = this.getCaretPosition(this.textQuery)
        var result = /\S+$/.exec(this.textQuery.slice(0, caret.end))
        var lastWord = result ? result[0] : null
        searchTimer = setTimeout(() => {
          if (this.tags.length < 3 && this.textQuery.length > 1) {
            this.$store.dispatch('tags/findItems', lastWord)
          }
          if (this.textQuery.length === 0) {
            this.findSuggestedTags()
          }
          this.$store.dispatch('dapps/findItems')
        }, 200)
        trackTimer = setTimeout(() => {
          this.$mixpanel.track('DApps - Search', { query: this.textQuery })
        }, 10000)
      }
    },
    mixins: [getCaretPosition]
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .close {
    position: relative;
    top: 1px;
    margin-left: 8px;
    &:hover {
      cursor: pointer;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 40px;
    background: $color--mine-shaft;
    &:hover {
      cursor: default;
    }
    @include tweakpoint('min-width', $tweakpoint--default) {
      width: 55px;
      height: 60px;
    }
  }

  .input {
    height: 100%;
    padding: 0px;
    font-size: 1.1rem;
    background: none;
    border: none;
    width: 100%;
  }

  .input-text {
    display: flex;
    flex-grow: 1;
    height: 100%;
    padding: 0px;
    font-size: 1.1rem;
    background: none;
    border: none;
    width: 100%;
    .tag + & {
      padding-left: 5px;
    }
  }

  .input-wrapper {
    display: flex;
    flex-grow: 1;
    height: 100%;
    padding: 10px;
    font-size: 1.1rem;
    background: none;
    border: none;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  .tag {
    display: flex;
    align-items: center;
    padding: 7px 10px;
    background: darken($color--gallery,6%);
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    text-decoration: none;
    position: relative;
    margin: 2px;
    margin-right: 5px;
    line-height: .75;
    white-space: nowrap;
    @include tweakpoint('min-width', $tweakpoint--default) {
      line-height: 1.52;
    }
  }

  .wrapper {
    position: relative;
    z-index: 5;
    box-shadow: 0 17px 70px 0 rgba($color--mine-shaft,.22);
    background: lighten($color--gallery,2%);
    height: 50px;
    display: flex;
    align-items: center;
    @include tweakpoint('min-width', $tweakpoint--default) {
      height: 60px;
    }
  }
</style>
