<template>
  <div class="PromotedDapps">
    <div class="wrapper">
      <h1 class="title-1">How do I add my DApp platform?</h1>
    </div>
    <!-- <div class="preview-wrapper">
      <img 
        class="preview" 
        src="~/assets/images/platforms.png" 
        width="1200">
    </div> -->
    <div class="wrapper">
      <div class="get-started-note">
        Please note: We use a high level of discretion when considering requests for new platforms.<br><br>
        <strong>Acceptance criteria for new platform includes:</strong>
        <ul>
          <li>Public DApp platform with smart contract capability</li>
          <li>Mainnet launched</li>
          <li>Decentralized nodes operated by separate parties</li>
          <li>Open source codebase</li>
          <li>At least 10 DApps live</li>
          <li>Block explorer that can link to individual contracts</li>
        </ul>
      </div>
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
          v-model="platform" 
          class="input" 
          type="text" 
          placeholder="Platform name"></div>  
        <div><input 
          v-model="website" 
          class="input" 
          type="text" 
          placeholder="Platform website"></div>
        <div><input 
          v-model="association" 
          class="input" 
          type="text" 
          placeholder="How are you associated with the platform?"></div> 
      </div>
      <div class="send-wrapper"><button 
        :class="formIsValid ? '--is-ready' : ''" 
        class="send" 
        @click="send"><span v-if="formIsValid || formIsSubmitting">Send</span><span v-else>Please fill out all fields</span></button></div>
    </div>
    <BaseModal v-if="confirmationModal">
      <ModalPromotedDappsNewConfirmation :has-submitted-dapp="hasSubmittedDapp"/>
    </BaseModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validateEmail } from '~/helpers/mixins'
import BaseModal from '~/components/BaseModal'
import ModalPromotedDappsNewConfirmation from '~/components/ModalPromotedDappsNewConfirmation'
import PromotedDapps from '~/components/PromotedDapps'

export default {
  components: {
    BaseModal,
    ModalPromotedDappsNewConfirmation,
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
      association: '',
      confirmationModal: false,
      country: '',
      email: '',
      emailIsValid: false,
      formIsSubmitting: false,
      name: '',
      platform: '',
      website: ''
    }
  },
  computed: {
    ...mapGetters(['userEntryRoute']),
    formIsValid() {
      let isValid = false
      if (
        this.association &&
        this.website &&
        this.country &&
        this.email &&
        this.platform &&
        this.name &&
        this.emailIsValid &&
        !this.formIsSubmitting
      ) {
        isValid = true
      }
      return isValid
    }
  },
  methods: {
    send() {
      if (this.formIsValid && !this.formIsSubmitting) {
        this.formIsSubmitting = true
        const association = this.association
        const website = this.website
        const country = this.country
        const email = this.email
        const platform = this.platform
        const name = this.name
        this.$mixpanel.track('Platform request', { platform, email, country })

        const data = {
          fields: {
            association,
            website,
            country,
            platform,
            email,
            name
          }
        }
        if (typeof Intercom !== 'undefined') {
          data.visitorId = Intercom('getVisitorId')
        }
        this.$axios
          .post('platforms', data)
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
  ul {
    margin-top: 10px;
    margin-left: 25px;
  }
  li {
    list-style-type: disc;
    margin: 5px 0;
  }
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
  padding-bottom: 25px;
}
</style>
