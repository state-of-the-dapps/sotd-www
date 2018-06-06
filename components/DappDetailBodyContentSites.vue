<template>
<div class="component-DappDetailBodyContentSites">
  <div class="wrapper">
    <div v-if="dapp.logoUrl" class="logo-wrapper">
      <img class="logo-image" :src="dapp.logoUrl"/>
    </div>
    <span v-if="dapp.sites.websiteUrl === dapp.sites.dappUrl">
      <a :href="dapp.sites.websiteUrl" class="button" target="_blank" :rel="'noopener noreferrer' + (dapp.nofollow ? ' nofollow' : '')" @click="trackDappSite(['website','dapp'], dapp.sites.websiteUrl)">
        <span v-if="dapp.tags.includes(dappGameTag)">Play game<span v-if="dapp.isNsfw"> (NSFW)</span></span>
        <span v-else>Launch ÐApp/website<span v-if="dapp.isNsfw"> (NSFW)</span></span>
      </a>
    </span>
    <span v-else>
      <a v-if="dapp.sites.dappUrl" :href="dapp.sites.dappUrl" class="button" target="_blank" :rel="'noopener noreferrer' + (dapp.nofollow ? ' nofollow' : '')" @click="trackDappSite(['dapp'], dapp.sites.dappUrl)">
        <span v-if="dapp.tags.includes(dappGameTag)">Play game<span v-if="dapp.isNsfw"> (NSFW)</span></span>
        <span v-else>Launch ÐApp<span v-if="dapp.isNsfw"> (NSFW)</span></span>
      </a>
      <a v-if="dapp.sites.websiteUrl" :href="dapp.sites.websiteUrl" class="button" target="_blank" :rel="'noopener noreferrer' + (dapp.nofollow ? ' nofollow' : '')" @click="trackDappSite(['website'], dapp.sites.websiteUrl)">Visit website<span v-if="dapp.isNsfw"> (NSFW)</span></a>
    </span>
    <ul v-if="dapp.socials.length" class="social-list">
      <li v-for="(social, index) in dapp.socials" :key="index" class="social-item">
        <a class="social-link" :href="social.url" target="_blank" rel="noopener noreferrer" :title="social.platform | capitalize" @click="trackDappSocial(social.platform, social.url)">
          <component :is="svgSocialComponent(social.platform)"></component>
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
import SvgSocialReddit from './SvgSocialReddit'
import SvgSocialTwitter from './SvgSocialTwitter'

export default {
  data () {
    return {
      dappGameTag
    }
  },
  components: {
    SvgSocialChat,
    SvgSocialBlog,
    SvgSocialFacebook,
    SvgSocialGithub,
    SvgSocialGitter,
    SvgSocialReddit,
    SvgSocialTwitter
  },
  methods: {
    svgSocialComponent (platform) {
      const socialComponent = dappSocialComponentMap[platform]
      return socialComponent
    },
    trackDappSite (type, url) {
      const action = trackDappSite(this.dapp.slug, type, url)
      this.$mixpanel.track(action.name, action.data)
    },
    trackDappSocial (platform, url) {
      const action = trackDappSocial(this.dapp.slug, platform, url)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  props: {
    dapp: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.button {
  text-align: center;
  text-decoration: none;
  background: $color--black;
  color: $color--gray;
  display: block;
  width: 100%;
  max-width: 200px;
  padding: 8px 5px;
  margin-bottom: 8px;
  margin-left: auto;
  margin-right: auto;
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
  padding-bottom: 15px;
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

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
