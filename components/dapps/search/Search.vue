<template>
  <section class="section -search">
    <div class="wrapper-outer">
      <div class="wrapper">
        <a 
          class="search-icon" 
          href="#" 
          @click.prevent="$mixpanel.track('DApps - Search icon')"><img 
            class="search-image" 
            src="~/assets/images/icons/search.png" 
            width="20"></a>
        <ul class="input-wrapper">
          <li 
            v-for="(tag, key) in tags" 
            :key="key" 
            class="tag">#{{ tag }} <span 
              class="remove" 
              @click="removeTag(tag, key)"><img 
                src="~/assets/images/close/small.png" 
                width="9" 
                alt="Close" 
                class="close"></span></li>
          <li class="input-text"><input 
            id="search" 
            v-model="textQuery" 
            class="input" 
            placeholder="Search by ÐApp name or tag" 
            autocomplete="off" 
            @input="search" 
            @keyup.enter="blurSearch" 
            @click="fetchSuggestedTagsWithNoQuery" 
            @keydown.delete="removeLastTag"></li>
        </ul>
      </div>
      <SuggestedTags
        :items="suggestedTags"
        :model="'dapps'"
        :text-query="textQuery"
        @updateTextQuery="updateTextQuery"
      />
    </div>
  </section>
</template>

<script>
import { dappRefineTabOptions } from '~/helpers/constants'
import { getCaretPosition } from '~/helpers/mixins'
import SuggestedTags from '~/components/shared/SuggestedTags.vue'

var searchTimer
var trackTimer

export default {
  components: {
    SuggestedTags
  },
  mixins: [getCaretPosition],
  computed: {
    suggestedTags() {
      return this.$store.getters['tags/items']
    },
    tags() {
      return this.$store.getters['dapps/search/tagQuery']
    },
    textQuery: {
      get() {
        return this.$store.getters['dapps/search/textQuery']
      },
      set(value) {
        this.$store.dispatch('dapps/search/setTextQuery', value)
      }
    }
  },
  methods: {
    blurSearch() {
      document.getElementById('search').blur()
    },
    fetchSuggestedTagsWithNoQuery() {
      if (this.textQuery.length === 0 && this.tags.length === 0) {
        let tagsQuery = {
          value: '',
          model: 'dapps'
        }
        this.$store.dispatch('tags/fetchItems', tagsQuery)
      }
    },
    removeLastTag() {
      if (this.textQuery.length < 1 && this.tags.length > 0) {
        this.$mixpanel.track('DApps - Remove tag', { method: 'delete' })
        this.$store.dispatch('dapps/search/removeLastTagFromQuery')
        this.$store.dispatch('dapps/search/fetchItems')
        this.fetchSuggestedTagsWithNoQuery()
      }
    },
    removeTag(tag, key) {
      document.getElementById('search').focus()
      this.$mixpanel.track('DApps - Remove tag', { method: 'click' })
      this.$store.dispatch('dapps/search/removeTagFromQuery', key)
      this.$store.dispatch('tags/resetItems')
      this.$store.dispatch('dapps/search/fetchItems')
      this.fetchSuggestedTagsWithNoQuery()
    },
    search(event) {
      clearTimeout(searchTimer)
      clearTimeout(trackTimer)
      var caret = this.getCaretPosition(this.textQuery)
      var result = /\S+$/.exec(this.textQuery.slice(0, caret.end))
      var lastWord = result ? result[0] : null
      searchTimer = setTimeout(() => {
        if (this.tags.length < 3 && this.textQuery.length > 1) {
          this.$store.dispatch('dapps/search/setTabQuery', 'most-relevant')
          let tagsQuery = {
            value: lastWord,
            model: 'dapps'
          }
          this.$store.dispatch('tags/fetchItems', tagsQuery)
        }
        if (this.textQuery.length === 0) {
          this.$store.dispatch(
            'dapps/search/setTabQuery',
            dappRefineTabOptions[0]
          )
          this.fetchSuggestedTagsWithNoQuery()
        }
        this.$store.dispatch('dapps/search/fetchItems')
      }, 200)
      trackTimer = setTimeout(() => {
        this.$mixpanel.track('DApps - Search', { query: this.textQuery })
      }, 10000)
    },
    updateTextQuery(value) {
      this.textQuery = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.sub-heading {
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 1rem;
  margin-bottom: 0;
}

.heading {
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
  margin-top: 0;
  margin-bottom: 1.3rem;
}

.close {
  position: relative;
  top: 1px;
  margin-left: 8px;
  &:hover {
    cursor: pointer;
  }
}

.wrapper-outer {
  @include margin-wrapper-main;
  position: relative;
  @include tweakpoint('min-width', $tweakpoint--default) {
    padding-top: 25px;
    padding-bottom: 10px;
  }
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 40px;
  background: $color--black;
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

.tag {
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 7px 10px;
  background: darken($color--gray, 6%);
  box-shadow: 0 0 20px rgba($color--black, 0.1);
  text-decoration: none;
  position: relative;
  margin: 2px;
  margin-right: 5px;
  line-height: 0.75;
  white-space: nowrap;
  @include tweakpoint('min-width', $tweakpoint--default) {
    line-height: 1.52;
  }
}

.wrapper {
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  z-index: 5;
  box-shadow: 0 17px 70px 0 rgba($color--black, 0.22);
  background: lighten($color--gray, 2%);
  height: 50px;
  display: flex;
  align-items: center;
  @include tweakpoint('min-width', $tweakpoint--default) {
    height: 60px;
  }
}
</style>
