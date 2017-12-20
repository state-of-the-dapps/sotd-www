<template>
  <section class="section -search">
    <div class="container">
      <div class="wrapper">
        <a @click.prevent="$mixpanel.track('Events - Search icon')" class="search-icon" href="#"><img class="search-image" src="~/assets/images/icons/search.png" width="20"></a>
        <ul class="input-wrapper">
          <li v-for="(tag, key) in tags" :key="key" class="tag">#{{ tag }} <span @click="removeTag(tag, key)" class="remove"><img src="~/assets/images/close/small.png" width="9" alt="Close" class="close"></span></li>
          <li class="input-text"><input class="input" v-model="textQuery" @input="search" @keyup.enter="blurSearch" @click="fetchSuggestedTagsWithNoQuery" id="search" placeholder="Search by event name or tag" autocomplete="off" @keydown.delete="removeLastTag"></li>
        </ul>
        <div class="location-filter">
          <img class="location-pin" src="~/assets/images/icons/pin.png" width="18">
          <span class="location-text">
            within <span class="location-selection">50 miles</span> of <span class="location-selection">Princeton NJ, USA</span></span></div>
          </span>
      </div>
      <SuggestedTags
        :items="suggestedTags"
        :model="'events'"
        :textQuery="textQuery"
        @updateTextQuery="updateTextQuery"
      />
      <LocationSelection/>
    </div>
  </section>
</template>

<script>
  import { eventRefineTabOptions } from '~/helpers/constants'
  import { getCaretPosition } from '~/helpers/mixins'
  import LocationSelection from '~/components/events/list/LocationSelection.vue'
  import SuggestedTags from '~/components/shared/SuggestedTags.vue'

  var searchTimer
  var trackTimer

  export default {
    components: {
      LocationSelection,
      SuggestedTags
    },
    computed: {
      suggestedTags () {
        return this.$store.getters['tags/items']
      },
      tags () {
        return this.$store.getters['events/list/tagQuery']
      },
      textQuery: {
        get () {
          return this.$store.getters['events/list/textQuery']
        },
        set (value) {
          this.$store.dispatch('events/list/setTextQuery', value)
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
          this.$mixpanel.track('Events - Remove tag', { method: 'delete' })
          this.$store.dispatch('events/list/removeLastTagFromQuery')
          this.$store.dispatch('events/list/fetchItems')
          this.fetchSuggestedTagsWithNoQuery()
        }
      },
      removeTag (tag, key) {
        document.getElementById('search').focus()
        this.$mixpanel.track('Events - Remove tag', { method: 'click' })
        this.$store.dispatch('events/list/removeTagFromQuery', key)
        this.$store.dispatch('tags/resetItems')
        this.$store.dispatch('events/list/fetchItems')
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
            this.$store.dispatch('events/list/setTabQuery', 'most-relevant')
            this.$store.dispatch('tags/fetchItems', lastWord)
          }
          if (this.textQuery.length === 0) {
            this.$store.dispatch('events/list/setTabQuery', eventRefineTabOptions[0])
            this.fetchSuggestedTagsWithNoQuery()
          }
          this.$store.dispatch('events/list/fetchItems')
        }, 200)
        trackTimer = setTimeout(() => {
          this.$mixpanel.track('Events - Search', { query: this.textQuery })
        }, 10000)
      },
      updateTextQuery (value) {
        this.textQuery = value
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

  .search-icon {
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

  .search-image {
    margin: 0 10px;
  }

  .input {
    height: 100%;
    padding: 0px;
    font-size: 1.1rem;
    background: none;
    border: none;
    width: 100%;
    padding-right: 5px;
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
    align-items: center;
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

  .location-filter {
    line-height: 0;
    font-size: 1.1rem;
    padding-right: 15px;
    display: flex;
    align-items: center;
  }

  .location-pin {
    margin-right: 0;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-right: 7px;;
    }
  }

  .location-selection {
    cursor: pointer;
    position: relative;
    display: inline-block;
    margin: 0 1px;
    text-decoration: underline;
    font-weight: 600;
  }

  .location-text {
    display: none;
    @include tweakpoint('min-width', $tweakpoint--default) {
      display: inline;
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
