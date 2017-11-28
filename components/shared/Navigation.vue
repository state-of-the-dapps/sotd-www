<template>
  <ul class="list">
    <li class="item"><nuxt-link @click.native="$mixpanel.track(`Nav - What's a DApp`)" to="/whats-a-dapp" class="link">What's a ÐApp?</nuxt-link></li>
    <li class="item"><nuxt-link @click.native="$mixpanel.track('Nav - About')" to="/about" class="link">About</nuxt-link></li>
    <li class="item">
      <span @click="toggleNewsletterDropdown" class="link -newsletter" :class="{ '--is-active': newsletterDropdown }" target="_blank">Newsletter</span>
      <transition name="fade">
        <div v-if="newsletterDropdown" v-on-clickaway="toggleNewsletterDropdown" class="dropdown -newsletter">
          <transition name="fade" mode="out-in">
            <div v-if="newsletterConfirmation" key="confirmation">
              <p>Thanks for signing up. We'll be in touch! <a @click="toggleNewsletterDropdown">Close this window</a></p>
            </div>
            <div v-else key="subscribe">
              <p>Sign up to receive our newsletter</p>
              <input v-model="newsletterEmail" @input="validateNewsletterEmail" class="text-input" type="text" placeholder="Enter your email address">
              <button @click.stop="newsletterSubscribe" class="subscribe" :class="{ '--is-ready': newsletterEmailIsValid && !newsletterIsLoading }">Subscribe</button>
            </div>
          </transition>
        </div>
      </transition>
    </li>
    <li class="item"><nuxt-link @click.native="$mixpanel.track('Nav - New DApp')" to="/submit" class="link -submit">Submit a ÐApp</nuxt-link></li>
  </ul>
</template>

<script>
  import { validateEmail } from '~/plugins/validators'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      newsletterConfirmation () {
        return this.$store.getters['newsletter/confirmation']
      },
      newsletterDropdown () {
        return this.$store.getters['newsletter/dropdown']
      },
      newsletterEmail: {
        get () {
          return this.$store.getters['newsletter/email']
        },
        set (value) {
          this.$store.dispatch('newsletter/updateEmail', value)
        }
      },
      newsletterEmailIsValid () {
        return this.$store.getters['newsletter/emailIsValid']
      },
      newsletterIsLoading () {
        return this.$store.getters['newsletter/isLoading']
      }
    },
    methods: {
      newsletterSubscribe () {
        if (this.newsletterEmailIsValid && !this.newsletterIsLoading) {
          this.$store.dispatch('newsletter/subscribe')
        }
      },
      toggleNewsletterDropdown () {
        if (!this.newsletterDropdown) {
          this.$mixpanel.track('Nav - Newsletter')
        }
        this.$store.dispatch('newsletter/toggleDropdown')
      },
      validateNewsletterEmail () {
        var hasErrors
        var isValid
        if (this.newsletterEmail.length > 0) {
          hasErrors = validateEmail(this.newsletterEmail)
        } else {
          hasErrors = true
        }
        isValid = !hasErrors
        this.$store.dispatch('newsletter/updateEmailIsValid', isValid)
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
    padding: 15px;
    width: 300px;
    z-index: 10;
    box-shadow: 0 0 10px rgba($color--mine-shaft,.1);
    text-align: left;
    @include tweakpoint('min-width', $tweakpoint--default) {
      right: 0;
      top: 35px;
      margin-right: 0;
    }
    p:first-child {
      margin-top: 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }

  .input-field {
    position: relative;
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
      padding-left: 15px;
      padding-right: 15px;
      color: $color--gallery;
      background: $color--mine-shaft;
      box-shadow: 0 17px 70px rgba($color--mine-shaft,.4);
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

  .subscribe {
    display: block;
    margin: 0 auto;
    width: 100%;
    margin-top: 10px;
    border: none;
    background: rgba($color--mine-shaft, .1);
    color: rgba($color--mine-shaft, .4);
    font-size: 1rem;
    font-weight: 600;
    padding: 6px;
    position: relative;
    transition: all .5s ease;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-left: 0;
      margin-right: 0;
    }
    &.--is-ready {
      background: rgba($color--mine-shaft, 1);
      box-shadow: 0 17px 70px rgba($color--mine-shaft, 0.3);
      color: $color--gallery;
      &:hover {
        cursor: pointer;
      }
      &:active {
        top: 1px;
      }
    }
  }

  .text-input {
    border: 1px solid rgba($color--mine-shaft, .2);
    padding: 10px;
    width: 100%;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
    background: lighten($color--gallery,100%);
    transition: background .2s ease;
    &:focus + .label,  &.--is-filled + .label {
      top: -11px;
      opacity: .65;
    }
  }
</style>
