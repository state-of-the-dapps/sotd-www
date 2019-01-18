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
          id="acceptedTerms" 
          class="checkbox-label" 
          for="accepted-terms-checkbox">I accept the&nbsp;<nuxt-link 
            to="/terms" 
            @click.native="$mixpanel.track('New DApp - Terms of Service')">Terms of Service</nuxt-link>&nbsp;<span class="required">(required)</span></label>
      </div>
      <p v-if="formType === 'new'">Submissions are free and typically processed by the next business day.</p>
    </div>
    <div class="input-wrapper">
      <BasePopover
        v-on-clickaway="hideMissingFields"
        v-if="popoverIsActive && missingFields.length">
        <ul class="missing-fields-list">
          <li
            v-for="(field, index) in missingFields"
            :key="index"
            class="missing-fields-item">
            <span
              class="missing-fields-anchor"
              role="link"
              @click="goToField(field.anchor)">{{ field.label }}</span>
          </li>
        </ul>
      </BasePopover>
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
        v-else-if="errorFields.length > 0"
        :value="`${errorFields.length} ${$options.filters.pluralize('field', errorFields.length)} ${errorFields.length > 1 ? 'require' : 'requires' } your attention`"
        class="submit has-missing-fields"
        type="submit"
        @click.prevent="showMissingFields">
      <input 
        v-else-if="sending" 
        :value="'Please wait'" 
        class="submit" 
        type="submit" 
        @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true })">
      <input 
        v-else-if="errorFields.length === 0" 
        :value="'Submit'" 
        class="submit --is-ready" 
        type="submit" 
        @click.prevent="submit">
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'
import DappFormFieldsEmail from './DappFormFieldsEmail.vue'
import BasePopover from './BasePopover'

export default {
  directives: {
    onClickaway: onClickaway
  },
  components: {
    BasePopover,
    DappFormFieldsEmail
  },
  props: {
    acceptedTerms: {
      type: Boolean,
      required: true,
      default: false
    },
    contractsMainnet: {
      type: Array,
      required: true,
      default: () => []
    },
    contractsKovan: {
      type: Array,
      required: true,
      default: () => []
    },
    contractsRopsten: {
      type: Array,
      required: true,
      default: () => []
    },
    contractsRinkeby: {
      type: Array,
      required: true,
      default: () => []
    },
    contractsPoaMainnet: {
      type: Array,
      required: true,
      default: () => []
    },
    contractsGoChainMainnet: {
      type: Array,
      required: true,
      default: () => []
    },
    contractsEosMainnet: {
      type: Array,
      required: true,
      default: () => []
    },
    contractsSteemMainnet: {
      type: Array,
      required: true,
      default: () => []
    },
    diffExists: {
      type: Boolean,
      required: true,
      default: false
    },
    errorFields: {
      type: Array,
      required: true,
      default: () => []
    },
    errors: {
      type: Object,
      required: true,
      default: () => ({})
    },
    fields: {
      type: Object,
      required: true,
      default: () => ({})
    },
    formType: {
      type: String,
      required: true,
      default: ''
    },
    profileScore: {
      type: Number,
      required: true,
      default: null
    },
    sending: {
      type: Boolean,
      required: true,
      default: false
    },
    submitReason: {
      type: String,
      required: true,
      default: ''
    },
    subscribeNewsletter: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data: () => {
    return {
      popoverIsActive: false,
      profileScoreTimer: '',
      honeypot: null
    }
  },
  computed: {
    userEntryRoute() {
      return this.$store.getters['userEntryRoute']
    },
    missingFields() {
      const missingFields = []
      const errorFieldsToLabelsMap = {
        acceptedTerms: 'Accept the terms',
        authors: 'Authors',
        category: 'Category',
        description: 'Description',
        email: 'Email',
        name: 'Name',
        status: 'Status',
        tags: 'Tags',
        teaser: 'Tagline',
        websiteUrl: 'Website URL'
      }
      this.errorFields.map(x => {
        missingFields.push({
          anchor: x,
          label: errorFieldsToLabelsMap[x]
        })
      })
      return missingFields
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
    goToField(anchor) {
      document.getElementById(anchor).scrollIntoView({ behavior: 'smooth' })
      const highlightEl = document.getElementById(anchor + 'Field')
      highlightEl.classList.add('is-highlighted')
      setTimeout(() => {
        highlightEl.classList.remove('is-highlighted')
      }, 5000)
      this.popoverIsActive = false
    },
    setProfileScore(fields) {
      clearTimeout(this.profileScoreTimer)
      this.profileScoreTimer = setTimeout(() => {
        // TODO clean this up
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
    hideMissingFields() {
      this.popoverIsActive = false
    },
    showMissingFields() {
      this.popoverIsActive = true
      this.$mixpanel.track('New DApp - Show Missing', {
        errorFields: this.errorFields
      })
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
.BasePopover {
  bottom: 100%;
  left: 50%;
  margin-left: -100px;
}

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

.input-wrapper {
  position: relative;
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

.missing-fields-anchor {
  @include link;
  padding: 0.25rem 0;
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
  color: $color--medium-purple;
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
  &.has-missing-fields {
    text-decoration: underline;
    cursor: pointer;
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
