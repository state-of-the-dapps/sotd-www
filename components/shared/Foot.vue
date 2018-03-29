<template>
  <section class="section -footer">
    <div class="container">
      <ul class="list -links">
        <li class="item -links"><nuxt-link @click.native="$mixpanel.track('Footer - About')" to="/about" class="link">About</nuxt-link></li>
        <li class="item -links"><nuxt-link @click.native="$mixpanel.track('Footer - Terms of Use')" to="/terms" class="link">Terms of use</nuxt-link></li>
        <ul class="list -social-logo-links">
          <li class="item -social-logo-links"><a @click="$mixpanel.track('SotD - Social', { platform: 'Twitter' })" href="https://twitter.com/StateOfTheDApps" class="social-link -twitter"><img src="~/assets/images/social/twitter-reverse.png" width="18" alt="Twitter" class="icon -social-logo-links"></a></li>
          <li class="item -social-logo-links"><a @click="$mixpanel.track('SotD - Social', { platform: 'Github' })" href="https://github.com/state-of-the-dapps" class="social-link -github"><img src="~/assets/images/social/github-reverse.png" width="18" alt="Github" class="icon -social-logo-links"></a></li>
          <li class="item -social-logo-links"><a @click="$mixpanel.track('SotD - Social', { platform: 'Reddit' })" href="https://reddit.com/r/StateOfTheDApps" class="social-link -reddit"><img src="~/assets/images/social/reddit-reverse.png" width="18" alt="Reddit" class="icon -social-logo-links"></a></li>
          <li class="item -social-logo-links"><a @click="$mixpanel.track('SotD - Social', { platform: 'Medium' })" href="https://blog.stateofthedapps.com/" class="social-link -medium"><img src="~/assets/images/social/medium-reverse.png" width="18" alt="Medium" class="icon -social-logo-links"></a></li>
          <li class="item -social-logo-links"><a @click="$mixpanel.track('SotD - Social', { platform: 'Slack' })" href="https://slack.stateofthedapps.com/" class="social-link -slack"><img src="~/assets/images/social/slack-reverse.png" width="18" alt="Slack" class="icon -social-logo-links"></a></li>
        </ul>
      </ul>
      <ul class="list -attributions">
        <li><img class="logo -social-logo-links" src="~/assets/images/logo-reverse.png" width="120"></li>
        <li>Copyright &copy; {{ Date.now() | formatDate('YYYY') }} State of the ÐApps</li>
        <li>Designed by <a class="link -attributions" @click="$mixpanel.track('SotD - Designer website')" href="https://www.theduo.io" target="_blank" rel="noopener noreferrer">Duo</a></li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    padding: 30px 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include tweakpoint('min-width', $tweakpoint--default) {
      flex-direction: row;
    }
  }

  .section {
    background: $color--black;
    color: darken($color--gray, 25%);
  }

  .link {
    color: darken($color--gray, 25%);
  }

  .-attributions {
    &.list {
      margin: 15px 0;
      text-align: center;
      @include tweakpoint('min-width', $tweakpoint--default) {
        text-align: right;
        width: 50%;
      }
    }
  }

  .-links {
    &.list {
      margin: 15px 0;
      text-align: center;
      @include tweakpoint('min-width', $tweakpoint--default) {
        text-align: left;
        width: 50%;
      }
    }
  }

  .-social-logo-links {
    &.list {
      margin-top: 5px;
      display: flex;
      align-items: center;
    }
    &.item {
      margin-right: 5px;
    }
    &.icon {
      display: block;
    }
    &.logo {
      margin-bottom: 5px;
    }
  }
</style>
