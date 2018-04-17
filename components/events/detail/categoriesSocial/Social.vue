<template>
  <div class="wrapper -component-events-detail-categoriessocial-social">
    <ul class="list -social" v-if="(item.socials && item.socials.length) || item.hashtag">
      <li class="item -social --hashtag" :class="(item.socials && item.socials.length) ? '--has-socials': ''"><a @click="$mixpanel.track('Event - Social', { platform: 'hashtag' })" :href="'https://www.twitter.com/hashtag/' + item.hashtag" class="link -social --hashtag" target="_blank" :rel="'noopener noreferrer' + (item.nofollow ? ' nofollow' : '')">#{{ item.hashtag }}</a></li>
      <li v-for="(social, index) in item.socials" :key="index" class="item -social"><a @click="$mixpanel.track('Event - Social', { platform: social.platform, url: social.url })" :href="social.url" class="link -social" target="_blank" :rel="'noopener noreferrer' + (item.nofollow ? ' nofollow' : '')"><img :src="require('~/assets/images/social/' + social.platform + '.png')" class="image -social" width="32" :alt="social.platform"></a>
        <div class="info -social">{{ social.platform | capitalize }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      item () {
        return this.$store.getters['events/detail/item']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-social {
    &.image {
      display: block;
    }
    &.item {
      position: relative;
      margin-left: 4px;
      font-size: 1.05rem;
      &.--hashtag {
        text-decoration: underline;
        margin-left: 0;
        &.--has-socials {
          margin-right: 8px;
        }
      }
      &:hover .info {
        opacity: 1;
      }
    }
    &.list {
      display: flex;
      align-items: center;
    }
    &.link {
      text-decoration: none;
    }
    &.info {
      pointer-events: none;
      position: absolute;
      top: -25px;
      right: 0;
      z-index: 5;
      font-weight: 600;
      text-align: center;
      background: lighten($color--gray, 10%);
      border: 1px solid $color--black;
      padding: 3px 8px 2px;
      text-transform: uppercase;
      font-size: .7rem;
      opacity: 0;
      transition: opacity .5s ease;
      white-space: nowrap;
      box-shadow: 0 0 20px rgba($color--black,.1);
      &:after {
        position: absolute;
        bottom:-7px;
        right: 14px;
        content: '';
        width: 1px;
        height: 7px;
        background: $color--black;
      }
    }
  }
</style>
