<template>
  <nav class="section -masthead">
    <div class="container">
      <ul class="nav-list">
        <li class="nav-item"><nuxt-link @click.native="$mixpanel.track(`Nav - What's a DApp`)" to="/whats-a-dapp" class="nav-link">What's a ÐApp</nuxt-link></li>
        <li class="nav-item"><nuxt-link @click.native="$mixpanel.track('Nav - About')" to="/about" class="nav-link">About</nuxt-link></li>
        <li class="nav-item"><a @click="$mixpanel.track('Nav - Newsletter')" href="https://landing.mailerlite.com/webforms/landing/t2o2r1" class="link" target="_blank" rel="noopener noreferrer">Get updates</a></li>
        <li class="nav-item"><a @click="$mixpanel.track('Nav - Twitter')" href="https://twitter.com/StateOfTheDApps" class="nav-link -twitter" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        <li class="nav-item"><a @click="$mixpanel.track('Nav - Github')" href="https://github.com/state-of-the-dapps" class="nav-link -github" target="_blank" rel="noopener noreferrer">Github</a></li>
        <li class="nav-item"><a @click="$mixpanel.track('Nav - Reddit')" href="https://reddit.com/r/StateOfTheDApps" class="nav-link -reddit" target="_blank" rel="noopener noreferrer">Reddit</a></li>
        <li class="nav-item"><a @click="$mixpanel.track('Nav - Medium')" href="https://blog.stateofthedapps.com/" class="nav-link -medium" target="_blank" rel="noopener noreferrer">Medium</a></li>
        <li class="nav-item"><a @click="$mixpanel.track('Nav - Slack')" href="https://slack.stateofthedapps.com/" class="nav-link -slack" target="_blank" rel="noopener noreferrer">Slack</a></li>
        <li class="nav-item"><nuxt-link @click.native="$mixpanel.track('Nav - New DApp')" to="/submit" class="nav-link -submit">Submit a ÐApp</nuxt-link></li>
      </ul>
      <ul class="nameplate-list">
        <li class="nameplate-item -logo"><nuxt-link @click.native="$mixpanel.track('Nav - Home')" to="/" class="nameplate-link -logo"><img src="~/assets/images/logo.png" width="172" alt="State of the ÐApps" class="nameplate-image"></nuxt-link></li>
        <li class="nameplate-item -description">A curated list of <strong>{{ dappCount }}</strong> decentralized apps <br>built on <strong class="nameplate-company-name">ethereum</strong></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    computed: {
      dappCount () {
        return this.$store.getters['statDappCount']
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
    z-index: 5;
    background: rgba(255,255,255,.4);
  }

  .nameplate-company-name {
    letter-spacing: .2rem;
  }

  .nameplate-image {
    display: block;
    margin: 0 auto;
  }

  .nameplate-item {
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-right: 10px;
    }
    &.-logo, &.-description {
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
  }

  .nav-link {
    display: inline-block;
    padding: 8px 6px;
    text-decoration: none;
    transition: opacity .2s ease;
    &.-twitter {
      background: url('~/assets/images/social/twitter.png') center center no-repeat;
      margin-left: 5px;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-left: 7px;
          margin-right: 5px;
      }
    }
    &.-github {
      background: url('~/assets/images/social/github.png') center center no-repeat;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-right: 5px;
      }
    }
    &.-reddit {
      background: url('~/assets/images/social/reddit.png') center center no-repeat;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-right: 5px;
      }
    }
    &.-medium {
      background: url('~/assets/images/social/medium.png') center center no-repeat;
      margin-right: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
          margin-right: 5px;
      }
    }
    &.-slack {
      background: url('~/assets/images/social/slack.png') center center no-repeat;
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

  .nav-list {
    text-align: center;
    @include tweakpoint('min-width', $tweakpoint--default) {
      text-align: right;
    }
  }
</style>
