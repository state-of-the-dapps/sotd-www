<template>
<div class="component-DappDetailBodyContentSites">
  <div class="wrapper">
    <span v-if="dapp.sites.websiteUrl && dapp.sites.dappUrl">
      <button class="button">
        <span v-if="dapp.tags.includes(dappGameTag)">Play game</span>
        <span v-else>Launch ÐApp/website</span>
      </button>
    </span>
    <span v-else>
      <button v-if="dapp.sites.dappUrl" class="button">Launch ÐApp</button>
      <button v-if="dapp.sites.websiteUrl" class="button">Visit website</button>
    </span>
    <ul v-if="dapp.socials.length" class="social-list">
      <li v-for="(social, index) in dapp.socials" :key="index" class="social-item">
        <a class="social-link" :href="social.url" target="_blank" rel="noopener noreferrer" :title="social.platform | capitalize">
          <component :is="svgSocialComponent(social.platform)"></component>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { dappGameTag, dappSocialComponentMap } from '~/helpers/constants'
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
  background: $color--black;
  color: $color--gray;
  display: block;
  width: 100%;
  max-width: 200px;
  padding: 6px;
  margin-bottom: 7px;
  margin-left: auto;
  margin-right: auto;
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
