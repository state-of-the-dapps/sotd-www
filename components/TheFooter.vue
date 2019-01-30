<template>
  <div class="TheFooter">
    <ul class="nav-list">
      <li class="nav-item">
        <a 
          href="mailto:support@stateofthedapps.com" 
          class="nav-link" 
          @click="trackContact()">{{ $t(namespace('contactUs')) }}</a>
      </li>
      <li class="nav-item">
        <nuxt-link 
          to="/about" 
          class="nav-link" 
          @click.native="trackPageAbout()">{{ $t(namespace('about')) }}</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link 
          :to="localePath({ name: 'dapps-new' })" 
          class="nav-link" 
          @click.native="trackFooterSubmit()">{{ $t('cta.submit') }}</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link 
          :to="localePath({ name: 'promoted-dapps' })" 
          class="nav-link" 
          @click.native="trackPromotedDappsView()">{{ $t(namespace('promote')) }}</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link 
          :to="localePath({ name: 'logos' })" 
          class="nav-link" 
          @click.native="trackFooterLogoDownload()">{{ $t(namespace('downloadLogo')) }}</nuxt-link>
      </li>
      <li class="nav-item">
        <a
          href="https://play.google.com/store/apps/details?id=com.stateofthedapps.android&ref=StateOfTheDapps"
          class="nav-link"
          target="_blank"
          @click="trackFooterAppAndroid()">{{ $t(namespace('getAndroidApp')) }}</a>
      </li>
      <li class="nav-item">
        <nuxt-link 
          :to="localePath({ name: 'help-metamask' })" 
          class="nav-link"
          @click.native="trackFooterLink('help-metamask')">{{ $t(namespace('helpMetamask')) }}</nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link 
          to="/terms" 
          class="nav-link" 
          @click.native="trackPageTerms()">{{ $t(namespace('termsOfUse')) }}</nuxt-link>
      </li>
      <ul class="social-list">
        <li class="social-item">
          <a 
            href="https://twitter.com/StateOfTheDApps" 
            class="social-link" 
            target="_blank" 
            rel="noopener"
            @click="trackSocial('Twitter')"><img 
              src="~/assets/images/social/twitter-reverse.png" 
              alt="Twitter" 
              class="social-icon"></a>
        </li>
        <!--
        <li class="social-item">
          <a 
            href="https://github.com/state-of-the-dapps" 
            class="social-link" 
            target="_blank" 
            rel="noopener"
            @click="trackSocial('Github')"><img 
              src="~/assets/images/social/github-reverse.png" 
              alt="Github" 
              class="social-icon"></a>
        </li>
        -->
        <li class="social-item">
          <a 
            href="https://reddit.com/r/StateOfTheDApps" 
            class="social-link" 
            target="_blank" 
            rel="noopener"
            @click="trackSocial('Reddit')"><img 
              src="~/assets/images/social/reddit-reverse.png" 
              alt="Reddit" 
              class="social-icon"></a>
        </li>
        <li class="social-item">
          <a 
            href="https://blog.stateofthedapps.com/" 
            class="social-link" 
            target="_blank" 
            rel="noopener"
            @click="trackSocial('Medium')"><img 
              src="~/assets/images/social/medium-reverse.png" 
              alt="Medium" 
              class="social-icon"></a>
        </li>
        <li class="social-item">
          <a 
            href="https://t.me/stateofthedapps" 
            class="social-link" 
            target="_blank" 
            rel="noopener"
            @click="trackSocial('Telegram')"><img 
              src="~/assets/images/social/chat-reverse.png" 
              alt="Telegram" 
              class="social-icon"></a>
        </li>
        <li class="social-item">
          <a 
            href="https://get.status.im/chat/public/stateofthedapps-com" 
            class="social-link" 
            target="_blank" 
            rel="noopener"
            @click="trackSocial('Status')"><img 
              src="~/assets/images/social/status-reverse.png" 
              alt="Status" 
              class="social-icon"></a>
        </li>
      </ul>
    </ul>
    <ul class="attribution-list">
      <li class="attribution-item">
        <img 
          class="attribution-logo" 
          src="~/assets/images/logo-reverse.png">
      </li>
      <li class="attribution-item">
        <span>{{ $t(namespace('copyright')) }} &copy; {{ Date.now() | formatDate('YYYY') }} State of the DApps</span>
      </li>
      <li class="attribution-item">
        <i18n
          :path="namespace('designedBy')"
          tag="span"><a 
            class="attribution-link" 
            href="https://www.theduo.io" 
            place="designer"
            target="_blank" 
            rel="noopener"
            @click="$mixpanel.track('SotD - Designer website')">Duo</a>
        </i18n>
      </li>
      <li class="attribution-item">
        <i18n
          :path="namespace('exchangeRatesBy')"
          tag="span"><a 
            class="attribution-link"
            href="https://www.cryptocompare.com/" 
            place="source"
            target="_blank" 
            rel="noopener"
            @click="$mixpanel.track('SotD - CryptoCompare')">CryptoCompare.com</a>
        </i18n>
      </li>
      <li class="attribution-item">
        <i18n
          :path="namespace('steemDataBy')"
          tag="span"><a 
            class="attribution-link"
            href="https://steemapps.com/" 
            place="source"
            target="_blank" 
            rel="noopener"
            @click="$mixpanel.track('SotD - Steemapps')">SteemApps.com</a>
        </i18n>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  trackContact,
  trackFooterAppAndroid,
  trackFooterLink,
  trackFooterLogoDownload,
  trackFooterSubmit,
  trackPageAbout,
  trackPromotedDappsView,
  trackPageTerms,
  trackSocial
} from '~/helpers/mixpanel'

export default {
  data() {
    return {
      sourceComponent: '/shared/foot',
      sourcePageLocation: 'footer',
      sourcePath: this.$route.path
    }
  },
  computed: {
    userEntryRoute() {
      return this.$store.getters['userEntryRoute']
    }
  },
  methods: {
    trackContact() {
      const action = trackContact(
        this.sourceComponent,
        this.sourcePageLocation,
        this.sourcePath
      )
      this.$mixpanel.track(action.name, action.data)
    },
    trackFooterAppAndroid() {
      const action = trackFooterAppAndroid(this.sourcePath)
      this.$mixpanel.track(action.name, action.data)
    },
    trackFooterLink(link) {
      const action = trackFooterLink(this.sourcePath, link)
      this.$mixpanel.track(action.name, action.data)
    },
    trackFooterLogoDownload() {
      const action = trackFooterLogoDownload(this.sourcePath)
      this.$mixpanel.track(action.name, action.data)
    },
    trackFooterSubmit() {
      const action = trackFooterSubmit(this.sourcePath)
      this.$mixpanel.track(action.name, action.data)
    },
    trackPageAbout() {
      const action = trackPageAbout(
        this.sourceComponent,
        this.sourcePageLocation,
        this.sourcePath
      )
      this.$mixpanel.track(action.name, action.data)
    },
    trackPromotedDappsView() {
      const action = trackPromotedDappsView(
        this.sourceComponent,
        this.sourcePath,
        this.userEntryRoute
      )
      this.$mixpanel.track(action.name, action.data)
    },
    trackPageTerms() {
      const action = trackPageTerms(
        this.sourceComponent,
        this.sourcePageLocation,
        this.sourcePath
      )
      this.$mixpanel.track(action.name, action.data)
    },
    trackSocial(platform) {
      const action = trackSocial(
        this.sourceComponent,
        this.sourcePageLocation,
        this.sourcePath,
        platform
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.attribution-link {
  color: darken($color--gray, 25%);
  text-decoration: none;
  font-weight: 700;
}

.attribution-item {
  margin-bottom: 5px;
}

.attribution-list {
  margin-top: 20px;
  text-align: center;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-top: 5px;
    text-align: right;
    width: 50%;
  }
}

.attribution-logo {
  margin-bottom: 8px;
  width: 120px;
}

.TheFooter {
  align-items: top;
  background: $color--black;
  color: darken($color--gray, 25%);
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  justify-content: center;
  padding: 20px 10px 50px 10px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    flex-direction: row;
    padding-left: 22px;
    padding-right: 22px;
  }
}

.nav-item {
  padding: 3px 0;
}

.nav-link {
  color: darken($color--gray, 25%);
  text-decoration: none;
}

.nav-list {
  text-align: center;
  @include tweakpoint('min-width', $tweakpoint--default) {
    text-align: left;
    width: 50%;
  }
}

.social-list {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @include tweakpoint('min-width', $tweakpoint--default) {
    justify-content: left;
  }
}

.social-icon {
  display: block;
  width: 20px;
}

.social-item {
  margin-right: 4px;
}
</style>
