<template>
<div class="component-DappDetailBodyContentSites">
  <div class="wrapper">
    <span v-if="sites.websiteUrl && sites.dappUrl">
      <a href="#" class="button">
        <span v-if="tags.includes(dappGameTag)">Play game<span v-if="isNsfw"> (NSFW)</span></span>
        <span v-else>Launch ÐApp/website<span v-if="isNsfw"> (NSFW)</span></span>
      </a>
    </span>
    <span v-else>
      <a href="#" v-if="sites.dappUrl" class="button">
        <span v-if="tags.includes(dappGameTag)">Play game<span v-if="isNsfw"> (NSFW)</span></span>
        <span v-else>Launch ÐApp<span v-if="isNsfw"> (NSFW)</span></span>
      </a>
      <a v-if="sites.websiteUrl" class="button">Visit website<span v-if="isNsfw"> (NSFW)</span></a>
    </span>
    <ul v-if="socials.length" class="social-list">
      <li v-for="(social, index) in socials" :key="index" class="social-item">
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
    isNsfw: {
      required: true
    },
    sites: {
      required: true
    },
    socials: {
      required: true
    },
    tags: {
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
