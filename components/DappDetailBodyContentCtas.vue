<template>
<div class="component-DappDetailBodyContentCtas">
  <div class="wrapper">
    <div v-if="dapp.logoUrl" class="logo-wrapper">
      <img class="logo-image" :src="dapp.logoUrl"/>
    </div>
    <span class="star-wrapper">
      <button v-if="!myList.includes(dapp.slug)" class="button -add" @click="addToMyList(dapp.slug)">
        <span class="add-icon">+</span>
        <span class="add-text">Add to my list</span>
      </button>
      <button v-else class="button -add" @click="removeFromMyList(dapp.slug)">
        <span class="add-text">Remove from my list</span>
      </button> 
    </span>
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
import SvgStar from './SvgStar'

export default {
  data () {
    return {
      dappGameTag,
      myList: []
    }
  },
  components: {
    SvgSocialChat,
    SvgSocialBlog,
    SvgSocialFacebook,
    SvgSocialGithub,
    SvgSocialGitter,
    SvgSocialReddit,
    SvgSocialTwitter,
    SvgStar
  },
  methods: {
    addToMyList (slug) {
      if (!this.myList.includes(slug)) {
        this.myList.push(slug)
        this.$localStorage.set('myList', this.myList)
      }
    },
    removeFromMyList (slug) {
      if (this.myList.includes(slug)) {
        let index = this.myList.indexOf(slug)
        this.myList.splice(index, 1)
        this.$localStorage.set('myList', this.myList)
      }
    },
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
  mounted () {
    const myList = this.$localStorage.get('myList')
    if (myList) {
      this.myList = myList.split(',')
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

.add-icon {
  font-size: 2.1rem;
  line-height: 0;
}

.button {
  text-align: center;
  text-decoration: none;
  border: 1px solid $color--black;
  display: block;
  width: 100%;
  max-width: 200px;
  padding: 8px 5px;
  margin-bottom: 8px;
  margin-left: auto;
  margin-right: auto;
  &.-add {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color--black;
    color: $color--white;
    line-height: initial;
  }
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

.add-text {
  display: inline-block;
  margin-left: 5px;
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
