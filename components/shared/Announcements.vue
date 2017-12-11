<template>
  <transition name="fade">
    <section v-if="items.length > 0 && isActive" class="section -announcement">
      <ul class="container">
        <li v-for="item in items" class="message">
          {{ item.text }}<span v-if="item.link.url && item.link.text"> &nbsp; | &nbsp; <a  @click="$mixpanel.track('Announcement - Website', { url: item.link.url })" :href="item.link.url" class="link" target="_blank" rel="noopener noreferrer">{{ item.link.text }}</a></span>
        </li>
      </ul>
      <a href="#" class="close"><img src="~/assets/images/close/small-light.png" @click.prevent="hide" class="close-image" width="9" alt="Close"></a>
    </section>
  </transition>
</template>

<script>
  export default {
    computed: {
      isActive () {
        return this.$store.getters['announcement/isActive']
      },
      items () {
        return this.$store.getters['announcement/items']
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
