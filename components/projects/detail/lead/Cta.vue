<template>
  <div v-if="item.sites.dappUrl || item.sites.websiteUrl" class="wrapper">
    <span v-if="item.sites.websiteUrl === item.sites.dappUrl">
      <a v-if="item.sites.websiteUrl" :href="item.sites.websiteUrl" @click="$mixpanel.track('Project - Site', { type: ['website','dapp'], url: item.sites.websiteUrl })" class="link" target="_blank" :rel="'noopener noreferrer' + (item.nofollow ? ' nofollow' : '')">Launch ÐApp/Website<span v-if="item.isNsfw"> (NSFW)</span></a>
    </span>
    <span v-else>
      <a v-if="item.sites.dappUrl" :href="item.sites.dappUrl" @click="$mixpanel.track('Project - Site', { type: ['dapp'], url: item.sites.dappUrl })" class="link" target="_blank" :rel="'noopener noreferrer' + (item.nofollow ? ' nofollow' : '')">Launch ÐApp<span v-if="item.isNsfw"> (NSFW)</span></a>
      <a v-if="item.sites.websiteUrl" :href="item.sites.websiteUrl" @click="$mixpanel.track('Project - Site', { type: ['website'], url: item.sites.websiteUrl })" class="link" target="_blank" :rel="'noopener noreferrer' + (item.nofollow ? ' nofollow' : '')">Visit website<span v-if="item.isNsfw"> (NSFW)</span></a>
    </span>
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

  .link {
    position: relative;
    display: inline-block;
    margin: 10px 0 10px 6px;
    text-decoration: none;
    padding: 15px 25px;
    color: $color--gallery;
    background: $color--mine-shaft;
    box-shadow: 0 17px 70px rgba($color--mine-shaft,.4);
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding: 20px 40px;
      font-size: 1.1rem;
    }
  }

  .wrapper {
    text-align: center;
  }
</style>
