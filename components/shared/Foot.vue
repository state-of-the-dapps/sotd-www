<template>
  <div>
    <p class="logo-wrapper"><img class="logo" src="/images/logo-reverse.png" width="190"></p>
    <ul class="social-list">
      <li class="social-item"><a @click="$mixpanel.track('Footer - Twitter')" href="https://twitter.com/StateOfTheDApps" class="social-link -twitter"><img src="/images/social/twitter-reverse.png" width="21" alt="Twitter"></a></li>
      <li class="social-item"><a @click="$mixpanel.track('Footer - Github')" href="https://github.com/state-of-the-dapps" class="social-link -github"><img src="/images/social/github-reverse.png" width="21" alt="Github"></a></li>
    </ul>
    <h4 class="disclaimer-heading">
      <nuxt-link @click.native="$mixpanel.track('Nav - Terms of Use')" to="/terms" class="link">Terms of Use</nuxt-link>
    </h4>
    <p class="disclaimer-message">{{ content.disclaimer }}</p>
    <p class="attribution">Designed by <a @click="$mixpanel.track('SoTD - Designer website')" href="https://www.enginecollaborative.com" class="link" target="_blank">Engine Collaborative</a></p>
  </div>
</template>

<script>
  export default {
    computed: {
      content () {
        return this.$store.getters['cms/footer']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

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
