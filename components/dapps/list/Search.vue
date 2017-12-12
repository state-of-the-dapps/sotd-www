<template>
  <section class="section -search">
    <div class="container">
      <div class="wrapper">
        <a @click.prevent="$mixpanel.track('DApps - Search icon')" class="icon" href="#"><img src="~/assets/images/search.png" width="20"></a>
        <ul class="input-wrapper">
          <li v-for="(tag, key) in tags" class="tag">#{{ tag }} <span @click="removeTag(tag, key)" class="remove"><img src="~/assets/images/close/small.png" width="9" alt="Close" class="close"></span></li>
          <li class="input-text"><input class="input" v-model="textQuery" @input="search" @keyup.enter="blurSearch" @click="fetchSuggestedTagsWithNoQuery" id="search" placeholder="Search by ÐApp name or tag" autocomplete="off" @keydown.delete="removeLastTag"></li>
        </ul>
      </div>
      <SuggestedTags/>
    </div>
  </section>
</template>

<script>
  import { dappsTabOptions } from '~/helpers/constants'
  import { getCaretPosition } from '~/helpers/mixins'
  import SuggestedTags from '~/components/dapps/list/search/SuggestedTags.vue'

  var searchTimer
  var trackTimer

  export default {
    components: {
      SuggestedTags
    },
    computed: {
      tags () {
        return this.$store.getters['dapps/list/tagsQuery']
      },
      textQuery: {
        get () {
          return this.$store.getters['dapps/list/textQuery']
        },
        set (value) {
          this.$store.dispatch('dapps/list/setTextQuery', value)
        }
      }
    },
    methods: {
      blurSearch () {
        document.getElementById('search').blur()
      },
      fetchSuggestedTagsWithNoQuery () {
        if (this.textQuery.length === 0 && this.tags.length === 0) {
          this.$store.dispatch('tags/fetchItems', '')
        }
      },
      removeLastTag () {
        if (this.textQuery.length < 1 && this.tags.length > 0) {
          this.$mixpanel.track('DApps - Remove tag', { method: 'delete' })
          this.$store.dispatch('dapps/list/removeLastTagFromQuery')
          this.$store.dispatch('dapps/list/fetchItems')
          this.fetchSuggestedTagsWithNoQuery()
        }
      },
      removeTag (tag, key) {
        document.getElementById('search').focus()
        this.$mixpanel.track('DApps - Remove tag', { method: 'click' })
        this.$store.dispatch('dapps/list/removeTagFromQuery', key)
        this.$store.dispatch('tags/resetItems')
        this.$store.dispatch('dapps/list/fetchItems')
        this.fetchSuggestedTagsWithNoQuery()
      },
      search (event) {
        clearTimeout(searchTimer)
        clearTimeout(trackTimer)
        var caret = this.getCaretPosition(this.textQuery)
        var result = /\S+$/.exec(this.textQuery.slice(0, caret.end))
        var lastWord = result ? result[0] : null
        searchTimer = setTimeout(() => {
          if (this.tags.length < 3 && this.textQuery.length > 1) {
            this.$store.dispatch('dapps/list/setTabQuery', 'most-relevant')
            this.$store.dispatch('tags/fetchItems', lastWord)
          }
          if (this.textQuery.length === 0) {
            this.$store.dispatch('dapps/list/setTabQuery', dappsTabOptions[0])
            this.fetchSuggestedTagsWithNoQuery()
          }
          this.$store.dispatch('dapps/list/fetchItems')
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

  .container {
    position: relative;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding-top: 25px;
      padding-bottom: 50px;
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

  .section {
    background: rgba(255,255,255,.35);
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
