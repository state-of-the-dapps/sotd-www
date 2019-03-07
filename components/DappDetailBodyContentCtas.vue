<template>
  <div class="DappDetailBodyContentCtas">
    <div class="wrapper">
      <div 
        v-if="dapp.logoUrl" 
        class="logo-wrapper">
        <img 
          :src="dapp.logoUrl" 
          class="logo-image">
      </div>
      <div v-if="dapp.sites.websiteUrl && dapp.sites.websiteUrl === dapp.sites.dappUrl">
        <a 
          :href="dapp.sites.websiteUrl + refString(dapp.sites.websiteUrl)" 
          :rel="'noopener' + (dapp.nofollow ? ' nofollow' : '')"
          class="button" 
          target="_blank" 
          @click="trackDappSite(['website','dapp'], dapp.sites.websiteUrl)">
          <span v-if="dapp.tags.includes(dappGameTag)">{{ $t(namespace('playGame')) }}<span v-if="dapp.isNsfw"> (NSFW)</span></span>
          <span v-else>{{ $t(namespace('launchDappWebsite')) }}<span v-if="dapp.isNsfw"> (NSFW)</span></span>
        </a>
      </div>
      <div v-else>
        <a 
          v-if="dapp.sites.dappUrl" 
          :href="dapp.sites.dappUrl + refString(dapp.sites.dappUrl)" 
          :rel="'noopener' + (dapp.nofollow ? ' nofollow' : '')"
          class="button" 
          target="_blank" 
          @click="trackDappSite(['dapp'], dapp.sites.dappUrl)">
          <span v-if="dapp.tags.includes(dappGameTag)">{{ $t(namespace('playGame')) }}<span v-if="dapp.isNsfw"> (NSFW)</span></span>
          <span v-else>{{ $t(namespace('launchDapp')) }}<span v-if="dapp.isNsfw"> (NSFW)</span></span>
        </a>
        <a 
          v-if="dapp.sites.websiteUrl" 
          :href="dapp.sites.websiteUrl + refString(dapp.sites.websiteUrl)" 
          :rel="'noopener' + (dapp.nofollow ? ' nofollow' : '')"
          class="button" 
          target="_blank" 
          @click="trackDappSite(['website'], dapp.sites.websiteUrl)">{{ $t(namespace('website')) }}<span v-if="dapp.isNsfw"> (NSFW)</span></a>
      </div>
      <div v-if="dapp.sites.iosUrl">
        <a 
          :href="dapp.sites.iosUrl"
          target="_blank" 
          @click="trackDappSite(['ios','dapp'], dapp.sites.iosUrl)">
          <img
            class="badge-image ios"
            src="~/assets/images/appstore-ios.png"
          >
        </a>
      </div>
      <div v-if="dapp.sites.androidUrl">
        <a 
          :href="dapp.sites.androidUrl"
          target="_blank" 
          @click="trackDappSite(['android','dapp'], dapp.sites.androidUrl)">
          <img
            class="badge-image"
            src="~/assets/images/appstore-android.png"
          >
        </a>
      </div>
      <ul 
        v-if="dapp.socials.length" 
        class="social-list">
        <li 
          v-for="(social, index) in dapp.socials" 
          :key="index" 
          class="social-item">
          <a 
            :href="social.url + refString(social.url)" 
            :title="social.platform | capitalize" 
            class="social-link" 
            target="_blank" 
            rel="noopener"
            @click="trackDappSocial(social.platform, social.url)">
            <component :is="svgSocialComponent(social.platform)"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { dappGameTag, dappSocialComponentMap } from '~/helpers/constants'
import { trackDappSite, trackDappSocial } from '~/helpers/mixpanel'
import IconSocialChat from './IconSocialChat'
import IconSocialBlog from './IconSocialBlog'
import IconSocialFacebook from './IconSocialFacebook'
import IconSocialGithub from './IconSocialGithub'
import IconSocialGitter from './IconSocialGitter'
import IconPlus from './IconPlus'
import IconSocialReddit from './IconSocialReddit'
import IconSocialTwitter from './IconSocialTwitter'
import IconStar from './IconStar'

export default {
  components: {
    IconSocialChat,
    IconSocialBlog,
    IconSocialFacebook,
    IconSocialGithub,
    IconSocialGitter,
    IconPlus,
    IconSocialReddit,
    IconSocialTwitter,
    IconStar
  },
  props: {
    dapp: {
      type: Object,
      required: true,
      default: () => ({
        socials: [],
        sites: {},
        tags: []
      })
    }
  },
  data() {
    return {
      dappGameTag
    }
  },
  methods: {
    refString(url) {
      let refString = url.includes('?') ? '&' : '?'
      refString += 'utm_source=StateOfTheDApps'
      return refString
    },
    svgSocialComponent(platform) {
      const socialComponent = dappSocialComponentMap[platform]
      return socialComponent
    },
    trackDappSite(type, url) {
      const action = trackDappSite(this.dapp.slug, type, url)
      this.$mixpanel.track(action.name, action.data)
    },
    trackDappSocial(platform, url) {
      const action = trackDappSocial(this.dapp.slug, platform, url)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
.add-icon {
  font-size: 2.1rem;
  line-height: 0;
}

.button {
  text-align: center;
  text-decoration: none;
  background: $color--black;
  color: $color--white;
  display: block;
  width: 100%;
  max-width: 200px;
  padding: 9px 5px;
  margin-bottom: 8px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1000px;
  &.-add {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color--black;
    color: $color--white;
    line-height: initial;
  }
}

.badge-image {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  &.ios {
    padding: 10px;
  }
}

.cta-wrapper {
  position: relative;
}

.logo-image {
  display: block;
  margin: 0 auto;
  max-width: 200px;
  @include tweakpoint('min-width', 1000px) {
    max-width: 100%;
  }
}

.logo-wrapper {
  text-align: center;
  overflow: hidden;
  padding-bottom: 10px;
}

.social-item {
  padding: 3px;
}

.social-link {
  display: block;
  height: 24px;
}

.social-list {
  margin: 0 -3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.add-icon {
  margin-right: 5px;
}

.add-text {
  display: inline-block;
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
