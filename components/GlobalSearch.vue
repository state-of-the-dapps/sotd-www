<template>
  <div 
    v-on-clickaway="resetSearch"
    @click="focusInput"
    class="component-global-search"
    :class="[
      isSearching ? 'is-searching' : '',
      search.length ? 'has-input' : '']">
    <span class="nav-link -search" :class="'-' + color"><SvgIconMagnifier :theme="isSearching || results ? 'black' : color"/></span>
    <div class="search-input-wrapper">
      <input
        ref="searchInput"
        :class="'-' + color"
        class="search-input"
        placeholder="Discover awesome ÐApps…"
        v-model="search"
        @input="fetchResults"
        @focus="startSearch"
        @blur="endSearch">
    </div>
    <div class="results" v-if="results || isSearching">
      <div v-if="!results && searchCompleted" class="results-none">Sorry, no results. Please try a new search</div>
      <div class="suggestions-wrapper" v-if="suggestions.length">
        <h3 class="results-title">Suggested tags</h3>
        <ul class="results-suggestions-list">
          <li
            class="results-suggestions-item"
            v-for="(suggestion, index) in suggestions.slice(0, 7)"
            :key="index">
            <nuxt-link
              :to="{ path: `/dapps/tagged/${suggestion}`, query: {q: 'suggestion'} }"
              class="results-suggestions-link"
              @click.native="suggestionView(suggestion)">
              {{ suggestion }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <br v-if="suggestions.length && dapps.length"/>
      <div class="dapps-wrapper" v-if="dapps.length">
        <h3 class="results-title">ÐApps</h3>
        <ul class="results-dapp-list">
          <li class="results-dapp-item" v-for="(dapp, index) in dapps.slice(0, 5)" :key="index">
            <nuxt-link
              :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }"
              class="results-dapp-link"
              @click.native="dappView(dapp.slug)">
              <img v-if="dapp.iconUrl" class="results-dapp-image" width="42" height="42" :src="dapp.iconUrl"/>
              <span v-else class="results-dapp-icon-placeholder">{{ dapp.name | firstLetter }}</span>
              <div class="results-dapp-info">
                <h4 class="results-dapp-title">{{ dapp.name }}</h4>
                <p class="results-dapp-tagline">{{ dapp.teaser }}</p>
              </div>
            </nuxt-link>
          </li>
        </ul>
        <div class="results-link-wrapper">
          <nuxt-link @click.native="setSearchPage(search)" :to="{name: 'dapps', query: {q: search} }" class="results-link">View all ÐApp results</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/helpers/axios'
import { trackDappView, trackSearchSuggestion } from '~/helpers/mixpanel'
import { directive as onClickaway } from 'vue-clickaway'
import { getCaretPosition } from '~/helpers/mixins'
import SvgIconMagnifier from './SvgIconMagnifier'

var searchTimer
var trackTimer

export default {
  props: {
    color: {
      type: String
    }
  },
  components: {
    SvgIconMagnifier
  },
  data () {
    return {
      dapps: [],
      searchCompleted: false,
      searchStatus: false,
      sourcePath: this.$route.path,
      suggestions: []
    }
  },
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    results () {
      return Boolean(this.dapps.length || this.suggestions.length)
    },
    search: {
      get () {
        return this.$store.getters['search']
      },
      set (value) {
        this.$store.dispatch('setSearch', value)
      }
    },
    isSearching () {
      return Boolean(this.searchStatus || this.search.length)
    }
  },
  methods: {
    dappView (targetDapp) {
      this.resetSearch()
      const sourceCollection = ''
      const sourceComponent = 'GlobalSearch'
      const action = trackDappView(sourceCollection, sourceComponent, this.sourcePath, targetDapp)
      this.$mixpanel.track(action.name, action.data)
    },
    suggestionView (suggestion) {
      this.setSearchPage('')
      const action = trackSearchSuggestion(this.sourcePath, suggestion)
      this.$mixpanel.track(action.name, action.data)
    },
    fetchResults () {
      clearTimeout(searchTimer)
      clearTimeout(trackTimer)
      this.searchCompleted = false
      var caret = this.getCaretPosition(this.search)
      var result = /\S+$/.exec(this.search.slice(0, caret.end))
      var lastWord = result ? result[0] : null
      searchTimer = setTimeout(() => {
        axios
          .get('tags', {
            params: {
              text: lastWord,
              excluded: [],
              type: 'dapps'
            }
          })
          .then(response => {
            const data = response.data
            const items = data.items
            this.suggestions = items
            this.searchCompleted = true
          })
        if (this.search.length > 1) {
          axios
            .get('dapps', {
              params: {
                limit: 5,
                offset: 0,
                tags: [],
                text: this.search
              }
            })
            .then(response => {
              const data = response.data
              const items = data.items
              this.dapps = items
              this.searchCompleted = true
            })
        } else {
          this.dapps = []
        }
      }, 200)
      trackTimer = setTimeout(() => {
        if (this.search.length) {
          this.$mixpanel.track('Global - Search', { query: this.search })
        }
      }, 1000)
    },
    focusInput () {
      this.$refs.searchInput.focus()
    },
    endSearch () {
      this.searchStatus = false
    },
    resetSearch () {
      this.$store.dispatch('setSearch', '')
      this.searchStatus = false
      this.suggestions = []
      this.dapps = []
    },
    setSearchPage (query) {
      this.$store.dispatch('dapps/search/resetQuery')
      this.$store.dispatch('dapps/search/setTextQuery', query)
      this.$store.dispatch('dapps/search/fetchItems')
      this.resetSearch()
    },
    startSearch () {
      this.searchStatus = true
      this.fetchResults()
    }
  },
  mixins: [getCaretPosition]
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-global-search {
  display: flex;
  align-items: center;
  background: rgba($color--black, .1);
  padding: 8px 12px;
  border-radius: 4px;
  min-width: 250px;
  transition: all 0.2s ease;
  position: relative;
  color: $color--black;
  &.is-searching {
    background: $color--white;
    box-shadow: 0 0 10px rgba($color--black, 0.1);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    input {
      color: $color--black;
    }
  }
  &.has-input {
    @include tweakpoint('min-width', 975px) {
      min-width: 425px;
    }
  }
}

.nav-link {
  position: relative;
  z-index: 15;
  &.-search {
    width: 17px;
    height: 17px;
  }
}

.results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: $color--white;
  z-index: 50;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 5px 10px rgba($color--black, 0.1);
  color: $color--black;
  padding: 12px;
  text-align: left;
}

.results-dapp-icon-placeholder {
  display: block;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 4px;
  text-decoration: none;
  text-transform: uppercase;
  background: $color--gray;
}

.results-dapp-link {
  display: block;
  padding: 10px 0;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.results-dapp-image {
  display: block;
  border-radius: 4px;
}

.results-dapp-title {
  margin: 0;
}

.results-dapp-tagline {
  margin: 0;
}

.results-dapp-info {
  padding-left: 10px;
}

.results-link {
  font-size: 0.9rem;
  font-weight: 600;
}

.results-link-wrapper {
  padding-top: 10px;
  text-align: right;
}

.results-none {
  text-align: center;
}

.results-title {
  margin: 0 0 .5rem 0;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.25px;
  font-weight: 700;
}

.results-suggestions-link {
  display: block;
  padding: 7px 0;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.search-input-wrapper {
  position: relative;
  z-index: 15;
  flex-grow: 1;
  padding-left: 8px;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  color: $color--black;
  &::placeholder {
    color: $color--black;
  }
  &.-white {
    color: $color--white;
    &::placeholder {
      color: $color--white;
      .is-searching & {
        color: $color--black;
      }
    }
  }
}
</style>
