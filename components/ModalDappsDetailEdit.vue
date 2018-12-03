<template>
  <div class="component-ModalPromotedDappsNewConfirmation">
    <div 
      v-if="!submitted" 
      class="step-1">
      <h1 class="title-1">Request a change to {{ modalProps.dapp }}</h1>
      <div class="fields">
        <h3 class="title-3">Your name <span class="required">required</span></h3>
        <div class="field"><input 
          v-model="name" 
          class="input-text" 
          placeholder="Enter your name here" 
          type="text"></div>
        <h3 class="title-3">Your email <span class="required">required</span></h3>
        <div class="field"><input 
          v-model="email" 
          class="input-text" 
          placeholder="Enter your email here" 
          type="text" 
          @input="validateEmail"></div>
        <h3 class="title-3">I want to...</h3>
        <div class="checkboxes">
          <div class="checkbox-field">
            <input 
              id="status" 
              v-model="checkedActions" 
              class="checkbox-input" 
              value="Status" 
              type="checkbox">
            <label 
              class="checkbox-label" 
              for="status">Update the status</label>
          </div>
          <div class="checkbox-field">
            <input 
              id="other" 
              v-model="checkedActions" 
              class="checkbox-input" 
              value="Other" 
              type="checkbox">
            <label 
              class="checkbox-label" 
              for="other">Update the description/author/other text</label>
          </div>
          <div class="checkbox-field">
            <input 
              id="links" 
              v-model="checkedActions" 
              class="checkbox-input" 
              value="Links" 
              type="checkbox">
            <label 
              class="checkbox-label" 
              for="links">Report broken/missing link(s)</label>
          </div>
          <div class="checkbox-field">
            <input 
              id="tags" 
              v-model="checkedActions" 
              class="checkbox-input" 
              value="Tags" 
              type="checkbox">
            <label 
              class="checkbox-label" 
              for="tags">Report incorrect tags</label>
          </div>
          <div class="checkbox-field">
            <input 
              id="contracts" 
              v-model="checkedActions" 
              class="checkbox-input" 
              value="Contracts" 
              type="checkbox">
            <label 
              class="checkbox-label" 
              for="contracts">Add / update contract addresses</label>
          </div>
          <div class="checkbox-field">
            <input 
              id="image" 
              v-model="checkedActions" 
              class="checkbox-input" 
              value="Image" 
              type="checkbox">
            <label 
              class="checkbox-label" 
              for="image">Add logo / icon / image URLs (<a 
                href="https://cdn.stateofthedapps.com/image_guidelines_08152018.png"
                target="_blank">view image guidelines here</a>)</label>
          </div>
          <div class="checkbox-field">
            <input 
              id="flag" 
              v-model="checkedActions" 
              class="checkbox-input" 
              value="Flag" 
              type="checkbox">
            <label 
              class="checkbox-label" 
              for="flag">Flag this DApp as inappropriate</label>
          </div>
        </div>
        <br>
        <h3 class="title-3">Tell us what should be changed on {{ modalProps.dapp }}  <span class="required">required</span></h3>
        <div class="field"><textarea 
          v-model="suggestions" 
          class="input-textarea" 
          placeholder="Enter your suggestions here"/></div>
      </div>
      <p class="cta-wrapper"><button 
        class="button -cancel" 
        @click="close">Cancel</button> <button 
          :class="formIsValid ? '' : 'not-ready'" 
          class="cta" 
          @click="submit">Submit</button></p>
    </div>
    <div 
      v-if="submitted " 
      class="step-2">
      <h1 class="title-1">Thanks!</h1>
      <p class="message">We will review the changes and be in touch if we have any questions.</p>
      <p class="cta-wrapper"><button 
        class="cta" 
        @click="close">OK</button></p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setUser, trackDappEditSubmit } from '~/helpers/mixpanel'
import { validateEmail } from '~/helpers/mixins'

export default {
  mixins: [validateEmail],
  props: {
    modalProps: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checkedActions: [],
      email: '',
      emailIsValid: false,
      name: '',
      sourcePath: this.$route.path,
      submitted: false,
      suggestions: ''
    }
  },
  computed: {
    ...mapGetters(['userEntryRoute']),
    formIsValid() {
      return this.emailIsValid && this.name.length && this.suggestions.length
    }
  },
  mounted() {
    this.checkedActions = this.modalProps.checked
  },
  methods: {
    close() {
      const modal = {
        component: '',
        mpData: {},
        props: {}
      }
      this.$store.dispatch('setSiteModal', modal)
    },
    submit() {
      if (this.formIsValid) {
        const data = {
          fields: {
            checkedActions: this.checkedActions,
            email: this.email,
            name: this.name,
            dapp: this.modalProps.dapp,
            path: this.modalProps.path,
            suggestions: this.suggestions
          }
        }
        if (typeof Intercom !== 'undefined') {
          data.visitorId = Intercom('getVisitorId')
        }
        this.$axios
          .put(`dapps/${this.modalProps.slug}`, data)
          .then(response => {})
        this.submitted = true
        const action = trackDappEditSubmit(
          this.checkedActions,
          this.email,
          this.modalProps.slug
        )
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.button {
  &.-cancel {
    padding: 20px;
  }
}

.checkboxes {
  margin: 12px 0 0 0;
  width: 500px;
}

.checkbox-field {
  margin-top: 9px;
  display: flex;
}

.checkbox-input {
  display: none;
  position: relative;
  &:checked + .checkbox-label:after {
    transform: scale(1);
  }
}

.checkbox-label {
  padding-left: 22px;
  position: relative;
  display: flex;
  &:before {
    cursor: pointer;
    content: '';
    display: block;
    width: 13px;
    height: 13px;
    border: 1px solid $color--black;
    position: absolute;
    top: 1px;
    left: 0;
  }
  &:after {
    cursor: pointer;
    content: '';
    display: block;
    background: $color--black;
    transition: transform 0.1s ease;
    transform: scale(0);
    width: 9px;
    height: 9px;
    position: absolute;
    top: 3px;
    left: 2px;
  }
}

.cta {
  background: $color--black;
  color: $color--white;
  padding: 12px 50px;
  box-shadow: 0 5px 20px rgba($color--black, 0.2);
  transition: opacity 0.2s ease;
  cursor: pointer;
  &.not-ready {
    opacity: 0.3;
  }
}

.cta-wrapper {
  padding-top: 20px;
  margin-bottom: 0;
}

.field {
  text-align: left;
}

.input-text {
  @include form-input-text;
  display: block;
  background: lighten($color--white, 100%);
  text-align: left;
  padding: 10px;
  max-width: 300px;
  margin-left: 0;
  margin-right: 0;
}

.input-textarea {
  @include form-input-text;
  text-align: left;
  padding: 10px;
  background: lighten($color--white, 100%);
}

.message {
  font-size: 1.1rem;
}

.required {
  color: $color--required;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  top: -5px;
}

.title-1 {
  font-size: 3rem;
  text-transform: initial;
  margin: 0;
}

.title-3 {
  @include title-3;
  text-align: left;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}
</style>
