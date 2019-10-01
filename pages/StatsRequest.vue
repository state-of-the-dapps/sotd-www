<template>
  <div class="page">
    <div class="wrapper">
      <h1 class="title-1">Have a custom data request?</h1>
    </div>
    <div class="wrapper">
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
          v-model="company" 
          class="input" 
          type="text" 
          placeholder="Company name"></div>  
        <div><input 
          v-model="country" 
          class="input" 
          type="text" 
          placeholder="Your country"></div>   
        <div><textarea 
          v-model="request" 
          class="input textarea"  
          placeholder="What kind of stats data do you need?"/></div>
        <div><input 
          v-model="budget" 
          class="input" 
          type="text"
          placeholder="What is your budget (USD)?"></div> 
      </div>
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
import { validateEmail } from '~/helpers/mixins'
import BaseModal from '~/components/BaseModal'
import FormConfirmation from '~/components/FormConfirmation'

export default {
  components: {
    BaseModal,
    FormConfirmation
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
      confirmationModal: false,
      company: '',
      country: '',
      email: '',
      emailIsValid: false,
      formIsSubmitting: false,
      name: '',
      request: ''
    }
  },
  computed: {
    ...mapGetters(['userEntryRoute']),
    formIsValid() {
      let isValid = false
      if (
        this.budget &&
        this.company &&
        this.country &&
        this.email &&
        this.name &&
        this.request &&
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
        const budget = this.budget
        const company = this.company
        const country = this.country
        const email = this.email
        const name = this.name
        const request = this.request
        this.$mixpanel.track('Data request', { email, country })

        const data = {
          fields: {
            budget,
            company,
            country,
            email,
            name,
            request
          }
        }
        if (typeof Intercom !== 'undefined') {
          data.visitorId = Intercom('getVisitorId')
        }
        this.$axios
          .post('stats/request', data)
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

.textarea {
  resize: none;
  height: 150px;
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
