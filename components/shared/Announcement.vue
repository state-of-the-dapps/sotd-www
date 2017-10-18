<template>
  <div>
    <p class="message">{{ message }}<span v-if="url && urlText"> &nbsp; | &nbsp; <a  @click="$mixpanel.track('Announcement - Website', { url: url })" :href="url" class="link" target="_blank">{{ urlText }}</a></span><a href="#" class="close"><img src="/images/close/small-light.png" @click.prevent="hide" class="close-image" width="9" alt="Close"></a></p>
  </div>
</template>

<script>
  export default {
    computed: {
      message () {
        return this.$store.getters['announcement/message']
      },
      url () {
        return this.$store.getters['announcement/url']
      },
      urlText () {
        return this.$store.getters['announcement/urlText']
      }
    },
    methods: {
      hide () {
        this.$mixpanel.track('Announcement - Hide')
        this.$store.dispatch('announcement/hide')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .close {
    display: none;
    position: absolute;
    right: 10px;
    top: 18px;
    @include tweakpoint('min-width', $tweakpoint--default) {
      display: inline-block;
      right: 20px;
    }
  }

  .link {
    color: $color--gallery;
  }

  .message {
    text-align: center;
    color: $color--gallery;
    font-size: .9rem;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
