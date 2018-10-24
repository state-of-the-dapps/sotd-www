<template>
  <div 
    v-on-clickaway="resetSearch"
    @click="focusInput"
    class="component-global-search"
    :class="[
      isSearching ? 'is-searching' : '',
      results ? 'has-results is-searching' : '',
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
    <div class="results" v-if="results">
      <div class="dapps-wrapper" v-if="dapps.length">
        <h3 class="results-title">ÐApps</h3>
        <ul class="results-dapp-list">
          <li class="results-dapp-item" v-for="(dapp, index) in dapps.slice(0, 5)" :key="index">
            <nuxt-link
              :to="{ name: 'dapp-detail', params: { slug: dapp.slug } }"
              class="results-dapp-link">
              <img class="results-dapp-image" width="42" height="42" :src="dapp.iconUrl"/>
              <div class="results-dapp-info">
                <h4 class="results-dapp-title">{{ dapp.name }}</h4>
                <p class="results-dapp-tagline">{{ dapp.teaser }}</p>
              </div>
            </nuxt-link>
          </li>
        </ul>
        <div class="results-link-wrapper">
          <nuxt-link :to="{name: 'dapps'}" class="results-link">View all ÐApp results</nuxt-link>
        </div>
      </div>
      <div class="suggestions-wrapper" v-if="suggestions.length && !dapps.length">
        <ul class="results-suggestions-list">
          <li
            class="results-suggestions-item"
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="resetSearch">
            <nuxt-link
              :to="{ path: `/dapps/tagged/${suggestion}` }"
              class="results-suggestions-link">
              {{ suggestion }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/helpers/axios'
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
      searchStatus: false,
      dapps: [],
      suggestions: []
    }
  },
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    results () {
      if (this.dapps.length || this.suggestions.length) {
        return true
      } else {
        return false
      }
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
      if (this.searchStatus || this.search.length) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    fetchResults () {
      clearTimeout(searchTimer)
      clearTimeout(trackTimer)
      var caret = this.getCaretPosition(this.search)
      var result = /\S+$/.exec(this.search.slice(0, caret.end))
      var lastWord = result ? result[0] : null
      searchTimer = setTimeout(() => {
        axios
          .get('tags', {
            params: {
              text: this.search,
              excluded: [],
              type: 'dapps'
            }
          })
          .then(response => {
            const data = response.data
            const items = data.items
            this.suggestions = items
          })
        console.log(lastWord)
        if (this.search.length > 1) {}
      }, 200)
      trackTimer = setTimeout(() => {
        this.$mixpanel.track('Global - Search', { query: this.search })
      }, 3000)
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
    input {
      color: $color--black;
    }
  }
  &.has-input {
    @include tweakpoint('min-width', 1000px) {
      min-width: 450px;
    }
  }
  &.has-results {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
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
  font-weight: 600;
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
