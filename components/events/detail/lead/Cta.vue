<template>
  <div v-if="item.sites.websiteUrl" class="wrapper">
    <a v-if="item.sites.websiteUrl" :href="item.sites.websiteUrl" @click="$mixpanel.track('Event - Site', { type: ['website'], url: item.sites.websiteUrl })" class="link" target="_blank" :rel="'noopener noreferrer' + (item.nofollow ? ' nofollow' : '')">Launch Website</a>
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
