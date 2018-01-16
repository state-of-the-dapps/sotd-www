<template>
  <section class="section -footer">
    <div class="container">
      <div class="wrapper -copyrights">
        <img class="monogram -copyrights" src="~/assets/images/monogram-reverse.png" width="30">
        <span>Copyright &copy; {{ Date.now() | formatDate('YYYY') }} State of the ÐApps</span>
      </div>
      <ul class="wrapper -social-logo-links">
        <li class="item -social-logo-links"><a @click="$mixpanel.track('SotD - Social', { platform: 'Twitter' })" href="https://twitter.com/StateOfTheDApps" class="social-link -twitter"><img src="~/assets/images/social/twitter-reverse.png" width="21" alt="Twitter" class="icon -social-logo-links"></a></li>
        <li class="item -social-logo-links"><a @click="$mixpanel.track('SotD - Social', { platform: 'Github' })" href="https://github.com/state-of-the-dapps" class="social-link -github"><img src="~/assets/images/social/github-reverse.png" width="21" alt="Github" class="icon -social-logo-links"></a></li>
        <li class="item -social-logo-links"><a @click="$mixpanel.track('SotD - Social', { platform: 'Reddit' })" href="https://reddit.com/r/StateOfTheDApps" class="social-link -reddit"><img src="~/assets/images/social/reddit-reverse.png" width="21" alt="Reddit" class="icon -social-logo-links"></a></li>
        <li class="item -social-logo-links"><a @click="$mixpanel.track('SotD - Social', { platform: 'Medium' })" href="https://blog.stateofthedapps.com/" class="social-link -medium"><img src="~/assets/images/social/medium-reverse.png" width="21" alt="Medium" class="icon -social-logo-links"></a></li>
        <li class="item -social-logo-links"><a @click="$mixpanel.track('SotD - Social', { platform: 'Slack' })" href="https://slack.stateofthedapps.com/" class="social-link -slack"><img src="~/assets/images/social/slack-reverse.png" width="21" alt="Slack" class="icon -social-logo-links"></a></li>
        <li class="item -social-logo-links">&nbsp;<nuxt-link @click.native="$mixpanel.track('Footer - About')" to="/about" class="link">About</nuxt-link></li>
        <li class="item -social-logo-links"><nuxt-link @click.native="$mixpanel.track('Footer - Terms of Use')" to="/terms" class="link">Terms</nuxt-link></li>
      </ul>
      <div class="wrapper -attribution">
        <span>Designed by <a class="link -attribution" @click="$mixpanel.track('SotD - Designer website')" href="https://www.enginecollaborative.com" target="_blank" rel="noopener noreferrer">Engine Collaborative</a></span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    padding: 0 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include tweakpoint('min-width', $tweakpoint--default) {
      flex-direction: row;
    }
  }

  .section {
    background: $color--mine-shaft;
    color: darken($color--gallery, 25%);
  }

  .link {
    color: darken($color--gallery, 25%);
  }

  .wrapper {
    padding: 30px 0;
  }

  .-copyrights {
    display: flex;
    align-items: center;
    &.monogram {
      margin-right: 10px;
      display: block;
    }
  }

  .-social-logo-links {
    &.wrapper {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.item {
      margin: 0 3px;
    }
    &.icon {
      display: block;
    }
  }
</style>
