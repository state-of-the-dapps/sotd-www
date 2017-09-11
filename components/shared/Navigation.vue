<template>
  <ul class="list">
    <li class="item"><nuxt-link @click.native="$mixpanel.track(`Nav - What's a DApp`)" to="/whats-a-dapp" class="link">What's a ÐApp</nuxt-link></li>
    <li class="item"><nuxt-link @click.native="$mixpanel.track('Nav - About')" to="/about" class="link">About</nuxt-link></li>
    <li class="item"><a @click="$mixpanel.track('Nav - Twitter')" href="#" class="link -twitter" target="_blank">Twitter</a></li>  
    <li class="item"><a @click="$mixpanel.track('Nav - Github')" href="#" class="link -github" target="_blank">Github</a></li>  
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
    &.-github {
      background: url('/images/social/github.png') center center no-repeat;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-right: 16px;
      }
    }
    &.-twitter {
      background: url('/images/social/twitter.png') center center no-repeat;
      margin-left: 5px;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-left: 10px;
          margin-right: 5px;
      }
    }
    &.-twitter, &.-github {
      text-align: left;
      text-indent: -99999px;
      width: 21px;
      height: 21px;
      padding: 3px;
      background-size: 21px 21px;
    }
    &.-submit {
      @include tweakpoint('min-width', $tweakpoint--default) {
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
