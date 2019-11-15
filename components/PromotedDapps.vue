<template>
  <div class="PromotedDapps">
    <div class="wrapper">
      <h1 class="title-1">Promote your DApp to attract more users</h1>
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
      <p class="package-option">
        To promote your DApp you can choose between these three packages:
      </p>
      <p class="package-option">
        <b>Option 1:</b>
        Featured DApp on our homepage with a shared spot (rotating between 10 dapps max).<br>
        <i>30 days for EUR 500 (~ USD 550)</i>
      </p>
      <p class="package-option">
        <b>Option 2:</b>
        Featured DApp on our homepage, exclusive spot.<br>
        <i>7 days for EUR 1000 (~ USD 1100)</i>
      </p>
      <p class="package-option">
        <b>Option 3:</b>
        Featured DApp on our homepage, exclusive spot.<br>
        <i>14 days for EUR 1667 (~ USD 1834)</i>
      </p>
      <p class="package-option">
        By promoting your DApp you will benefit from an estimated traffic of 110K visits per month (source: SimilarWeb, May 2019).
        Featured DApps on State of the DApps typically see a CTR (Click Through Rate) between 4 and 11% to your DApp details page.
        The details page of featured DApps has a CTR of over 55% to your DApp website (and/or social media accounts).
        Our CTR is very high, compared to the industry average CTR of 1.91% for a search ad, and 0.35% for a display ad.
      </p>
    </div>
    <div class="wrapper">
      <h2
        ref="getStartedEl"
        class="title-2">Get started now!</h2>
      <p class="get-started-note">Please note: We do not accept promotion requests for gambling DApps, or DApps that are ponzi or pyramid schemes.</p>
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
          v-model="dapp"
          class="input"
          type="text"
          placeholder="Your DApp's name"></div>
        <div>
          <select
            v-model="option"
            class="input">
            <option
              disabled
              value="">Please select promotion package</option>
            <option>30 days shared for EUR 500 (~ USD 550)</option>
            <option>7 days exclusive for EUR 1000 (~ USD 1100)</option>
            <option>14 days exclusive for EUR 1667 (~ USD 1834)</option>
          </select>
        </div>
        <div class="submitted-wrapper">
          Is this DApp already listed on this website?
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
          placeholder="Your DApp's website"></div>
      </div>
      <p class="disclaimer">Don't worry, by pressing "send" you're not committing yet. Your request will be reviewed and then we'll be in touch about payment options and next steps.</p>
      <div class="send-wrapper"><button
        :class="formIsValid ? '--is-ready' : ''"
        class="send"
        @click="send"><span v-if="formIsValid || formIsSubmitting">Send</span><span v-else>Please fill out all fields</span></button></div>
    </div>
    <BaseModal v-if="confirmationModal">
      <FormConfirmation :has-submitted-dapp="hasSubmittedDapp"/>
    </BaseModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  trackPromotedDappSubmit,
  trackPromotedDappsView
} from '~/helpers/mixpanel'
import { validateEmail } from '~/helpers/mixins'
import BaseModal from '~/components/BaseModal'
import FormConfirmation from '~/components/FormConfirmation'
import PromotedDapps from '~/components/PromotedDapps'

export default {
  components: {
    BaseModal,
    FormConfirmation,
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
      option: '',
      confirmationModal: false,
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
        this.option &&
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
        const option = this.option
        const email = this.email
        const dapp = this.dapp
        const name = this.name
        const hasSubmittedDapp = this.hasSubmittedDapp
        const website = this.website

        const action = trackPromotedDappSubmit(dapp, email, hasSubmittedDapp)
        this.$mixpanel.track(action.name, action.data)

        const data = {
          fields: {
            option,
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
            this.confirmationModal = true
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
.description {
  text-align: center;
  font-size: 1.2rem;
  max-width: 500px;
  margin: 0 auto;
}

.package-option {
  text-align: justify;
  font-size: 1.2rem;
  max-width: 500px;
  padding-top: 10px;
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
  border-radius: 1000px;
}

.get-started-note {
  max-width: 300px;
  margin: 0 auto;
}

.preview-wrapper {
  text-align: center;
}

.preview {
  max-width: 100%;
  display: block;
  margin: 0 auto;
  box-shadow: 0 10px 50px rgba($color--black, 0.2);
}

.input {
  border: none;
  background: rgba($color--white, 0.9);
  width: 100%;
  height: 32px;
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
  border-radius: 1000px;
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
  @include title-1;
  font-size: 3rem;
  text-transform: initial;
  text-align: center;
  margin-bottom: 0.75rem;
}

.title-2 {
  @include title-2;
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
