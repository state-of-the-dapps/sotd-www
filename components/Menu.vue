<template>
<div class="component-Menu">
  <div class="nameplate">
    <nuxt-link class="logo-link -icon" :to="{ name: 'home' }" @click.native="trackMenu('logo')">
      <SvgIconLogo fill="white" :width="45" :height="45" />
    </nuxt-link>
    <nuxt-link class="logo-link -wordmark" :to="{ name: 'home' }" @click.native="trackMenu('logo')">
      <SvgLogotype fill="white" :width="120" :height="26" />
    </nuxt-link>
    <span class="tagline">The curated list of decentralized apps</span>
  </div>
  <ul class="nav-list" role="navigation">
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="{ name: 'home' }" @click.native="trackMenu('home')">Home</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="{ name: 'dapps' }" @click.native="trackMenu('dapps')">ÐApps</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="{ name: 'events' }" @click.native="trackMenu('events')">Events</nuxt-link>
    </li>
    <li class="nav-item -newsletter" @click="scrollToMailingList('subscribe')">
      <SvgIconMail class="nav-icon -newsletter" fill="white" :width="18" :height="18" /> 
      <span class="nav-link -newsletter">Stay in the loop</span>
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
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-Menu {
  display: flex;
  align-items: center;
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
    border-left: 1px solid rgba($color--white, .6);
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
  &.nuxt-link-active {
    border-bottom: 1px solid $color--white;
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
