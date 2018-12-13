<template>
  <div>
    <DappFormFields
      :errors="errors"
      :existing-dapp="existingDapp"
      :fields="fields"
      :is-edit="true"
      :selected-tags="selectedTags"
      :suggestions="suggestions"
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
  </div>
</template>

<script>
import { dispatchErrors, dispatchWarnings } from '~/helpers/mixins'
import { mapActions, mapGetters } from 'vuex'
import DappFormFields from './DappFormFields'

export default {
  components: {
    DappFormFields
  },
  mixins: [dispatchErrors, dispatchWarnings],
  props: {
    suggestions: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('dapps/form', [
      'fields',
      'errors',
      'existingDapp',
      'selectedTags',
      'tagQuery',
      'tagsResults',
      'warnings'
    ])
  },
  mounted() {
    this.$store.dispatch('dapps/form/resetForm')
  },
  destroyed() {
    this.$store.dispatch('dapps/form/resetForm')
  },
  methods: {
    ...mapActions('dapps/form', [
      'addTag',
      'fetchTags',
      'removeTag',
      'resetTagResults',
      'selectTag',
      'setContract',
      'setExistingDapp',
      'setField',
      'setSiteUrl',
      'setSocial',
      'setStatus',
      'setTagQuery'
    ]),
    addNewTag(tag) {
      this.addTag(tag)
    },
    fetchNewTags(query) {
      this.fetchTags(query)
    },
    removeOldTag(key) {
      this.removeTag(key)
    },
    resetExistingTagResults() {
      this.resetExistingTagResults()
    },
    selectNewTag(key) {
      this.selectTag(key)
    },
    updateContract(network, value) {
      const fieldObj = {
        name: network,
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
