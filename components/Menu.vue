<template>
  <div class="component-Menu">
    <div class="nameplate">
      <nuxt-link class="logo-link" :to="{ name: 'home' }">
        <IconLogo fill="white" :width="45" :height="45" />
      </nuxt-link>
      <span class="tagline">The curated list of decentralized application</span>
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
        <span class="nav-link -newsletter">Stay in the loop</span></li>
    </ul>
  </div>
</template>

<script>
import IconLogo from '~/components/IconLogo'
import IconMail from '~/components/IconMail'

export default {
  components: {
    IconLogo,
    IconMail
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-Menu {
  display: flex;
  align-items: center;
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
    border-left: 2px solid lighten($color--white, 100%);
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
  }
}

.nav-list {
  display: flex;
  align-items: center;
}

.tagline {
  display: none;
}
</style>
