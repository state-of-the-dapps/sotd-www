<template>
  <div>
    <section class="section -form">
      <div class="container">
        <DappFormFields
          :errors="errors"
          :existing-dapp="existingDapp"
          :fields="fields"
          :selected-tags="selectedTags"
          :tag-query="tagQuery"
          :tags-results="tagsResults"
          :warnings="warnings"
          @addNewTag="addNewTag"
          @fetchNewTags="fetchNewTags"
          @removeTag="removeOldTag"
          @resetExistingTagResults="resetExistingTagResults"
          @selectTag="selectNewTag"
          @updateContract="updateContract"
          @updateErrors="updateErrors"
          @updateField="updateField"
          @updateSiteUrl="updateSiteUrl"
          @updateSocial="updateSocial"
          @updateStatus="updateStatus"
          @updateTagQuery="updateTagQuery"
          @updateWarnings="updateWarnings"
          @updateExistingDapp="updateExistingDapp"/>
        <DappFormSave
          :accepted-terms="fields.acceptedTerms"
          :contracts-mainnet="contractsMainnet"
          :contracts-kovan="contractsKovan"
          :contracts-ropsten="contractsRopsten"
          :contracts-rinkeby="contractsRinkeby"
          :contracts-poa-mainnet="contractsPoaMainnet"
          :contracts-poa-testnet="contractsPoaTestnet"
          :contracts-eos-mainnet="contractsEosMainnet"
          :contracts-steem-mainnet="contractsSteemMainnet"
          :error-fields="errorFields"
          :fields="fields"
          :name="fields.name"
          :profile-score="profileScore"
          :sending="sending"
          :submit-reason="fields.submitReason"
          :subscribe-newsletter="fields.subscribeNewsletter"
          @addErrorField="addNewErrorField"
          @removeErrorField="removeExistingErrorField"
          @setProfileScore="updateProfileScore"
          @submit="submit"
          @updateField="updateField"
          @updateCheckbox="updateCheckbox"/>
      </div>
    </section>
  </div>
</template>

<script>
import { dispatchErrors, dispatchWarnings } from '~/helpers/mixins'
import { mapActions, mapGetters } from 'vuex'
import DappFormFields from '~/components/DappFormFields'
import DappFormSave from '~/components/DappFormSave'

export default {
  components: {
    DappFormFields,
    DappFormSave
  },
  mixins: [dispatchErrors, dispatchWarnings],
  data() {
    return {
      sending: false
    }
  },
  computed: {
    ...mapGetters('dapps/form', [
      'contractsMainnet',
      'contractsKovan',
      'contractsRopsten',
      'contractsRinkeby',
      'contractsPoaMainnet',
      'contractsPoaTestnet',
      'contractsEosMainnet',
      'contractsSteemMainnet',
      'errorFields',
      'errors',
      'existingDapp',
      'fields',
      'profileScore',
      'selectedTags',
      'tagQuery',
      'tagsResults',
      'warnings'
    ])
  },
  methods: {
    ...mapActions('dapps/form', [
      'addErrorField',
      'addTag',
      'fetchTags',
      'removeErrorField',
      'removeTag',
      'resetTagResults',
      'selectTag',
      'setContract',
      'setExistingDapp',
      'setField',
      'setProfileScore',
      'setSiteUrl',
      'setSocial',
      'setStatus',
      'setTagQuery',
      'toggleCheckbox'
    ]),
    addNewErrorField(field) {
      this.addErrorField(field)
    },
    addNewTag(tag) {
      this.addTag(tag)
    },
    fetchNewTags(query) {
      this.fetchTags(query)
    },
    removeExistingErrorField(field) {
      this.removeErrorField(field)
    },
    removeOldTag(key) {
      this.removeTag(key)
    },
    resetExistingTagResults() {
      this.resetTagResults()
    },
    selectNewTag(key) {
      this.selectTag(key)
    },
    submit(data) {
      this.sending = true
      this.$axios
        .post('dapps', data)
        .then(response => {
          this.sending = false
          this.$mixpanel.track('New DApp - Submit', {
            disabled: false,
            name: data.fields.name,
            email: data.fields.email,
            author: data.fields.author,
            subscribeNewsletter: data.fields.subscribeNewsletter
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
    },
    updateCheckbox(field) {
      this.toggleCheckbox(field)
      if (this.fields.acceptedTerms === false) {
        this.addErrorField('acceptedTerms')
      } else {
        this.removeErrorField('acceptedTerms')
      }
    },
    updateContract(field, value) {
      const fieldObj = {
        name: field,
        value: value
      }
      this.setContract(fieldObj)
    },
    updateExistingDapp(dapp) {
      this.setExistingDapp(dapp)
    },
    updateErrors(errors) {
      this.dispatchErrors(errors, 'dapps')
    },
    updateField(field, value) {
      const fieldObj = {
        name: field,
        value: value
      }
      this.setField(fieldObj)
    },
    updateProfileScore(score) {
      this.setProfileScore(score)
    },
    updateSiteUrl(field, value) {
      const fieldObj = {
        name: field,
        value: value
      }
      this.setSiteUrl(fieldObj)
    },
    updateSocial(field, value) {
      const fieldObj = {
        name: field,
        value: value
      }
      this.setSocial(fieldObj)
    },
    updateStatus(value) {
      this.setStatus(value)
    },
    updateTagQuery(value) {
      this.setTagQuery(value)
    },
    updateWarnings(warnings) {
      this.dispatchWarnings(warnings, 'dapps')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.container {
  padding-top: 0;
  padding-bottom: 0;
}

.section {
  &.-form {
    .container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 20px auto;
      @include tweakpoint('min-width', $tweakpoint--default) {
        margin: 30px auto 200px;
        flex-direction: row;
        width: 800px;
      }
    }
  }
}
</style>
