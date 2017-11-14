<template>
  <ul class="list">
    <li class="item"><nuxt-link @click.native="$mixpanel.track(`Nav - What's a DApp`)" to="/whats-a-dapp" class="link">What's a ÐApp</nuxt-link></li>
    <li class="item"><nuxt-link @click.native="$mixpanel.track('Nav - About')" to="/about" class="link">About</nuxt-link></li>
    <li class="item"><a @click="$mixpanel.track('Nav - Newsletter')" href="https://landing.mailerlite.com/webforms/landing/t2o2r1" class="link" target="_blank" rel="noopener noreferrer">Get updates</a></li>
    <li class="item"><nuxt-link @click.native="$mixpanel.track('Nav - New DApp')" to="/submit" class="link -submit">Submit a ÐApp</nuxt-link></li>
  </ul>
</template>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .item {
    display: inline-block;
  }

  .link {
    display: inline-block;
    padding: 8px 6px;
    text-decoration: none;
    transition: opacity .2s ease;
    &.-submit {
      @include tweakpoint('min-width', $tweakpoint--default) {
        margin-left: 7px;
        padding-left: 15px;
        padding-right: 15px;
        color: $color--gallery;
        background: $color--mine-shaft;
        box-shadow: 0 17px 70px rgba($color--mine-shaft,.4);
      }
    }
  }

  .list {
    text-align: center;
    @include tweakpoint('min-width', $tweakpoint--default) {
      text-align: right;
    }
  }
</style>
