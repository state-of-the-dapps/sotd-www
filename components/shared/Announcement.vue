<template>
  <transition name="fade">
    <section v-if="status" class="section -announcement">
      <div class="container">
        <p class="message">{{ message }}<span v-if="url && urlText"> &nbsp; | &nbsp; <a  @click="$mixpanel.track('Announcement - Website', { url: url })" :href="url" class="link" target="_blank" rel="noopener noreferrer">{{ urlText }}</a></span><a href="#" class="close"><img src="~/assets/images/close/small-light.png" @click.prevent="hide" class="close-image" width="9" alt="Close"></a></p>
      </div>
    </section>
  </transition>
</template>

<script>
  export default {
    computed: {
      message () {
        return this.$store.getters['announcement/message']
      },
      status () {
        return this.$store.getters['announcement/status']
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
    },
    mounted () {
      this.$store.dispatch('announcements/fetch')
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

  .container {
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
    position: relative;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding-top: 5px;
      padding-bottom: 5px;
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

  .section {
    background: $color--mine-shaft;
    transition: visibility .4s ease, opacity .3s ease;
    @include tweakpoint('min-width', $tweakpoint--default) {
      position: fixed;
      width: 100%;
      bottom: 0;
      z-index: 20;
    }
  }
</style>
