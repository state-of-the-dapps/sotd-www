<template>
<div class="component-Menu">
  <div class="nameplate">
    <nuxt-link class="logo-link -icon" :to="{ name: 'home' }" @click.native="trackMenu('logo')">
      <SvgIconLogo :fill="color" :width="45" :height="45" />
    </nuxt-link>
    <nuxt-link class="logo-link -wordmark" :to="{ name: 'home' }" @click.native="trackMenu('logo')">
      <SvgLogotype :fill="color" :width="120" :height="26" />
    </nuxt-link>
    <span class="tagline">The curated list of decentralized apps</span>
  </div>
  <ul class="nav-list" role="navigation">
    <li class="nav-item">
      <nuxt-link class="nav-link" :class="'-' + color" :to="{ name: 'home' }" @click.native="trackMenu('home')" exact>Home</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :class="'-' + color" :to="{ name: 'dapps' }" @click.native="trackMenu('dapps')">ÐApps</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :class="'-' + color" :to="{ name: 'events' }" @click.native="trackMenu('events')">Events</nuxt-link>
    </li>
    <li class="nav-item -newsletter" :class="'-' + color" @click="scrollToMailingList('subscribe')">
      <SvgIconMail class="nav-icon -newsletter" :fill="color" :width="18" :height="18" /> 
      <span class="nav-link -newsletter" :class="'-' + color" >Stay in the loop</span>
    </li>
  </ul>
</div>
</template>

<script>
import { trackMenu } from '~/helpers/mixpanel'
import SvgIconLogo from './SvgIconLogo'
import SvgIconMail from './SvgIconMail'
import SvgLogotype from './SvgLogotype'

export default {
  components: {
    SvgIconLogo,
    SvgIconMail,
    SvgLogotype
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
  padding: 10px 0;
}

.logo-link {
  &.-icon {
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
  cursor: pointer;
  &.-newsletter {
    padding: 4px 10px 4px 20px;
    &.-white {
      border-left: 1px solid rgba($color--white, .4);
    }
    &.-black {
      border-left: 1px solid rgba($color--black, .2);
    }
    @include tweakpoint('min-width', 575px) {
      padding: 14px 10px 14px 20px;
    }
    @include tweakpoint('min-width', 834px) {
      padding-right: 0;
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
  &.nuxt-link-active {
    &.-white {
      border-bottom: 1px solid $color--white;
    }
    &.-black {
      border-bottom: 1px solid $color--black;
    }
  }
  &.-newsletter {
    display: none;
    @include tweakpoint('min-width', 575px) {
      display: inline-block;
      padding-left: 10px;
    }
  }
}

.nav-list {
  display: flex;
  align-items: center;
}

.tagline {
  display: none;
  @include tweakpoint('min-width', 834px) {
    display: inline-block;
    padding-left: 10px;
  }
}
</style>
