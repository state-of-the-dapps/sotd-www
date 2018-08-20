<template>
  <div class="component-ModalPromotedDappsNewConfirmation">
    <div v-if="!submitted" class="step-1">
      <h1 class="title-1">Request a change to {{ modalProps.dapp }}</h1>
      <div class="fields">
        <h3 class="title-3">Your name</h3>
        <div class="field"><input class="input-text" placeholder="Enter your name here" type="text" v-model="name"/></div>
        <h3 class="title-3">Your email</h3>
        <div class="field"><input class="input-text" placeholder="Enter your email here" type="text" @input="validateEmail" v-model="email"/></div>
        <h3 class="title-3">I want to...</h3>
        <div class="checkboxes">
          <div class="checkbox-field">
            <input class="checkbox-input" id="status" value="Status" type="checkbox" v-model="checkedActions">
            <label class="checkbox-label" for="status">Update the status</label>
          </div>
          <div class="checkbox-field">
            <input class="checkbox-input" id="other" value="Other" type="checkbox" v-model="checkedActions">
            <label class="checkbox-label" for="other">Update the description/author/other text</label>
          </div>
          <div class="checkbox-field">
            <input class="checkbox-input" id="links" value="Links" type="checkbox" v-model="checkedActions">
            <label class="checkbox-label" for="links">Report broken/missing link(s)</label>
          </div>
          <div class="checkbox-field">
            <input class="checkbox-input" id="tags" value="Tags" type="checkbox" v-model="checkedActions">
            <label class="checkbox-label" for="tags">Report incorrect tags</label>
          </div>
          <div class="checkbox-field">
            <input class="checkbox-input" id="contracts" value="Contracts" type="checkbox" v-model="checkedActions">
            <label class="checkbox-label" for="contracts">Add / update contract addresses</label>
          </div>
          <div class="checkbox-field">
            <input class="checkbox-input" id="image" value="Image" type="checkbox" v-model="checkedActions">
            <label class="checkbox-label" for="image">Add logo / icon / image URLs (<a href="https://d3colfu6jphe2a.cloudfront.net/image_guidelines_08152018.png" target="_blank">view image guidelines here</a>)</label>
          </div>
          <div class="checkbox-field">
            <input class="checkbox-input" id="flag" value="Flag" type="checkbox" v-model="checkedActions">
            <label class="checkbox-label" for="flag">Flag this DApp as inappropriate</label>
          </div>
        </div>
        <br>
        <h3 class="title-3">Tell us what should be changed on {{ modalProps.dapp }}</h3>
        <div class="field"><textarea class="input-textarea" placeholder="Enter your suggestions here" v-model="suggestions"/></div>
      </div>
      <p class="cta-wrapper"><button @click="close" class="button -cancel">Cancel</button> <button :class="emailIsValid ? '' : 'not-ready'" class="cta" @click="submit">Submit <span v-if="!emailIsValid">(enter a valid email first)</span></button></p>
    </div>
    <div v-if="submitted " class="step-2">
      <h1 class="title-1">Thanks!</h1>
      <p class="message">We will review the changes and be in touch if we have any questions.</p>
      <p class="cta-wrapper"><button class="cta" @click="close">OK</button></p>
    </div>
  </div>
</template>

<script>
import axios from '~/helpers/axios'
import { mapGetters } from 'vuex'
import { setUser, trackDappEditSubmit } from '~/helpers/mixpanel'
import { validateEmail } from '~/helpers/mixins'

export default {
  data () {
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
    ...mapGetters([
      'userEntryRoute'
    ])
  },
  props: ['modalProps'],
  methods: {
    close () {
      const modal = {
        component: '',
        mpData: {},
        props: {}
      }
      this.$store.dispatch('setSiteModal', modal)
    },
    submit () {
      if (this.emailIsValid) {
        axios
          .put(`dapps/${this.modalProps.slug}`, {
            fields: {
              checkedActions: this.checkedActions,
              email: this.email,
              name: this.name,
              dapp: this.modalProps.dapp,
              path: this.modalProps.path,
              suggestions: this.suggestions
            }
          })
          .then(response => {})
        this.submitted = true
        const action = trackDappEditSubmit(this.checkedActions, this.email, this.modalProps.slug)
        this.$mixpanel.track(action.name, action.data)
        const hasWeb3 = typeof web3 !== 'undefined'
        const lastUpdated = new Date().toISOString()
        const user = setUser(this.email, hasWeb3, lastUpdated, this.userEntryRoute)
        this.$mixpanel.setUser(user)
      }
    }
  },
  mixins: [validateEmail],
  mounted () {
    this.checkedActions = this.modalProps.checked
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
      transition: transform .1s ease;
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
  box-shadow: 0 5px 20px rgba($color--black, .2);
  transition: opacity .2s ease;
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
