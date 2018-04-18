<template>
  <div class="wrapper">
    <ul class="list" v-if="item.socials">
      <li v-for="(social, index) in item.socials" :key="index" class="item -icon">
        <a @click="$mixpanel.track('DApp - Social', { platform: social.platform, url: social.url, dapp: item.slug })" :href="social.url" class="link" target="_blank" :rel="'noopener noreferrer' + (item.nofollow ? ' nofollow' : '')"><img :src="require('~/assets/images/social/' + social.platform + '.png')" class="image" width="32" :alt="social.platform"></a>
        <div class="info">{{ social.platform | capitalize }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      item () {
        return this.$store.getters['dapps/detail/item']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .image {
    display: block;
  }

  .item {
    position: relative;
    margin-left: 4px;
    font-size: 1.05rem;
    &.-contact {
      margin-left: 0;
      margin-right: 5px;
      padding-left: 17px;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background: url('/images/icons/email.png') center center no-repeat;
        background-size: 14px 14px;
        width: 14px;
        height: 14px;
      }
    }
    &:hover .info {
      opacity: 1;
    }
  }

  .list {
    display: flex;
    align-items: center;
  }

  .info {
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
</style>
