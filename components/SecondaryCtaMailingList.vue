<template>
  <div 
    id="component-SecondaryCtaMailingList" 
    class="component-SecondaryCtaMailingList">
    <div class="wrapper">
      <SvgIconMail 
        :width="30" 
        :height="30" 
        fill="white" />
      <h2 class="title-2">{{ $t(namespace('title')) }}</h2>
      <p class="description">{{ $t(namespace('description')) }}</p>
      <div class="input-wrapper">
        <input 
          id="component-SecondaryCtaMailingList-input" 
          v-model="email" 
          :placeholder="$t(namespace('placeholder'))" 
          class="input" 
          type="text" 
          @input="validateEmail" >
      </div>
      <button 
        :class="[emailIsValid ? '-is-valid' : '', 
                 isSubmitting ? '-is-submitting' : '',
                 justSubmitted ? '-just-submitted' : '']" 
        class="cta" 
        @click="subscribe()">{{ ctaText }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validateEmail } from '~/helpers/mixins'
import { trackNewsletterSubscribe } from '~/helpers/mixpanel'
import SvgIconMail from './SvgIconMail'

export default {
  components: {
    SvgIconMail
  },
  mixins: [validateEmail],
  data() {
    return {
      ctaText: this.$t(this.namespace('signUp')),
      email: '',
      emailIsValid: false,
      isSubmitting: false,
      justSubmitted: false,
      sourcePath: this.$route.path
    }
  },
  computed: {
    ...mapGetters(['userEntryRoute'])
  },
  methods: {
    subscribe() {
      if (this.emailIsValid && !this.isSubmitting) {
        this.ctaText = this.$t(this.namespace('submitting'))
        this.isSubmitting = true
        const data = {
          fields: {
            email: this.email
          }
        }
        if (typeof Intercom !== 'undefined') {
          data.visitorId = Intercom('getVisitorId')
        }
        this.$axios
          .post('newsletter/subscribe', data)
          .then(response => {
            this.trackNewsletterSubscribe()
            this.email = ''
            this.justSubmitted = true
            this.ctaText = this.$t(this.namespace('thanks'))
            return new Promise(resolve => {
              setTimeout(() => {
                this.emailIsValid = false
                this.isSubmitting = false
                this.justSubmitted = false
                this.ctaText = this.$t(this.namespace('signUp'))
                resolve()
              }, 5000)
            })
          })
          .catch(() => {
            this.isSubmitting = false
            this.ctaText = this.$t(this.namespace('signUp'))
            alert(
              this.$t(this.namespace('error'), {
                email: 'support@stateofthedapps.com'
              })
            )
          })
      }
    },
    trackNewsletterSubscribe() {
      const sourceComponent = 'SecondaryCtaMailingList'
      const action = trackNewsletterSubscribe(
        this.email,
        sourceComponent,
        this.sourcePath
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.cta {
  padding: 4px 75px;
  border: 1px solid lighten($color--white, 100%);
  position: relative;
  opacity: 0.4;
  transition: all 0.2s ease;
  border-radius: 3px;
  cursor: default;
  &.-is-valid {
    opacity: 1;
    cursor: pointer;
    &:active {
      top: 1px;
    }
  }
  &.-is-submitting {
    border-color: transparent;
    cursor: default;
    &:active {
      top: 0;
    }
  }
  &.-just-submitted {
    border-color: transparent;
    cursor: default;
    &:active {
      top: 0;
    }
  }
}

.component-SecondaryCtaMailingList {
  color: lighten($color--white, 100%);
  padding: 20px 0;
  overflow: hidden;
  text-align: center;
}

.description {
  margin-top: 0;
  font-size: 1.1rem;
}

.input {
  width: 100%;
  border: none;
  padding: 11px;
  text-align: center;
  background: rgba($color--black, 0.15);
  color: lighten($color--white, 100%);
  font-size: 1.05rem;
  border-radius: 4px;
  &:focus::placeholder {
    color: rgba($color--white, 0.5);
  }
  &::placeholder {
    color: lighten($color--white, 100%);
  }
}

.input-wrapper {
  width: 90%;
  max-width: 400px;
  margin: 0 auto 20px;
}

.title-2 {
  font-size: 3rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.wrapper {
  @include margin-wrapper-main;
  padding-top: 30px;
  padding-bottom: 30px;
  @include tweakpoint('min-width', 575px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
}
</style>
