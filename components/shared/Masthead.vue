<template>
  <nav class="section -masthead">
    <div class="container">
      <ul class="nav-list">
        <li 
          :class="siteSection === 'dapps' ? '--is-active' : ''" 
          class="nav-item"><nuxt-link 
            to="/" 
            class="nav-link" 
            @click.native="$mixpanel.track(`Nav - DApps`)">ÐApps</nuxt-link></li>
        <li 
          :class="siteSection === 'events' ? '--is-active' : ''" 
          class="nav-item"><nuxt-link 
            to="/events" 
            class="nav-link" 
            @click.native="$mixpanel.track('Nav - Events')">Events</nuxt-link></li>
        <li 
          v-if="siteSection !== ''" 
          class="nav-item">
          <nuxt-link 
            v-if="siteSection === 'dapps'" 
            :to="{ name: 'dapps-new' }" 
            class="nav-link -submit" 
            @click.native="$mixpanel.track('Nav - New DApp')">Submit a ÐApp</nuxt-link>
          <nuxt-link 
            v-if="siteSection === 'events'" 
            :to="{ name: 'events-new' }" 
            class="nav-link -submit" 
            @click.native="$mixpanel.track('Nav - New event')">Submit an event</nuxt-link>
        </li>
      </ul>
      <ul class="nameplate-list">
        <li class="nameplate-item -logo"><nuxt-link 
          to="/" 
          class="nameplate-link -logo" 
          @click.native="$mixpanel.track('Nav - Home')"><img 
            src="~/assets/images/logo.png" 
            width="172" 
            alt="State of the ÐApps" 
            class="nameplate-image"></nuxt-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    siteSection() {
      return this.$store.getters['siteSection']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.container {
  @include tweakpoint('min-width', $tweakpoint--default) {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-top: 25px;
    padding-bottom: 25px;
    > * {
      width: 50%;
    }
  }
}

.section {
  position: relative;
  z-index: 10;
}

.nameplate-image {
  display: block;
  margin: 40px auto 10px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin: 0 auto;
  }
}

.nameplate-item {
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-right: 10px;
  }
  &.-logo {
    margin-bottom: 5px;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-bottom: 0;
    }
  }
}

.nameplate-list {
  text-align: center;
  margin-top: 20px;
  line-height: 1.4;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-top: 0;
    text-align: left;
    display: flex;
    align-items: center;
    line-height: 1.2;
  }
}

.nav-item {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  font-size: 1.05rem;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-right: 15px;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: $color--black;
    transition: transform 0.5s ease;
    transform: scaleX(0);
  }
  &:last-child {
    margin-left: 6px;
    margin-right: 0;
  }
  &.--is-active {
    &:after {
      transform: scaleX(1);
    }
  }
}

.nav-link {
  display: inline-block;
  padding: 8px 15px;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;
  @include tweakpoint('min-width', $tweakpoint--default) {
    padding: 8px 20px;
  }
  &.-submit {
    width: 150px;
    text-align: center;
    padding: 8px 15px;
    margin-left: 10px;
    color: $color--gray;
    background: $color--black;
    box-shadow: 0 17px 70px rgba($color--black, 0.4);
  }
}

.nav-list {
  text-align: center;
  @include tweakpoint('min-width', $tweakpoint--default) {
    text-align: right;
  }
}
</style>
