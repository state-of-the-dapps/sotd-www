<template>
  <section class="section -utilities">
    <div class="container">
      <ul class="list">
        <li class="item -description">A curated list of {{ statDappCount }} projects and {{ statEventCount }} upcoming events for ethereum's decentralized apps</li>
        <li class="item"><nuxt-link :to="{ name: 'what' }" class="link">What's a ÐApp</nuxt-link></li>
        <li class="item"><nuxt-link :to="{ name: 'about' }" class="link">About</nuxt-link></li>
        <li class="item">         
          <span @click="toggleNewsletterDropdown" class="link -newsletter" :class="{ '--is-active': newsletterDropdownIsActive }" target="_blank">Newsletter</span>
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
        <li class="item"><a href="mailto:support@stateofthedapps.com" class="link -getintouch">Get in touch</a></li>
      </ul>
    </div>
  </section>
</template>

<script>
  import { isValidEmail } from '~/helpers/validators'
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    computed: {
      statEventCount () {
        return this.$store.getters['statEventCount']
      },
      statDappCount () {
        return this.$store.getters['statDappCount']
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
        let hasErrors
        if (this.newsletterEmail.length > 0) {
          hasErrors = isValidEmail(this.newsletterEmail)
        } else {
          hasErrors = true
        }
        this.$store.dispatch('newsletter/subscribe/setEmailIsValid', hasErrors)
      }
    },
    directives: {
      onClickaway: onClickaway
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  .section {
    background: $color--mine-shaft;
    color: $color--gallery;
  }

  .item {
    margin: .5rem;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin: 0;
      margin-left: .25rem;
    }
    &.-description {
      margin-bottom: 1.25rem;
      @include tweakpoint('min-width', $tweakpoint--default) {
        margin: 0;
        flex: 1;
      }
    }
  }

  .list {
    text-align: center;
    font-size: .95rem;
    @include tweakpoint('min-width', $tweakpoint--default) {
      text-align: left;
      display: flex;
      align-items: center;
    }
  }

  .link {
    display: inline-block;
    color: $color--gallery;
    text-decoration: none;
    padding: .2rem .5rem;
    position: relative;
    border: 1px solid transparent;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding: .5rem .4rem;
    }
    &.-newsletter {
      cursor: pointer;
    }
    &.-getintouch {
      @include tweakpoint('min-width', $tweakpoint--default) {
        padding-right: 0;
      }
    }
    &.--is-active {
      border-color: $color--gallery;
      @include tweakpoint('min-width', $tweakpoint--default) {
        border-color: transparent;
      }
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

  .close-dropdown {
    text-align: right;
  }

  .dropdown {
    color: $color--mine-shaft;
    position: absolute;
    right: 50%;
    top: 135px;
    z-index: 20;
    margin-right: -150px;
    border: 1px solid $color--mine-shaft;
    background: rgba(lighten($color--gallery, 100%),.97);
    padding: 15px;
    width: 300px;
    box-shadow: 0 0 10px rgba($color--mine-shaft,.1);
    text-align: left;
    @include tweakpoint('min-width', $tweakpoint--default) {
      right: 10px;
      top: 45px;
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
