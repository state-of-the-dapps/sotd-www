<template>
  <div class="component-DappDetailBodyContentCtas">
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
          :rel="'noopener noreferrer' + (dapp.nofollow ? ' nofollow' : '')" 
          class="button" 
          target="_blank" 
          @click="trackDappSite(['website','dapp'], dapp.sites.websiteUrl)">
          <span v-if="dapp.tags.includes(dappGameTag)">Play game<span v-if="dapp.isNsfw"> (NSFW)</span></span>
          <span v-else>Launch ÐApp/website<span v-if="dapp.isNsfw"> (NSFW)</span></span>
        </a>
      </div>
      <div v-else>
        <a 
          v-if="dapp.sites.dappUrl" 
          :href="dapp.sites.dappUrl + refString(dapp.sites.dappUrl)" 
          :rel="'noopener noreferrer' + (dapp.nofollow ? ' nofollow' : '')" 
          class="button" 
          target="_blank" 
          @click="trackDappSite(['dapp'], dapp.sites.dappUrl)">
          <span v-if="dapp.tags.includes(dappGameTag)">Play game<span v-if="dapp.isNsfw"> (NSFW)</span></span>
          <span v-else>Launch ÐApp<span v-if="dapp.isNsfw"> (NSFW)</span></span>
        </a>
        <a 
          v-if="dapp.sites.websiteUrl" 
          :href="dapp.sites.websiteUrl + refString(dapp.sites.websiteUrl)" 
          :rel="'noopener noreferrer' + (dapp.nofollow ? ' nofollow' : '')" 
          class="button" 
          target="_blank" 
          @click="trackDappSite(['website'], dapp.sites.websiteUrl)">Visit website<span v-if="dapp.isNsfw"> (NSFW)</span></a>
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
            rel="noopener noreferrer" 
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
import SvgSocialChat from './SvgSocialChat'
import SvgSocialBlog from './SvgSocialBlog'
import SvgSocialFacebook from './SvgSocialFacebook'
import SvgSocialGithub from './SvgSocialGithub'
import SvgSocialGitter from './SvgSocialGitter'
import SvgPlus from './SvgPlus'
import SvgSocialReddit from './SvgSocialReddit'
import SvgSocialTwitter from './SvgSocialTwitter'
import SvgStar from './SvgStar'

export default {
  components: {
    SvgSocialChat,
    SvgSocialBlog,
    SvgSocialFacebook,
    SvgSocialGithub,
    SvgSocialGitter,
    SvgPlus,
    SvgSocialReddit,
    SvgSocialTwitter,
    SvgStar
  },
  props: {
    dapp: {
      type: Object,
      required: true
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
@import '~assets/css/settings';

.add-icon {
  font-size: 2.1rem;
  line-height: 0;
}

.add-popover {
  position: absolute;
  top: -45px;
  left: calc(50% - 60px);
  width: 100%;
  background: $color--black;
  border-radius: 4px;
  box-shadow: 0 4px 50px rgba($color--black, 0.2);
  padding: 8px;
  text-align: center;
  width: 120px;
  &:after {
    content: '';
    position: absolute;
    right: calc(50% - 5px);
    bottom: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid $color--black;
  }
}

.add-popover-button {
  color: $color--white;
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
  border-radius: 3px;
  &.-add {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color--black;
    color: $color--white;
    line-height: initial;
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
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
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
