<template>
  <div class="wrapper">
    <ul class="list" v-if="item.socials">
      <li v-for="(social, key) in item.socials" class="item -icon"><a @click="$mixpanel.track('Project - Social', { platform: social, url: social.url })" :href="social.url" class="link" target="_blank" :rel="'noopener noreferrer' + (item.nofollow ? ' nofollow' : '')"><img :src="require('~/assets/images/social/' + key + '.png')" class="image" width="32" :alt="key"></a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      item () {
        return this.$store.getters['projects/detail/item']
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
  }

  .list {
    display: flex;
    align-items: center;
  }
</style>
