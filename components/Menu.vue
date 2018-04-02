<template>
  <div class="component-Menu">
    <div class="nameplate">
      <nuxt-link class="logo-link -icon" :to="{ name: 'home' }">
        <IconLogo fill="white" :width="45" :height="45" />
      </nuxt-link>
      <nuxt-link class="logo-link -wordmark" :to="{ name: 'home' }">
        <Logotype fill="white" :width="120" :height="26" />
      </nuxt-link>
      <span class="tagline">The curated list of decentralized applications</span>
    </div>
    <ul class="nav-list" role="navigation">
      <li class="nav-item">
        <nuxt-link class="nav-link" :to="{ name: 'home' }">Home</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" :to="{ name: 'dapps' }">ÐApps</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link class="nav-link" :to="{ name: 'events' }">Events</nuxt-link>
      </li>
      <li class="nav-item -newsletter">
        <IconMail class="nav-icon -newsletter" fill="white" :width="18" :height="18" /> 
        <span class="nav-link -newsletter">Stay in the loop</span>
      </li>
    </ul>
  </div>
</template>

<script>
import IconLogo from '~/components/IconLogo'
import IconMail from '~/components/IconMail'
import Logotype from '~/components/Logotype'

export default {
  components: {
    IconLogo,
    IconMail,
    Logotype
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
  &.-newsletter {
    padding: 4px 10px 4px 20px;
    border-left: 1px solid rgba($color--white, .6);
    @include tweakpoint('min-width', 640px) {
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
    @include tweakpoint('min-width', 640px) {
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
