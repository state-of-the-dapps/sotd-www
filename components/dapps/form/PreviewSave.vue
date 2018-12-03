<template>
  <div class="wrapper">
    <div class="item -preview">
      <div class="info">
        <div class="description-wrapper">
          <h3 
            class="title" 
            @click="$mixpanel.track('New DApp - Preview title')"><span v-if="name">{{ name | truncate(25) }}</span><span v-else>Your ÐApp</span></h3>
          <p 
            class="attribution" 
            @click="$mixpanel.track('New DApp - Preview author')">by <strong><span v-if="authors.length > 0">{{ authors[0] }}</span><span v-else>the founder</span></strong><span v-if="authors.length > 1"> +{{ authors.length - 1 }}</span></p>
          <p 
            class="description" 
            @click="$mixpanel.track('New DApp - Preview teaser')"><span v-if="teaser">{{ teaser | truncate(75) }}</span><span v-else>Teaser description</span></p>
        </div>
      </div>
    </div>
    <div class="submit-reason">
      <label 
        class="text-area-label" 
        for="submitReason">So we can better serve your needs, <strong>tell us what results you hope to achieve</strong> by submitting your ÐApp (this will not be made public).</label>
      <textarea 
        v-model="submitReason" 
        class="text-area" 
        name="submitReason" 
        placeholder="I hope that..."/>
    </div>
    <div class="checkboxes">
      <div class="checkbox-field">
        <input 
          id="subscribe-newsletter-checkbox" 
          v-model="subscribeNewsletter" 
          class="checkbox-input" 
          type="checkbox">
        <label 
          class="checkbox-label" 
          for="subscribe-newsletter-checkbox">Email me (very occasional) updates</label>
      </div>
      <div class="checkbox-field">
        <input 
          id="accepted-terms-checkbox" 
          v-model="acceptedTerms" 
          class="checkbox-input" 
          type="checkbox">
        <label 
          class="checkbox-label" 
          for="accepted-terms-checkbox">I accept the&nbsp;<nuxt-link 
            to="/terms" 
            @click.native="$mixpanel.track('New DApp - Terms of Service')">Terms of Service</nuxt-link>&nbsp;<span class="required">(required)</span></label>
      </div>
    </div>
    <input 
      v-model="honeypot" 
      type="text" 
      class="yumyum">
    <input 
      v-if="errorFields.length == 1" 
      :value="'1 field needs your attention'" 
      class="submit" 
      type="submit" 
      @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true, errorFields })">
    <input 
      v-else-if="errorFields.length > 0 && errorFields.length !== 1" 
      :value="errorFields.length + ' fields need your attention'" 
      class="submit" 
      type="submit" 
      @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true, errorFields })">
    <input 
      v-else-if="sending" 
      :value="'Please wait'" 
      class="submit" 
      type="submit" 
      @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true })">
    <input 
      v-else-if="errorFields.length == 0" 
      :value="'Submit'" 
      class="submit --is-ready" 
      type="submit" 
      @click.prevent="submit">
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      sending: false,
      honeypot: null
    }
  },
  computed: {
    authors() {
      return this.$store.getters['dapps/form/authors']
    },
    contractsMainnet() {
      return this.$store.getters['dapps/form/contractsMainnet']
    },
    contractsKovan() {
      return this.$store.getters['dapps/form/contractsKovan']
    },
    contractsRopsten() {
      return this.$store.getters['dapps/form/contractsRopsten']
    },
    contractsRinkeby() {
      return this.$store.getters['dapps/form/contractsRinkeby']
    },
    contractsPoaMainnet() {
      return this.$store.getters['dapps/form/contractsPoaMainnet']
    },
    contractsPoaTestnet() {
      return this.$store.getters['dapps/form/contractsPoaTestnet']
    },
    contractsEosMainnet() {
      return this.$store.getters['dapps/form/contractsEosMainnet']
    },
    errorFields() {
      return this.$store.getters['dapps/form/errorFields']
    },
    fields() {
      return this.$store.getters['dapps/form/fields']
    },
    name() {
      return this.$store.getters['dapps/form/name']
    },
    submitReason: {
      get() {
        return this.$store.getters['dapps/form/submitReason']
      },
      set(value) {
        const field = {
          name: 'submitReason',
          value: value
        }
        this.$store.dispatch('dapps/form/setField', field)
      }
    },
    subscribeNewsletter: {
      get() {
        return this.$store.getters['dapps/form/subscribeNewsletter']
      },
      set() {
        this.$store.dispatch('dapps/form/toggleCheckbox', 'subscribeNewsletter')
      }
    },
    status() {
      return this.$store.getters['dapps/form/status']
    },
    teaser() {
      return this.$store.getters['dapps/form/teaser']
    },
    acceptedTerms: {
      get() {
        return this.$store.getters['dapps/form/acceptedTerms']
      },
      set() {
        this.$store.dispatch('dapps/form/toggleCheckbox', 'acceptedTerms')
        if (this.acceptedTerms === false) {
          this.$store.dispatch('dapps/form/addErrorField', 'acceptedTerms')
        } else {
          this.$store.dispatch('dapps/form/removeErrorField', 'acceptedTerms')
        }
      }
    },
    userEntryRoute() {
      return this.$store.getters['userEntryRoute']
    }
  },
  methods: {
    submit() {
      if (this.honeypot === null) {
        const data = {
          fields: this.fields
        }
        if (typeof Intercom !== 'undefined') {
          data.visitorId = Intercom('getVisitorId')
        }
        data.fields.contractsMainnet = this.contractsMainnet
        data.fields.contractsKovan = this.contractsKovan
        data.fields.contractsRopsten = this.contractsRopsten
        data.fields.contractsRinkeby = this.contractsRinkeby
        data.fields.contractsPoaMainnet = this.contractsPoaMainnet
        data.fields.contractsPoaTestnet = this.contractsPoaTestnet
        data.fields.contractsEosMainnet = this.contractsEosMainnet
        this.sending = true
        this.$axios
          .post('dapps', data)
          .then(response => {
            this.sending = false
            this.$mixpanel.setUser({
              $email: this.fields.email,
              $name: this.fields.authors,
              hasWeb3: typeof web3 !== 'undefined',
              lastUpdated: new Date().toISOString(),
              lastDappSubmitted: this.fields.name,
              lastSessionEntryRoute: this.userEntryRoute
            })
            this.$mixpanel.track('New DApp - Submit', {
              disabled: false,
              name: this.fields.name,
              email: this.fields.email,
              author: this.fields.author,
              subscribeNewsletter: this.fields.subscribeNewsletter
            })
            const modal = {
              component: 'ModalDappsNewConfirmation',
              mpData: {},
              props: {}
            }
            this.$store.dispatch('setSiteModal', modal)
            this.$store.dispatch('dapps/form/resetForm')
          })
          .catch(error => {
            alert(error.response.data.message)
            this.sending = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.attribution {
  margin: 0;
}

.badge-item {
  margin-left: 2px;
}

.badge-list {
  position: absolute;
  display: flex;
  right: 10px;
  top: -2px;
  z-index: 8;
}

.checkboxes {
  margin: 12px auto 0;
  width: 300px;
  @include tweakpoint('min-width', 900px) {
    margin-left: 0;
  }
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

.description {
  margin: 0;
  @include tweakpoint('min-width', 900px) {
    margin-top: 10px;
  }
}

.description-wrapper {
  flex-grow: 1;
}

.info {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  @include tweakpoint('min-width', 900px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
}

.item {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  height: 150px;
  margin: 0 10px 10px 10px;
  background: white;
  box-shadow: 0 0 20px rgba($color--black, 0.1);
  transition: background 0.2s ease, opacity 0.4s ease;
  @include tweakpoint('min-width', 750px) {
    width: calc(50% - 20px);
  }
  @include tweakpoint('min-width', 900px) {
    width: calc(33.33% - 20px);
    justify-content: center;
  }
  @include tweakpoint('min-width', 1000px) {
    width: calc(25% - 20px);
  }
  @include tweakpoint('min-width', 1150px) {
    width: calc(20% - 20px);
  }
  @include tweakpoint('min-width', 1450px) {
    width: calc(16.66667% - 20px);
  }
  @include tweakpoint('min-width', 1750px) {
    width: calc(14.2857142857% - 20px);
  }
  &:hover {
    cursor: pointer;
    transform: scale3d(1.015, 1.015, 1);
  }
  &.-live {
    background: $color--dapp-live-light;
  }
  &.-beta {
    background: $color--dapp-beta-light;
  }
  &.-prototype {
    background: $color--dapp-prototype-light;
  }
  &.-wip {
    background: $color--dapp-wip-light;
  }
  &.-concept {
    background: $color--dapp-concept-light;
  }
  &.-stealth {
    background: $color--dapp-stealth-light;
  }
  &.-abandoned,
  &.-unknown {
    background: $color--dapp-abandoned-light;
    &:after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(white, 0.7);
      pointer-events: none;
    }
  }
  &.-preview {
    width: 300px;
    margin: 0 auto;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-left: 0;
    }
    &:hover {
      transform: none;
      cursor: default;
    }
  }
  &.--unfocused {
    opacity: 0.6;
  }
}

.text-area-label {
  display: block;
  padding-bottom: 5px;
}

.new-banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 47px;
  height: 47px;
  background: url('~assets/images/ribbon.png') top left no-repeat;
  background-size: 47px 47px;
  margin: 0;
  z-index: 5;
}

.new-message {
  color: $color--gray;
  display: inline-block;
  font-size: 0.7rem;
  text-transform: uppercase;
  margin-top: 6px;
  margin-left: 6px;
  transition: color 0.2s ease;
  &.-live {
    color: $color--dapp-live-light;
  }
  &.-beta {
    color: $color--dapp-beta-light;
  }
  &.-prototype {
    color: $color--dapp-prototype-light;
  }
  &.-wip {
    color: $color--dapp-wip-light;
  }
  &.-concept {
    color: $color--dapp-concept-light;
  }
  &.-inactive {
    color: $color--dapp-unknown-light;
  }
}

.required {
  display: inline-block;
  padding-left: 2px;
  color: $color--error;
}

.status {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 10px 5px;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 700;
  transition: border 0.2s ease;
  color: rgba($color--black, 0.75);
  &.-live {
    background: $color--dapp-live;
  }
  &.-beta {
    background: $color--dapp-beta;
  }
  &.-prototype {
    background: $color--dapp-prototype;
  }
  &.-wip {
    background: $color--dapp-wip;
  }
  &.-concept {
    background: $color--dapp-concept;
  }
}

.submit {
  display: block;
  margin: 0 auto;
  width: 300px;
  margin-top: 15px;
  border: none;
  background: rgba($color--black, 0.1);
  color: $color--black;
  font-size: 1rem;
  font-weight: 600;
  padding: 15px;
  position: relative;
  transition: all 0.5s ease;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-left: 0;
    margin-right: 0;
  }
  &.--is-ready {
    background: rgba($color--black, 1);
    box-shadow: 0 17px 70px rgba($color--black, 0.3);
    color: $color--gray;
    &:hover {
      cursor: pointer;
    }
    &:active {
      top: 1px;
    }
  }
}

.submit-reason {
  width: 300px;
  padding-top: 15px;
  margin: 0 auto;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-left: 0;
    margin-right: 0;
  }
}

.title {
  margin: 0;
  font-size: 1.5rem;
}

.text-area {
  width: 100%;
  height: 60px;
  resize: none;
  padding: 10px;
  border: none;
  margin-top: 5px;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
}

.url {
  width: 300px;
}

.wrapper {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 1px;
  position: sticky;
  top: 19px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-left: 0;
    margin-right: 0;
  }
}

.yumyum {
  display: none;
}
</style>
