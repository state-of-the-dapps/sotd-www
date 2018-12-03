<template>
  <div class="component-PropmotedDapps">
    <div class="wrapper">
      <h1 class="title-1">Promote your ÐApp to attract more users</h1>
      <p class="description">{{ description }}</p>
      <div class="get-started-wrapper"><button 
        class="get-started" 
        @click="getStarted">Get started</button></div>
    </div>
    <div class="preview-wrapper">
      <img 
        class="preview" 
        src="~/assets/images/promoted-preview.jpg" 
        width="1200">
    </div>
    <div class="wrapper">
      <h2 
        ref="getStartedEl" 
        class="title-2">Get started now!</h2>
      <p class="get-started-note">Please note: We do not accept promotion requests for gambling ÐApps, or ÐApps that are ponzi or pyramid schemes.</p>
      <div class="fields">
        <div><input 
          ref="name" 
          v-model="name" 
          class="input" 
          type="text" 
          placeholder="Your name"></div>
        <div><input 
          v-model="email" 
          class="input" 
          type="text" 
          placeholder="Your email" 
          @input="validateEmail"></div>
        <div><input 
          v-model="country" 
          class="input" 
          type="text" 
          placeholder="Your country"></div>   
        <div><input 
          v-model="dapp" 
          class="input" 
          type="text" 
          placeholder="Your ÐApp's name"></div>  
        <div><input 
          v-model="budget" 
          class="input" 
          type="text" 
          placeholder="Daily budget (USD)"></div>
        <div class="submitted-wrapper">
          Is this ÐApp already listed on this website?
          <p>
            <button 
              :class="hasSubmittedDapp == 'yes' ? '--active' : ''" 
              class="selection" 
              @click="selectSubmittedDapp('yes')">Yes</button>
            <button 
              :class="hasSubmittedDapp == 'no' ? '--active' : ''" 
              class="selection" 
              @click="selectSubmittedDapp('no')">No</button>
          </p>
        </div>
        <div v-if="hasSubmittedDapp === 'no'"><input 
          v-model="website" 
          class="input" 
          type="text" 
          placeholder="Your ÐApp's website"></div>
      </div>
      <p class="disclaimer">Don't worry, by pressing "send" you're not committing yet. Your request will be reviewed and then we'll be in touch about payment options and next steps.</p>
      <div class="send-wrapper"><button 
        :class="formIsValid ? '--is-ready' : ''" 
        class="send" 
        @click="send"><span v-if="formIsValid || formIsSubmitting">Send</span><span v-else>Please fill out all fields</span></button></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  setUser,
  trackPromotedDappSubmit,
  trackPromotedDappsView
} from '~/helpers/mixpanel'
import { validateEmail } from '~/helpers/mixins'
import PromotedDapps from '~/components/PromotedDapps'

export default {
  components: {
    PromotedDapps
  },
  mixins: [validateEmail],
  props: {
    description: {
      type: String,
      default: ''
    },
    directView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      budget: '',
      country: '',
      dapp: '',
      email: '',
      emailIsValid: false,
      formIsSubmitting: false,
      name: '',
      hasSubmittedDapp: '',
      website: ''
    }
  },
  computed: {
    ...mapGetters(['userEntryRoute']),
    formIsValid() {
      let isValid = false
      if (
        this.budget &&
        this.country &&
        this.email &&
        this.dapp &&
        this.name &&
        this.hasSubmittedDapp &&
        this.emailIsValid &&
        !this.formIsSubmitting
      ) {
        isValid = true
      }
      return isValid
    }
  },
  mounted() {
    this.$store.dispatch('setSiteSection', 'dapps')
    if (this.directView) {
      const sourceComponent = ''
      const sourcePath = ''
      const action = trackPromotedDappsView(
        sourceComponent,
        sourcePath,
        this.userEntryRoute
      )
      this.$mixpanel.track(action.name, action.data)
    }
  },
  methods: {
    getStarted() {
      this.$mixpanel.track('Promoted DApps - Get Started')
      this.$refs.getStartedEl.scrollIntoView()
    },
    selectSubmittedDapp(selection) {
      this.hasSubmittedDapp = selection
    },
    send() {
      if (this.formIsValid && !this.formIsSubmitting) {
        this.formIsSubmitting = true
        const budget = this.budget
        const country = this.country
        const email = this.email
        const dapp = this.dapp
        const name = this.name
        const hasSubmittedDapp = this.hasSubmittedDapp
        const website = this.website

        const action = trackPromotedDappSubmit(dapp, email, hasSubmittedDapp)
        this.$mixpanel.track(action.name, action.data)

        const hasWeb3 = typeof web3 !== 'undefined'
        const lastUpdated = new Date().toISOString()
        const user = setUser(
          this.email,
          hasWeb3,
          lastUpdated,
          this.userEntryRoute
        )
        this.$mixpanel.setUser(user)

        const data = {
          fields: {
            budget,
            country,
            dapp,
            email,
            name,
            hasSubmittedDapp,
            website
          }
        }
        if (typeof Intercom !== 'undefined') {
          data.visitorId = Intercom('getVisitorId')
        }
        this.$axios
          .post('promoted/dapps', data)
          .then(response => {
            const modal = {
              component: 'ModalPromotedDappsNewConfirmation',
              mpData: {},
              props: {
                hasSubmittedDapp: this.hasSubmittedDapp
              }
            }
            this.$store.dispatch('setSiteModal', modal)
          })
          .catch(error => {
            this.formIsSubmitting = false
            console.log(error)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  text-align: center;
  font-size: 1.2rem;
  max-width: 500px;
  margin: 0 auto;
}

.disclaimer {
  max-width: 300px;
  margin: 0 auto 10px;
}

.fields {
  text-align: center;
  max-width: 300px;
  margin: 20px auto 25px;
}

.get-started-wrapper {
  text-align: center;
  margin: 20px 0;
}

.get-started {
  background: $color--black;
  color: $color--white;
  padding: 8px 30px;
}

.get-started-note {
  max-width: 300px;
  margin: 0 auto;
}

.preview-wrapper {
  margin-top: 20px;
  text-align: center;
  background: rgba($color--black, 0.075);
}

.preview {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.input {
  border: none;
  background: rgba($color--white, 0.9);
  width: 100%;
  padding: 10px 5px;
  margin-bottom: 8px;
  text-align: center;
}

.selection {
  display: inline-block;
  padding: 5px 10px;
  margin: 0 2px;
  background: rgba($color--white, 0.9);
  width: 45px;
  text-align: center;
  transition: all 0.1s ease;
  &:hover {
    background: rgba($color--black, 0.1);
  }
  &.--active {
    background: $color--black;
    color: $color--white;
  }
}

.send {
  width: 100%;
  max-width: 300px;
  background: rgba($color--black, 0.15);
  text-transform: uppercase;
  font-size: 0.9rem;
  padding: 12px 0;
  cursor: default;
  transition: all 0.2s ease;
  font-weight: 700;
  &.--is-ready {
    color: $color--white;
    background: $color--black;
    box-shadow: 0 17px 70px rgba($color--black, 0.4);
    cursor: pointer;
  }
}

.send-wrapper {
  text-align: center;
  margin-bottom: 50px;
}

.submitted-wrapper {
  padding-top: 15px;
}

.title-1 {
  font-size: 3rem;
  text-transform: initial;
  text-align: center;
  margin-bottom: 0.75rem;
}

.title-2 {
  font-size: 2.65rem;
  text-transform: initial;
  text-align: center;
  margin-bottom: 0;
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
  padding-top: 25px;
  padding-bottom: 25px;
}
</style>
