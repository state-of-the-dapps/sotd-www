<template>
  <ul class="list">
    <li class="item"><a @click="$mixpanel.track('DApp - Suggest a change')" :href="'mailto:support@ethercasts.com?subject=The following dapp needs a change DApp&body=https://www.stateofthedapps.com/dapps/' + item.slug" class="link -suggest"><img src="/images/icons/suggest.png" width="14" class="image"> Suggest a change</a></li>
    <li class="item"><a @click="$mixpanel.track('DApp - Flag as inappropriate')" :href="'mailto:support@ethercasts.com?subject=Please review this dapp DApp&body=https://www.stateofthedapps.com/dapps/' + item.slug" class="link -flag"><img src="/images/icons/flag.png" width="14" class="image"> Flag as inappropriate</a></li>
    <li class="item"><a @click="$mixpanel.track('DApp - Share')" :href="'mailto:?subject=Check out this DApp&body=https://www.stateofthedapps.com/dapps/' + item.slug" class="link -share"><img src="/images/icons/share.png" width="14" class="image"> Share</a></li>
  </ul>
</template>

<script>
  export default {
    computed: {
      item () {
        return this.$store.getters['dapp/active']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .image {
    display: none;
    position: relative;
    top: 2px;
    @include tweakpoint('min-width', 600px) {
      display: inline-block;
    }
  }

  .link {
    text-decoration: none;
    margin: 0 10px;
  }

  .list {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
