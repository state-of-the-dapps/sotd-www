<template>
  <div class="wrapper">
    <div class="profile-score-wrapper">
      <h3 class="profile-score-title">Current profile strength <span class="profile-score-title-pct">{{ Math.ceil(profileScore * 100) }}%</span></h3>
      <div class="profile-score-bar">
        <div
          :style="'width: ' + Math.ceil(profileScore * 100) + '%'"
          class="profile-score-bar-pct"/>
      </div>
      <p class="profile-score-note">
        Complete <template v-if="formType === 'edit'">this ÐApp's</template><template v-else>your</template> profile to boost <template v-if="formType === 'edit'">its</template><template v-else>your</template> rank
      </p>
    </div>
    <div 
      v-if="formType === 'new'"
      class="submit-reason">
      <label 
        class="text-area-label" 
        for="submitReason">So we can better serve your needs, <strong>tell us what results you hope to achieve</strong> by submitting your ÐApp (this will not be made public).</label>
      <textarea 
        :value="submitReason" 
        class="text-area" 
        name="submitReason" 
        placeholder="I hope that..."
        @input="updateSubmitReason($event.target.value)"/>
    </div>
    <DappFormFieldsEmail
      :email="fields.email"
      :form-type="formType"
      :errors="errors.email"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <div class="checkboxes">
      <div
        v-if="formType === 'new'"
        class="checkbox-field">
        <input 
          id="subscribe-newsletter-checkbox"
          :checked="subscribeNewsletter"
          class="checkbox-input" 
          type="checkbox"
          @click="updateNewsletter">
        <label 
          class="checkbox-label" 
          for="subscribe-newsletter-checkbox">Email me (very occasional) updates</label>
      </div>
      <div class="checkbox-field">
        <input 
          id="accepted-terms-checkbox" 
          :checked="acceptedTerms" 
          class="checkbox-input" 
          type="checkbox"
          @click="updateAcceptedTerms">
        <label 
          class="checkbox-label" 
          for="accepted-terms-checkbox">I accept the&nbsp;<nuxt-link 
            to="/terms" 
            @click.native="$mixpanel.track('New DApp - Terms of Service')">Terms of Service</nuxt-link>&nbsp;<span class="required">(required)</span></label>
      </div>
      <p v-if="formType === 'new'">Submissions are free and typically processed by the next business day.</p>
    </div>
    <input 
      v-model="honeypot" 
      type="text" 
      class="yumyum">
    <input 
      v-if="formType === 'edit' && !diffExists" 
      :value="'You must edit this ÐApp before submitting'" 
      class="submit" 
      type="submit" 
      @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true, errorFields })">
    <input 
      v-else-if="errorFields.length == 1" 
      :value="'1 field needs your attention'" 
      class="submit" 
      type="submit" 
      @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true, errorFields })">
    <input 
      v-else-if="errorFields.length > 0 && errorFields.length !== 1" 
      :value="errorFields.length + ' fields require your attention'" 
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
import DappFormFieldsEmail from '~/components/DappFormFieldsEmail.vue'

export default {
  components: {
    DappFormFieldsEmail
  },
  props: {
    acceptedTerms: {
      type: Boolean,
      required: true
    },
    contractsMainnet: {
      type: Array,
      required: true
    },
    contractsKovan: {
      type: Array,
      required: true
    },
    contractsRopsten: {
      type: Array,
      required: true
    },
    contractsRinkeby: {
      type: Array,
      required: true
    },
    contractsPoaMainnet: {
      type: Array,
      required: true
    },
    contractsGoChainMainnet: {
      type: Array,
      required: true
    },
    contractsEosMainnet: {
      type: Array,
      required: true
    },
    contractsSteemMainnet: {
      type: Array,
      required: true
    },
    diffExists: {
      type: Boolean,
      required: true
    },
    errorFields: {
      type: Array,
      required: true
    },
    errors: {
      type: Object,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    formType: {
      type: String,
      required: true
    },
    profileScore: {
      type: Number,
      required: true
    },
    sending: {
      type: Boolean,
      required: true
    },
    submitReason: {
      type: String,
      required: true
    },
    subscribeNewsletter: {
      type: Boolean,
      required: true
    }
  },
  data: () => {
    return {
      profileScoreTimer: '',
      honeypot: null
    }
  },
  computed: {
    userEntryRoute() {
      return this.$store.getters['userEntryRoute']
    }
  },
  watch: {
    fields: {
      handler(fields) {
        this.setProfileScore(fields)
        this.$emit('checkFormDiff')
      },
      deep: true
    }
  },
  methods: {
    setProfileScore(fields) {
      clearTimeout(this.profileScoreTimer)
      this.profileScoreTimer = setTimeout(() => {
        // clean this up
        const data = { fields }
        data.fields.contractsMainnet = this.contractsMainnet
        data.fields.contractsPoaMainnet = this.contractsPoaMainnet
        data.fields.contractsGoChainMainnet = this.contractsGoChainMainnet
        data.fields.contractsEosMainnet = this.contractsEosMainnet
        data.fields.contractsSteemMainnet = this.contractsSteemMainnet
        this.$axios.$post('profile/score', data).then(response => {
          const score = response.score || 0
          this.$emit('setProfileScore', score)
        })
      }, 750)
    },
    submit() {
      if (this.honeypot === null) {
        const data = {
          fields: this.fields
        }
        if (typeof Intercom !== 'undefined') {
          data.visitorId = Intercom('getVisitorId')
        }
        // clean this up
        data.fields.contractsMainnet = this.contractsMainnet
        data.fields.contractsKovan = this.contractsKovan
        data.fields.contractsRopsten = this.contractsRopsten
        data.fields.contractsRinkeby = this.contractsRinkeby
        data.fields.contractsPoaMainnet = this.contractsPoaMainnet
        data.fields.contractsGoChainMainnet = this.contractsGoChainMainnet
        data.fields.contractsEosMainnet = this.contractsEosMainnet
        data.fields.contractsSteemMainnet = this.contractsSteemMainnet
        this.$emit('submit', data)
      }
    },
    updateAcceptedTerms() {
      this.$emit('updateCheckbox', 'acceptedTerms')
    },
    updateField(field, value) {
      this.$emit('updateField', field, value)
    },
    updateErrors(errors) {
      this.$emit('updateErrors', errors)
    },
    updateNewsletter() {
      this.$emit('updateCheckbox', 'subscribeNewsletter')
    },
    updateSubmitReason(value) {
      this.$emit('updateField', 'submitReason', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.attribution {
  margin: 0;
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

.profile-score-bar {
  width: 100%;
  height: 15px;
  background: $color--white;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
  border-radius: 20px;
  overflow: hidden;
}

.profile-score-bar-pct {
  height: 100%;
  background: $color--black;
  transition: all 0.2s ease;
}

.profile-score-note {
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 0.9rem;
}

.profile-score-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.profile-score-title-pct {
  font-weight: normal;
  padding-left: 5px;
}

.profile-score-wrapper {
  width: 300px;
  margin: 0 auto;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-left: 0;
    margin-right: 0;
  }
}

.text-area::placeholder {
  color: darken($color--gray, 30%);
}

.text-area-label {
  display: block;
  padding-bottom: 5px;
}

.required {
  display: inline-block;
  padding-left: 2px;
  color: $color--light-purple;
  font-weight: 600;
}

.submit {
  display: block;
  border-radius: 4px;
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
  background: darken($color--gray, 4%);
  width: 300px;
  padding: 10px;
  margin: 15px auto 0 auto;
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
  top: 10px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-left: 0;
    margin-right: 0;
  }
}

.yumyum {
  display: none;
}
</style>
