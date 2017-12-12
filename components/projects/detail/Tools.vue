<template>
  <section class="section">
    <div class="container">
      <ul class="list">
        <li class="item"><a @click="$mixpanel.track('Project - Suggest a change')" :href="'mailto:support@stateofthedapps.com?subject=The following project needs a change: ' + item.name + '&body=https://www.stateofthedapps.com/projects/' + item.slug" class="link -suggest"><img src="~/assets/images/icons/suggest.png" width="14" class="image"> Suggest a change</a></li>
        <li class="item"><a @click="$mixpanel.track('Project - Flag as inappropriate')" :href="'mailto:support@stateofthedapps.com?subject=Please review this project: ' + item.name + '&body=https://www.stateofthedapps.com/projects/' + item.slug" class="link -flag"><img src="~/assets/images/icons/flag.png" width="14" class="image"> Flag as inappropriate</a></li>
        <li class="item"><a @click="$mixpanel.track('Project - Share')" :href="'mailto:?subject=Check out this DApp: ' + item.name + '&body=https://www.stateofthedapps.com/projects/' + item.slug" class="link -share"><img src="~/assets/images/icons/share.png" width="14" class="image"> Share</a></li>
      </ul>
    </div>
  </section>
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

  .container {
    padding-bottom: 30px;
  }

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
