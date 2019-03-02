<template>
  <div class="DappFormFields">
    <DappFormFieldsName
      :errors="errors.name"
      :existing-dapp="existingDapp"
      :form-type="formType"
      :name="fields.name"
      :warnings="warnings.name"
      @updateExistingDapp="updateExistingDapp"
      @updateErrors="updateErrors"
      @updateField="updateField"
      @updateWarnings="updateWarnings"/>
    <DappFormFieldsTeaser
      :errors="errors.teaser"
      :teaser="fields.teaser"
      :warnings="warnings.teaser"
      @updateErrors="updateErrors"
      @updateField="updateField"
      @updateWarnings="updateWarnings"/>
    <DappFormFieldsDescription
      :errors="errors.description"
      :description="fields.description"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <DappFormFieldsWebsite
      :errors="errors.websiteUrl"
      :url="fields.siteUrls.website"
      @updateErrors="updateErrors"
      @updateSiteUrl="updateSiteUrl"/>
    <DappFormFieldsDappUrl
      :errors="errors.dappUrl"
      :url="fields.siteUrls.dapp"
      @updateErrors="updateErrors"
      @updateSiteUrl="updateSiteUrl"/>
    <DappFormFieldsAuthors
      :authors="fields.authors"
      :errors="errors.authors"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <DappFormFieldsLicense
      :errors="errors.license"
      :license="fields.license"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <DappFormFieldsLogo
      :logo="fields.logo"
      @updateField="updateField"/>
    <DappFormFieldsIcon
      :icon="fields.icon"
      @updateField="updateField"/>
    <DappFormFieldsProductImage
      :product-image="fields.productImage"
      @updateField="updateField"/>
    <DappFormFieldsPlatform
      :platform="fields.platform"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <DappFormFieldsContracts 
      :platform="fields.platform"
      :mainnet="fields.contracts.mainnet.address"
      :mainnet-errors="errors.mainnet"
      :kovan="fields.contracts.kovan.address"
      :kovan-errors="errors.kovan"
      :ropsten="fields.contracts.ropsten.address"
      :ropsten-errors="errors.ropsten"
      :rinkeby="fields.contracts.rinkeby.address"
      :rinkeby-errors="errors.rinkeby"
      :poa-mainnet="fields.contracts.poaMainnet.address"
      :poa-mainnet-errors="errors.poaMainnet"
      :go-chain-mainnet="fields.contracts.goChainMainnet.address"
      :go-chain-mainnet-errors="errors.goChainMainnet"
      :eos-mainnet="fields.contracts.eosMainnet.address"
      :eos-mainnet-errors="errors.eosMainnet"
      :steem-mainnet="fields.contracts.steemMainnet.address"
      :steem-mainnet-errors="errors.steemMainnet"
      :x-dai-mainnet="fields.contracts.xDaiMainnet.address"
      :x-dai-mainnet-errors="errors.xDaiMainnet"
      @updateContract="updateContract"
      @updateErrors="updateErrors"/>
    <DappFormFieldsStatus
      :status="fields.status"
      @updateStatus="updateStatus"/>
    <DappFormFieldsSocial 
      :github="fields.socials.github.path"
      :twitter="fields.socials.twitter.path"
      :reddit="fields.socials.reddit.path"
      :blog="fields.socials.blog.path"
      :facebook="fields.socials.facebook.path"
      :chat="fields.socials.chat.path"
      :chat-errors="errors.socialChat"
      @updateErrors="updateErrors"
      @updateSocial="updateSocial"/>
    <DappFormFieldsCategory
      :selected-category="fields.category"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <DappFormFieldsTags
      :name="fields.name"
      :query="tagQuery"
      :results="tagsResults"
      :selected="selectedTags"
      @addTag="addTag"
      @fetchTags="fetchTags"
      @removeTag="removeTag"
      @resetTagResults="resetTagResults"
      @selectTag="selectTag"
      @updateTagQuery="updateTagQuery"/>
  </div>
</template>

<script>
import DappFormFieldsAuthors from '~/components/DappFormFieldsAuthors.vue'
import DappFormFieldsCategory from '~/components/DappFormFieldsCategory.vue'
import DappFormFieldsContracts from '~/components/DappFormFieldsContracts.vue'
import DappFormFieldsDappUrl from '~/components/DappFormFieldsDappUrl.vue'
import DappFormFieldsDescription from '~/components/DappFormFieldsDescription.vue'
import DappFormFieldsEmail from '~/components/DappFormFieldsEmail.vue'
import DappFormFieldsIcon from '~/components/DappFormFieldsIcon.vue'
import DappFormFieldsLicense from '~/components/DappFormFieldsLicense.vue'
import DappFormFieldsLogo from '~/components/DappFormFieldsLogo.vue'
import DappFormFieldsName from '~/components/DappFormFieldsName.vue'
import DappFormFieldsPlatform from '~/components/DappFormFieldsPlatform.vue'
import DappFormFieldsProductImage from '~/components/DappFormFieldsProductImage.vue'
import DappFormFieldsSocial from '~/components/DappFormFieldsSocial.vue'
import DappFormFieldsStatus from '~/components/DappFormFieldsStatus.vue'
import DappFormFieldsTags from '~/components/DappFormFieldsTags.vue'
import DappFormFieldsTeaser from '~/components/DappFormFieldsTeaser.vue'
import DappFormFieldsWebsite from '~/components/DappFormFieldsWebsite.vue'

export default {
  components: {
    DappFormFieldsAuthors,
    DappFormFieldsCategory,
    DappFormFieldsContracts,
    DappFormFieldsDappUrl,
    DappFormFieldsDescription,
    DappFormFieldsEmail,
    DappFormFieldsIcon,
    DappFormFieldsLicense,
    DappFormFieldsLogo,
    DappFormFieldsName,
    DappFormFieldsPlatform,
    DappFormFieldsProductImage,
    DappFormFieldsSocial,
    DappFormFieldsStatus,
    DappFormFieldsTags,
    DappFormFieldsTeaser,
    DappFormFieldsWebsite
  },
  props: {
    errors: {
      type: Object,
      required: true,
      default: () => ({})
    },
    existingDapp: {
      type: String,
      required: true,
      default: ''
    },
    fields: {
      type: Object,
      required: true,
      default: () => ({
        contracts: {
          mainnet: {},
          kovan: {},
          ropsten: {},
          rinkeby: {},
          poaMainnet: {},
          goChainMainnet: {},
          eosMainnet: {},
          steemMainnet: {},
          xDaiMainnet: {}
        },
        siteUrls: {},
        socials: {
          blog: {},
          chat: {},
          facebook: {},
          github: {},
          reddit: {},
          twitter: {}
        }
      })
    },
    formType: {
      type: String,
      required: true,
      default: ''
    },
    selectedTags: {
      type: Array,
      required: true,
      default: () => []
    },
    tagsResults: {
      type: Array,
      required: true,
      default: () => []
    },
    tagQuery: {
      type: String,
      required: true,
      default: ''
    },
    warnings: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  methods: {
    addTag(tag) {
      this.$emit('addTag', tag)
    },
    fetchTags(query) {
      this.$emit('fetchTags', query)
    },
    removeTag(key) {
      this.$emit('removeTag', key)
    },
    resetTagResults() {
      this.$emit('resetTagResults')
    },
    selectTag(key) {
      this.$emit('selectTag', key)
    },
    updateContract(network, value) {
      this.$emit('updateContract', network, value)
    },
    updateExistingDapp(dapp) {
      this.$emit('updateExistingDapp', dapp)
    },
    updateField(field, value) {
      this.$emit('updateField', field, value)
    },
    updateErrors(errors) {
      this.$emit('updateErrors', errors)
    },
    updateSiteUrl(field, value) {
      this.$emit('updateSiteUrl', field, value)
    },
    updateSocial(field, value) {
      this.$emit('updateSocial', field, value)
    },
    updateStatus(value) {
      this.$emit('updateStatus', value)
    },
    updateTagQuery(value) {
      this.$emit('updateTagQuery', value)
    },
    updateWarnings(warnings) {
      this.$emit('updateWarnings', warnings)
    }
  }
}
</script>

<style lang="scss" scoped>
.DappFormFields {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 0 auto;
  margin-top: -7px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-right: 20px;
    margin-left: 0;
    &.is-edit {
      margin: 0 auto;
    }
  }

  .item {
    width: 100%;
    margin-bottom: 15px;
    position: relative;
    border: 1px solid transparent;
    &.-icon,
    &.-image {
      background: rgba(lighten($color--gray, 100%), 0.9);
      box-shadow: 0 0 20px rgba($color--black, 0.05);
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      border-radius: 50%;
      &.-drop {
        border-color: $color--black;
      }
    }
    &.-image {
      width: auto;
      height: auto;
      min-height: 200px;
      border-radius: 10px;
    }
  }

  /deep/ .is-edit {
    display: none;
  }

  /deep/ .required {
    display: inline-block;
    padding-left: 2px;
    color: $color--medium-purple;
    font-weight: 700;
  }

  /deep/ .label {
    position: absolute;
    left: 0;
    top: 10px;
    padding: 20px;
    pointer-events: none;
    font-size: 0.95rem;
    transition: top 0.2s ease;
  }

  /deep/ .boost {
    background: rgba($color--medium-purple, 0.25);
    padding: 3px 4px 2px 4px;
    line-height: 1;
    border-radius: 2px;
    color: $color--purple;
    font-size: 0.8rem;
    text-transform: uppercase;
    display: inline-block;
    margin-left: 5px;
    font-weight: 700;
    letter-spacing: 0.125px;
  }

  /deep/ .text-input,
  /deep/ .text-area {
    border: none;
    padding: 20px 15px;
    width: 100%;
    box-shadow: 0 10px 20px rgba($color--black, 0.075);
    background: rgba(lighten($color--gray, 100%), 0.95);
    &:focus + .label,
    &.--is-filled + .label {
      top: -11px;
      opacity: 0.65;
    }
  }

  /deep/ .text-area {
    vertical-align: top;
    min-height: 75px;
    resize: none;
    line-height: 1.25;
  }

  /deep/ .remaining-characters {
    position: absolute;
    display: block;
    right: 0;
    top: 8px;
    font-size: 12px;
  }

  /deep/ ::placeholder {
    color: darken($color--gray, 30%);
  }

  /deep/ .help {
    padding: 10px 15px;
    margin: 0;
    background: none;
    background: rgba(250, 250, 250, 0.7);
    font-size: 0.9rem;
    line-height: 1.45;
  }

  /deep/ .heading {
    font-weight: 700;
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
    position: relative;
    display: flex;
    align-items: center;
  }

  /deep/ .checkmark {
    display: inline-block;
    width: 18px;
    height: 16px;
    margin-right: 2px;
    @include tweakpoint('min-width', 600px) {
      position: absolute;
      top: -1px;
      left: -22px;
    }
  }

  /deep/ .error-list,
  /deep/ .warning-list {
    padding: 10px 15px;
    color: lighten($color--white, 100%);
  }

  /deep/ .error-list {
    background: $color--error;
  }

  /deep/ .warning-list {
    background: $color--warning;
  }

  /deep/ .error-item,
  /deep/ .warning-item {
    margin: 0.2rem 0;
  }

  /deep/ .error-link {
    color: lighten($color--white, 100%);
  }
}
</style>
