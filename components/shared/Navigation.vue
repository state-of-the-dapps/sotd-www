<template>
  <ul class="list">
    <li class="item"><nuxt-link @click.native="$mixpanel.track(`Nav - What's a DApp`)" to="/whats-a-dapp" class="link">What's a ÐApp?</nuxt-link></li>
    <li class="item"><nuxt-link @click.native="$mixpanel.track('Nav - About')" to="/about" class="link">About</nuxt-link></li>
    <li class="item">
      <span @click="toggleNewsletterDropdown" class="link -newsletter" :class="{ '--is-active': newsletterDropdown }" target="_blank">Newsletter</span>
      <transition name="fade">
        <div v-if="newsletterDropdown" v-on-clickaway="toggleNewsletterDropdown" class="dropdown -newsletter">

        </div>
      </transition>
    </li>
    <li class="item"><nuxt-link @click.native="$mixpanel.track('Nav - New DApp')" to="/submit" class="link -submit">Submit a ÐApp</nuxt-link></li>
  </ul>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'

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
    },
    directives: {
      onClickaway: onClickaway
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .dropdown {
    position: absolute;
    right: 50%;
    top: 50px;
    margin-right: -150px;
    border: 1px solid $color--mine-shaft;
    background: rgba(lighten($color--gallery, 100%),.95);
    padding: 10px;
    width: 300px;
    z-index: 10;
    box-shadow: 0 0 10px rgba($color--mine-shaft,.1);
    @include tweakpoint('min-width', $tweakpoint--default) {
      right: 0;
      top: 35px;
      margin-right: 0;
    }
  }

  .item {
    display: inline-block;
    @include tweakpoint('min-width', $tweakpoint--default) {
      position: relative;
    }
  }

  .link {
    display: inline-block;
    padding: 2px 5px;
    text-decoration: none;
    transition: all .2s ease;
    border: 1px solid transparent;
    position: relative;
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
      &.-newsletter {
        &:after {
          content: ' ';
          position: absolute;
          bottom: -16px;
          right: 50%;
          width: 1px;
          height: 12px;
          background: $color--mine-shaft;
        }
      }
    }
  }

  .list {
    text-align: center;
    @include tweakpoint('min-width', $tweakpoint--default) {
      text-align: right;
    }
  }
</style>
