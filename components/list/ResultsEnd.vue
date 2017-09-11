<template>
  <p class="message">No {{ itemsCount > 0 ? 'more' : '' }} ÐApps here. You can always <nuxt-link @click.native="$mixpanel.track('DApps - New DApp')" to="/submit" class="link">submit one!</nuxt-link></p>
</template>

<script>
  export default {
    computed: {
      itemsCount () {
        return this.$store.getters['dapps/itemsCount']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .link {
    text-decoration: none;
  }
  
  .message {
    margin: 8rem 0;
    padding-bottom: 20px;
    text-align: center;
    font-size: 2rem;
    color: lighten($color--mine-shaft,55%);
  }
</style>
