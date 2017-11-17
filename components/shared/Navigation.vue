<template>
  <ul class="list">
    <li class="item"><nuxt-link @click.native="$mixpanel.track(`Nav - What's a DApp`)" to="/whats-a-dapp" class="link">What's a ÐApp</nuxt-link></li>
    <li class="item"><nuxt-link @click.native="$mixpanel.track('Nav - About')" to="/about" class="link">About</nuxt-link></li>
    <li class="item"><a @click="$mixpanel.track('Nav - Newsletter')" href="https://landing.mailerlite.com/webforms/landing/t2o2r1" class="link" target="_blank" rel="noopener noreferrer">Get updates</a></li>
    <li class="item"><a @click="$mixpanel.track('Nav - Twitter')" href="https://twitter.com/StateOfTheDApps" class="link -twitter" target="_blank" rel="noopener noreferrer">Twitter</a></li>
    <li class="item"><a @click="$mixpanel.track('Nav - Github')" href="https://github.com/state-of-the-dapps" class="link -github" target="_blank" rel="noopener noreferrer">Github</a></li>
    <li class="item"><a @click="$mixpanel.track('Nav - Reddit')" href="https://reddit.com/r/StateOfTheDApps" class="link -reddit" target="_blank" rel="noopener noreferrer">Reddit</a></li>
    <li class="item"><a @click="$mixpanel.track('Nav - Medium')" href="https://blog.stateofthedapps.com/" class="link -medium" target="_blank" rel="noopener noreferrer">Medium</a></li>
    <li class="item"><a @click="$mixpanel.track('Nav - Slack')" href="https://slack.stateofthedapps.com/" class="link -slack" target="_blank" rel="noopener noreferrer">Slack</a></li>
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
    &.-twitter {
      background: url('/images/social/twitter.png') center center no-repeat;
      margin-left: 5px;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-left: 7px;
          margin-right: 5px;
      }
    }
    &.-github {
      background: url('/images/social/github.png') center center no-repeat;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-right: 5px;
      }
    }
    &.-reddit {
      background: url('/images/social/reddit.png') center center no-repeat;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-right: 5px;
      }
    }
    &.-medium {
      background: url('/images/social/medium.png') center center no-repeat;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-right: 5px;
      }
    }
    &.-slack {
      background: url('/images/social/slack.png') center center no-repeat;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-right: 16px;
      }
    }
    &.-twitter, &.-github, &.-reddit, &.-medium, &.-slack {
      text-align: left;
      text-indent: -99999px;
      width: 21px;
      height: 21px;
      padding: 3px;
      background-size: 21px 21px;
    }
    &.-submit {
      padding-left: 15px;
      padding-right: 15px;
      color: $color--gallery;
      background: $color--mine-shaft;
      box-shadow: 0 17px 70px rgba($color--mine-shaft,.4);
    }
  }

  .list {
    text-align: center;
    @include tweakpoint('min-width', $tweakpoint--default) {
      text-align: right;
    }
  }
</style>
