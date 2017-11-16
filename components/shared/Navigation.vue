<template>
  <ul class="list">
    <li class="item"><nuxt-link @click.native="$mixpanel.track(`Nav - What's a DApp`)" to="/whats-a-dapp" class="link">What's a ÐApp?</nuxt-link></li>
    <li class="item"><nuxt-link @click.native="$mixpanel.track('Nav - About')" to="/about" class="link">About</nuxt-link></li>
    <li class="item"><a @click="toggleNewsletterDropdown" class="link" :class="{ '--is-active': newsletterDropdown }" target="_blank">Newsletter</a></li>
    <li class="item"><nuxt-link @click.native="$mixpanel.track('Nav - New DApp')" to="/submit" class="link -submit">Submit a ÐApp</nuxt-link></li>
  </ul>
</template>

<script>
  export default {
    computed: {
      newsletterDropdown () {
        return this.$store.getters['newsletter/dropdown']
      }
    },
    methods: {
      toggleNewsletterDropdown () {
        if (!this.newsletterDropdown) {
          console.log('Newsletter dropdown', this.newsletterDropdown)
          this.$mixpanel.track('Nav - Newsletter')
        }
        this.$store.dispatch('newsletter/toggleDropdown')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .item {
    display: inline-block;
  }

  .link {
    display: inline-block;
    padding: 2px 5px;
    text-decoration: none;
    transition: all .2s ease;
    border: 1px solid transparent;
    cursor: pointer;
    &.-submit {
      @include tweakpoint('min-width', $tweakpoint--default) {
        margin-left: 7px;
        padding: 8px 15px;
        color: $color--gallery;
        background: $color--mine-shaft;
        box-shadow: 0 17px 70px rgba($color--mine-shaft,.4);
      }
    }
    &.--is-active {
      border-color: $color--mine-shaft;
    }
  }

  .list {
    text-align: center;
    @include tweakpoint('min-width', $tweakpoint--default) {
      text-align: right;
    }
  }
</style>
