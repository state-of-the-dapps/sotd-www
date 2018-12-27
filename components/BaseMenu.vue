<template>
  <div 
    :class="'-' + color" 
    class="component-base-menu">
    <div class="nameplate">
      <nuxt-link 
        :to="{ name: 'home' }" 
        class="logo-link -icon" 
        @click.native="trackMenu('logo')">
        <SvgIconLogo 
          :fill="color" 
          :width="35" 
          :height="35" />
      </nuxt-link>
      <nuxt-link 
        :to="{ name: 'home' }" 
        class="logo-link -wordmark" 
        @click.native="trackMenu('logo')">
        <SvgLogotype 
          :fill="color" 
          :width="120" 
          :height="26" />
      </nuxt-link>
    </div>
    <ul 
      class="nav-list" 
      role="navigation">
      <li class="nav-item -home">
        <nuxt-link 
          :class="'-' + color" 
          :to="{ name: 'home' }" 
          class="nav-link" 
          exact 
          @click.native="trackMenu('home')">Home</nuxt-link>
      </li>
      <li class="nav-item -all">
        <nuxt-link 
          :class="'-' + color" 
          :to="{ name: 'dapps' }" 
          class="nav-link" 
          @click.native="trackMenu('dapp-list')">All ÐApps</nuxt-link>
      </li>
      <li class="nav-item -rankings">
        <nuxt-link 
          :class="'-' + color" 
          :to="{ name: 'rankings' }" 
          class="nav-link" 
          @click.native="trackMenu('rankings')">Rankings</nuxt-link>
      </li>
      <media :query="{maxWidth: 699}">
        <li class="nav-item -more">
          <button
            :class="more ? 'active' : ''"
            class="more-button"
            @click="toggleMore">
            <span class="bullet">&bull;</span><span class="bullet">&bull;</span><span class="bullet">&bull;</span>
            <div
              v-on-clickaway="toggleMore"
              v-if="more"
              class="dropdown">
              <ul class="dropdown-list">
                <li class="dropdown-item">
                  <nuxt-link
                    :to="{name: 'stats'}"
                    class="dropdown-link">Stats</nuxt-link>
                </li>
                <li class="dropdown-item">
                  <nuxt-link
                    :to="{name: 'dapps'}"
                    class="dropdown-link">Search</nuxt-link>
                </li>
                <li class="dropdown-item">
                  <nuxt-link
                    :to="{name: 'dapps-new'}"
                    class="dropdown-link">Submit a DApp</nuxt-link>
                </li>
              </ul>
            </div>
          </button>
        </li>
      </media>
      <li class="nav-item -stats">
        <nuxt-link 
          :class="'-' + color" 
          :to="{ name: 'stats' }" 
          class="nav-link" 
          exact 
          @click.native="trackMenu('stats')">Stats</nuxt-link>
      </li>
      <media :query="{maxWidth: 975}">
        <li class="nav-item -search">
          <nuxt-link 
            :class="[hideSearch ? 'hidden' : '', '-' + color]" 
            :to="{ name: 'dapps' }" 
            class="nav-link -search" 
            @click.native="trackMenu('dapps')"><SvgIconMagnifier :theme="color"/></nuxt-link>
        </li>
      </media>
    </ul>
    <media :query="{minWidth: 976}">
      <ul 
        :class="[hideSearch ? 'hidden' : '', search.length ? 'is-searching' : '']" 
        class="nav-list-search">
        <li class="nav-item -search">
          <GlobalSearch
            :color="color"
            :search="search"
            @setSearch="setSearch"
          />
        </li>
      </ul>
    </media>
    <ul class="nav-list-submit-lang">
      <li class="nav-item -submit">
        <nuxt-link 
          :to="{ name: 'dapps-new' }" 
          :class="$route.name === 'home' ? 'is-home' : ''" 
          class="nav-link -submit" 
          @click.native="trackMenu('dapps-new')">Submit a ÐApp</nuxt-link>
      </li>
      <li class="nav-item -lang">
        <BaseDropdown
          :options="languages"
          :selected="'English'"
          :theme="'menu ' + $route.name"
          title="Language"
          @select="setLang"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Media from 'vue-media'
import { directive as onClickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'
import { languages } from '@/helpers/constants'
import { trackMenu } from '@/helpers/mixpanel'
import BaseDropdown from './BaseDropdown'
import GlobalSearch from './GlobalSearch'
import SvgIconLogo from './SvgIconLogo'
import SvgIconMail from './SvgIconMail'
import SvgIconMagnifier from './SvgIconMagnifier'
import SvgLogotype from './SvgLogotype'

export default {
  components: {
    BaseDropdown,
    GlobalSearch,
    Media,
    SvgIconLogo,
    SvgIconMail,
    SvgIconMagnifier,
    SvgLogotype
  },
  directives: {
    onClickaway
  },
  props: {
    color: {
      type: String,
      default: 'black'
    }
  },
  data() {
    return {
      languages,
      more: false,
      search: '',
      sourcePath: this.$route.path
    }
  },
  computed: {
    hideSearch() {
      return !(
        this.$route.name != 'dapps' &&
        this.$route.name != 'dapps-category' &&
        this.$route.name != 'dapps-platform' &&
        this.$route.name != 'dapps-platform-category'
      )
    }
  },
  methods: {
    setLang() {},
    setSearch(value) {
      this.search = value
    },
    toggleMore() {
      this.more = !this.more
    },
    trackMenu(targetMenuItem) {
      const action = trackMenu(this.sourcePath, targetMenuItem)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-base-menu {
  display: flex;
  align-items: center;
  padding: 18px 10px 16px 10px;
  margin: -10px -10px 0px;
  @include tweakpoint('min-width', 640px) {
    padding-left: 22px;
    padding-right: 22px;
    margin-left: -22px;
    margin-right: -22px;
  }
  &.-white {
    background: rgba($color--black, 0.2);
  }
}

.bullet {
  display: inline-block;
  &:nth-child(2) {
    padding: 0 1px;
  }
}

.list-count {
  position: absolute;
  top: -10px;
  right: -8px;
  background: rgba($color--black, 0.2);
  display: inline-block;
  font-weight: 600;
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 0.7rem;
}

.logo-link {
  &.-icon {
    width: 35px;
    height: 35px;
    @include tweakpoint('min-width', 834px) {
      display: none;
    }
  }
  &.-wordmark {
    display: none;
    @include tweakpoint('min-width', 834px) {
      display: block;
      height: 26px;
    }
  }
}

.hidden {
  visibility: hidden;
}

.more-button {
  padding: 2px 7px;
  border-radius: 4px;
  background: transparent;
  position: relative;
  &:hover {
    background: rgba($color--black, 0.1);
  }
  &.active {
    background: $color--white;
    box-shadow: 0 4px 10px rgba($color--black, 0.1);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.dropdown {
  position: absolute;
  top: 100%;
  width: 125px;
  z-index: 100;
  left: 0;
  border-radius: 4px;
  border-top-left-radius: 0;
  box-shadow: 0 4px 10px rgba($color--black, 0.1);
  background: $color--white;
  text-align: left;
}

.dropdown-list {
  padding: 8px 0;
}

.dropdown-link {
  display: block;
  padding: 1px 7px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.nameplate {
  display: flex;
  align-items: center;
}

.nav-icon {
  position: relative;
  top: 1px;
}

.nav-item {
  margin-left: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  @include tweakpoint('min-width', 700px) {
    margin-left: 20px;
  }
  &.-lang {
    margin-left: 12px;
  }
  &.-newsletter,
  &.-submit,
  &.-my-list,
  &.-home,
  &.-stats {
    display: none;
    @include tweakpoint('min-width', 700px) {
      display: flex;
    }
  }
  &.-submit {
    margin-left: auto;
  }
  &.-search {
    display: none;
    @include tweakpoint('min-width', 700px) {
      display: block;
    }
  }
}

.nav-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-left: 0;
  border-right: 0;
  position: relative;
  &.nuxt-link-active,
  &.nuxt-link-exact-active {
    &.-white {
      border-bottom: 1px solid $color--white;
    }
    &.-black {
      border-bottom: 1px solid $color--black;
    }
    &.-search {
      border-color: transparent;
    }
  }
  &.-newsletter {
    display: none;
    @include tweakpoint('min-width', 1050px) {
      display: inline-block;
      padding-left: 10px;
    }
  }
  &.-submit {
    border: 1px solid $color--black;
    color: $color--white;
    background: $color--black;
    padding: 7px 15px;
    border-radius: 4px;
    &.is-home {
      background: transparent;
      border-color: rgba($color--white, 0.8);
    }
  }
}

.nav-list {
  display: flex;
  align-items: center;
}

.nav-list-submit-lang {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.tagline {
  display: none;
  @include tweakpoint('min-width', 1100px) {
    display: inline-block;
    padding-left: 10px;
  }
}
</style>
