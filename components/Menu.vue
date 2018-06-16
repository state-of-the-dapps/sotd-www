<template>
<div class="component-Menu" :class="'-' + color">
  <div class="nameplate">
    <nuxt-link class="logo-link -icon" :to="{ name: 'home' }" @click.native="trackMenu('logo')">
      <SvgIconLogo :fill="color" :width="45" :height="45" />
    </nuxt-link>
    <nuxt-link class="logo-link -wordmark" :to="{ name: 'home' }" @click.native="trackMenu('logo')">
      <SvgLogotype :fill="color" :width="120" :height="26" />
    </nuxt-link>
    <span class="tagline">The curated list of {{ statDappCount.toLocaleString() }} decentralized apps</span>
  </div>
  <ul class="nav-list" role="navigation">
    <li class="nav-item -home">
      <nuxt-link class="nav-link" :class="'-' + color" :to="{ name: 'home' }" @click.native="trackMenu('home')" exact>Home</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :class="'-' + color" :to="{ name: 'rankings' }" @click.native="trackMenu('rankings')">ÐApp Rankings</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :class="'-' + color" :to="{ name: 'collections' }" @click.native="trackMenu('collections')">Curated Collections</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link -search" :class="'-' + color" :to="{ name: 'dapps' }" @click.native="trackMenu('dapps')"><SvgIconMagnifier :theme="color"/></nuxt-link>
    </li>
    <li class="nav-item -submit">
      <nuxt-link @click.native="trackMenu('dapps-new')" :to="{ name: 'dapps-new' }" class="nav-link -submit" :class="$route.name === 'home' ? 'is-home' : ''">Submit a ÐApp</nuxt-link>
    </li>
    <li class="nav-item -newsletter" :class="'-' + color" @click="scrollToMailingList('subscribe')">
      <SvgIconMail class="nav-icon -newsletter" :fill="color" :width="18" :height="18" /> 
      <span class="nav-link -newsletter" :class="'-' + color" >Stay in the loop</span>
    </li>
  </ul>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { trackMenu } from '~/helpers/mixpanel'
import SvgIconLogo from './SvgIconLogo'
import SvgIconMail from './SvgIconMail'
import SvgIconMagnifier from './SvgIconMagnifier'
import SvgLogotype from './SvgLogotype'

export default {
  components: {
    SvgIconLogo,
    SvgIconMail,
    SvgIconMagnifier,
    SvgLogotype
  },
  computed: {
    ...mapGetters([
      'siteSection',
      'statDappCount'
    ])
  },
  methods: {
    scrollToMailingList (targetMenuItem) {
      document.getElementById('component-SecondaryCtaMailingList')
              .scrollIntoView({ behavior: 'smooth' })
      this.trackMenu(targetMenuItem)
    },
    trackMenu (targetMenuItem) {
      const sourcePath = this.$route.path
      const action = trackMenu(sourcePath, targetMenuItem)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  props: {
    color: {
      default: 'black'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-Menu {
  display: flex;
  align-items: center;
  padding: 18px 22px 16px 22px;
  margin: -10px -22px 0px;
  &.-white {
    background: rgba($color--black, .2)
  }
}

.logo-link {
  &.-icon {
    width: 45px;
    height: 45px;
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

.nameplate {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.nav-icon {
  position: relative;
  top: 1px;
}

.nav-item {
  margin-left: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  &.-newsletter, &.-submit {
    display: none;
    @include tweakpoint('min-width', 600px) {
      display: flex;
    }
  }
  &.-home {
    display: none;
    @include tweakpoint('min-width', 600px) {
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
  &.nuxt-link-active, &.nuxt-link-exact-active {
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
    padding: 5px;
    @include tweakpoint('min-width', 840px) {
      padding: 5px 10px;
    }
    &.is-home {
      border-color: rgba($color--white, .7);
    }
  }
}

.nav-list {
  display: flex;
  align-items: center;
}

.tagline {
  display: none;
  font-size: .98rem;
  @include tweakpoint('min-width', 1000px) {
    display: inline-block;
    padding-left: 10px;
  }
}
</style>
