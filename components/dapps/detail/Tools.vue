<template>
  <section class="section">
    <div class="wrapper">
      <ul class="list">
        <li class="item"><a @click="$mixpanel.track('DApp - Suggest a change', { slug: item.slug })" :href="'mailto:support@stateofthedapps.com?subject=The following ÐApp needs an update: ' + item.name + '&body=https://www.stateofthedapps.com/dapps/' + item.slug" class="link -suggest"><img src="~/assets/images/icons/edit.png" width="14" class="image"> Edit</a></li>
        <li class="item"><a @click="$mixpanel.track('DApp - Flag as inappropriate', { slug: item.slug })" :href="'mailto:support@stateofthedapps.com?subject=Please review this ÐApp: ' + item.name + '&body=https://www.stateofthedapps.com/dapps/' + item.slug" class="link -flag"><img src="~/assets/images/icons/flag.png" width="14" class="image"> Flag as inappropriate</a></li>
        <li class="item"><a @click="$mixpanel.track('DApp - Share', { slug: item.slug })" :href="'mailto:?subject=Check out this DApp: ' + item.name + '&body=https://www.stateofthedapps.com/dapps/' + item.slug" class="link -share"><img src="~/assets/images/icons/share.png" width="14" class="image"> Share</a></li>
      </ul>
    </div>
  </section>
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
    @include tweakpoint('min-width', 1250px) {
      margin-left: 0;
    }
  }

  .list {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 25px;
    @include tweakpoint('min-width', 1250px) {
      justify-content: flex-start;
    }
  }

  .section {
    @include tweakpoint('min-width', 1250px) {
      flex-grow: 1;
    }
  }
</style>
