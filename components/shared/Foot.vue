<template>
  <section class="section -footer">
    <div class="container">
      <p class="logo-wrapper"><img class="logo" src="~/assets/images/logo-reverse.png" width="190"></p>
      <ul class="social-list">
        <li class="social-item"><a @click="$mixpanel.track('SotD - Social', { platform: 'Twitter' })" href="https://twitter.com/StateOfTheDApps" class="social-link -twitter"><img src="~/assets/images/social/twitter-reverse.png" width="21" alt="Twitter"></a></li>
        <li class="social-item"><a @click="$mixpanel.track('SotD - Social', { platform: 'Github' })" href="https://github.com/state-of-the-dapps" class="social-link -github"><img src="~/assets/images/social/github-reverse.png" width="21" alt="Github"></a></li>
        <li class="social-item"><a @click="$mixpanel.track('SotD - Social', { platform: 'Reddit' })" href="https://reddit.com/r/StateOfTheDApps" class="social-link -reddit"><img src="~/assets/images/social/reddit-reverse.png" width="21" alt="Reddit"></a></li>
        <li class="social-item"><a @click="$mixpanel.track('SotD - Social', { platform: 'Medium' })" href="https://blog.stateofthedapps.com/" class="social-link -medium"><img src="~/assets/images/social/medium-reverse.png" width="21" alt="Medium"></a></li>
        <li class="social-item"><a @click="$mixpanel.track('SotD - Social', { platform: 'Slack' })" href="https://slack.stateofthedapps.com/" class="social-link -slack"><img src="~/assets/images/social/slack-reverse.png" width="21" alt="Slack"></a></li>
      </ul>
      <h4 class="disclaimer-heading">
        <nuxt-link @click.native="$mixpanel.track('Footer - Terms of Use')" to="/terms" class="link">Terms of Use</nuxt-link>
      </h4>
      <p class="disclaimer-message">{{ disclaimer }}</p>
      <p class="attribution">Designed by <a @click="$mixpanel.track('SotD - Designer website')" href="https://www.enginecollaborative.com" class="link" target="_blank" rel="noopener noreferrer">Engine Collaborative</a></p>
    </div>
  </section>
</template>

<script>
  export default {
    computed: {
      disclaimer () {
        return // TODO
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    padding: 30px 20px 75px 20px;
  }

  .section {
    background: $color--mine-shaft;
    color: $color--gallery;
  }

  .attribution {
    text-align: center;
    margin-top: 5rem;
  }

  .disclaimer-heading {
    text-align: center;
    font-weight: 300;
    font-size: 1rem;
    text-transform: uppercase;
    margin-top: 30px;
    margin-bottom: 0;
  }

  .disclaimer-message {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .link {
    color: $color--gallery;
  }

  .logo-wrapper {
    text-align: center;
  }

  .section {
    background: $color--mine-shaft;
  }

  .social-item {
    margin: 2px;
  }

  .social-list {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }
</style>
