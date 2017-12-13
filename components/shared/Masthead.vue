<template>
  <nav class="section -masthead">
    <div class="container">
      <ul class="nav-list">
        <li class="nav-item"><nuxt-link @click.native="$mixpanel.track(`Nav - What's a DApp`)" to="/whats-a-dapp" class="nav-link">What's a ÐApp</nuxt-link></li>
        <li class="nav-item"><nuxt-link @click.native="$mixpanel.track('Nav - About')" to="/about" class="nav-link">About</nuxt-link></li>
        <li class="nav-item">
          <span @click="toggleNewsletterDropdown" class="nav-link -newsletter" :class="{ '--is-active': newsletterDropdownIsActive }" target="_blank">Newsletter</span>
          <transition name="fade">
            <div v-if="newsletterDropdownIsActive" v-on-clickaway="toggleNewsletterDropdown" class="dropdown -newsletter">
              <transition name="fade" mode="out-in">
                <div v-if="newsletterConfirmation" key="confirmation">
                  <p>Thanks for signing up. We'll be in touch!</p><p class="close-dropdown"><a @click="toggleNewsletterDropdown">Close</a></p>
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
<<<<<<< HEAD
        <li class="nav-item"><nuxt-link @click.native="$mixpanel.track('Nav - New project')" :to="{ name: 'projects-submit-new' }" class="nav-link -submit">Submit a ÐApp</nuxt-link></li>
      </ul>
      <ul class="nameplate-list">
        <li class="nameplate-item -logo"><nuxt-link @click.native="$mixpanel.track('Nav - Home')" to="/" class="nameplate-link -logo"><img src="~/assets/images/logo.png" width="172" alt="State of the ÐApps" class="nameplate-image"></nuxt-link></li>
        <li class="nameplate-item -description">A curated list of <strong>{{ statProjectCount }}</strong> decentralized apps <br>built on <strong class="nameplate-company-name">ethereum</strong></li>
=======
        <li class="nav-item"><nuxt-link @click.native="$mixpanel.track('Nav - New DApp')" :to="{ name: 'dappNew' }" class="nav-link -submit">Submit a ÐApp</nuxt-link></li>
      </ul>
      <ul class="nameplate-list">
        <li class="nameplate-item -logo"><nuxt-link @click.native="$mixpanel.track('Nav - Home')" to="/" class="nameplate-link -logo"><img src="~/assets/images/logo.png" width="172" alt="State of the ÐApps" class="nameplate-image"></nuxt-link></li>
        <li class="nameplate-item -description">A curated list of <strong>{{ dappCount }}</strong> decentralized apps <br>built on <strong class="nameplate-company-name">ethereum</strong></li>
>>>>>>> master
      </ul>
    </div>
  </nav>
</template>

<script>
  import { validateEmail } from '~/helpers/validators'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
<<<<<<< HEAD
      statProjectCount () {
        return this.$store.getters['statProjectCount']
=======
      dappCount () {
        return this.$store.getters['statDappCount']
>>>>>>> master
      },
      newsletterConfirmation () {
        return this.$store.getters['newsletter/subscribe/confirmation']
      },
      newsletterDropdownIsActive () {
        return this.$store.getters['newsletter/subscribe/dropdownIsActive']
      },
      newsletterEmail: {
        get () {
          return this.$store.getters['newsletter/subscribe/email']
        },
        set (value) {
          this.$store.dispatch('newsletter/subscribe/setEmail', value)
        }
      },
      newsletterEmailIsValid () {
        return this.$store.getters['newsletter/subscribe/emailIsValid']
      },
      newsletterIsLoading () {
        return this.$store.getters['newsletter/subscribe/isLoading']
      }
    },
    methods: {
      newsletterSubscribe () {
        if (this.newsletterEmailIsValid && !this.newsletterIsLoading) {
          this.$store.dispatch('newsletter/subscribe/submit', this.newsletterEmail)
          this.$mixpanel.track('Newsletter', { action: 'dropdown' })
        }
      },
      toggleNewsletterDropdown () {
        if (!this.newsletterDropdown) {
          this.$mixpanel.track('Newsletter', { action: 'subscribe' })
        }
        this.$store.dispatch('newsletter/subscribe/toggleDropdown')
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
        this.$store.dispatch('newsletter/subscribe/setEmailIsValid', isValid)
      }
    },
    directives: {
      onClickaway: onClickaway
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .close-dropdown {
    text-align: right;
  }

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

  .container {
    @include tweakpoint('min-width', $tweakpoint--default) {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      padding-top: 25px;
      padding-bottom: 25px;
      > * {
          width: 50%;
      }
    }
  }

  .section {
    position: relative;
    z-index: 10;
    background: rgba(255,255,255,.4);
  }

  .nameplate-company-name {
    letter-spacing: .2rem;
  }

  .nameplate-image {
    display: block;
    margin: 0 auto;
  }

  .nameplate-item {
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-right: 10px;
    }
    &.-logo, &.-description {
      margin-bottom: 5px;
      @include tweakpoint('min-width', $tweakpoint--default) {
        margin-bottom: 0;
      }
    }
  }

  .nameplate-list {
    text-align: center;
    margin-top: 20px;
    line-height: 1.4;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-top: 0;
      text-align: left;
      display: flex;
      align-items: center;
      line-height: 1.2;
    }
  }

  .nav-item {
    display: inline-block;
    @include tweakpoint('min-width', $tweakpoint--default) {
      position: relative;
    }
    &:last-child {
      margin-left: 6px;
    }
  }

  .nav-link {
    display: inline-block;
    padding: 2px 5px;
    text-decoration: none;
    transition: all .2s ease;
    border: 1px solid transparent;
    position: relative;
    cursor: pointer;
    &.-submit {
      padding: 8px 15px;
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

  .nav-list {
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
