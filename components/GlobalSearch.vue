<template>
  <div class="component-global-search"
    :class="[
      isSearching ? 'is-searching' : '',
      results ? 'has-results is-searching' : '',
      search.length ? 'has-input' : '']">
    <span class="nav-link -search" :class="'-' + color"><SvgIconMagnifier :theme="isSearching || results ? 'black' : color"/></span>
    <div class="search-input-wrapper">
      <input
        :class="'-' + color"
        class="search-input"
        placeholder="Discover awesome ÐApps…"
        v-model="search"
        @focus="startSearch"
        @blur="endSearch">
    </div>
    <div class="results" v-if="results">
      <div class="dapps-wrapper" v-if="dapps.length">
        <h3 class="results-title">ÐApps</h3>
        <ul class="results-dapp-list">
          <li class="results-dapp-item" v-for="(dapp, index) in dapps" :key="index">
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
    </div>
  </div>
</template>

<script>
import SvgIconMagnifier from './SvgIconMagnifier'

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
      dapps: [
        {
          iconUrl: 'https://d3colfu6jphe2a.cloudfront.net/dapps/aragon/icon_aragon_7c71aaab4bb816906dd69cad91241b569096adefe0f183ed7cd47a20067fbe6a_opti.png',
          name: 'Aragon',
          slug: 'aragon',
          teaser: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'
        }
      ],
      suggestions: [0]
    }
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
    endSearch () {
      this.searchStatus = false
    },
    startSearch () {
      this.searchStatus = true
    }
  }
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
