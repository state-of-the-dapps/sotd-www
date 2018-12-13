<template>
  <div
    :class="isEdit ? 'is-edit' : ''"
    class="list">
    <DappFormFieldsName
      v-if="!isEdit || missingFields.includes('name')"
      :errors="errors.name"
      :existing-dapp="existingDapp"
      :name="fields.name"
      :warnings="warnings.name"
      @updateExistingDapp="updateExistingDapp"
      @updateErrors="updateErrors"
      @updateField="updateField"
      @updateWarnings="updateWarnings"/>
    <DappFormFieldsEmail
      v-if="!isEdit"
      :email="fields.email"
      :errors="errors.email"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <DappFormFieldsTeaser
      v-if="!isEdit || missingFields.includes('teaser')"
      :errors="errors.teaser"
      :teaser="fields.teaser"
      :warnings="warnings.teaser"
      @updateErrors="updateErrors"
      @updateField="updateField"
      @updateWarnings="updateWarnings"/>
    <DappFormFieldsDescription
      v-if="!isEdit || missingFields.includes('description')"
      :errors="errors.description"
      :description="fields.description"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <DappFormFieldsWebsite
      v-if="!isEdit || missingFields.includes('url')"
      :errors="errors.websiteUrl"
      :url="fields.siteUrls.website"
      @updateErrors="updateErrors"
      @updateSiteUrl="updateSiteUrl"/>
    <DappFormFieldsDappUrl
      v-if="!isEdit || missingFields.includes('dapp_url')"
      :errors="errors.dappUrl"
      :url="fields.siteUrls.dapp"
      @updateErrors="updateErrors"
      @updateSiteUrl="updateSiteUrl"/>
    <DappFormFieldsAuthors
      v-if="!isEdit || missingFields.includes('contact')"
      :authors="fields.authors"
      :errors="errors.authors"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <DappFormFieldsLicense
      v-if="!isEdit || missingFields.includes('license')"
      :errors="errors.authors"
      :license="fields.license"
      @updateErrors="updateErrors"
      @updateField="updateField"/>
    <DappFormFieldsLogo
      v-if="!isEdit || missingFields.includes('logo_cache')"
      @updateField="updateField"/>
    <DappFormFieldsIcon
      v-if="!isEdit || missingFields.includes('icon_cache')"
      @updateField="updateField"/>
    <DappFormFieldsProductImage
      v-if="!isEdit || missingFields.includes('product_image_cache')"
      @updateField="updateField"/>
    <DappFormFieldsPlatform
      v-if="!isEdit"
      :platform="fields.platform"
      @updateField="updateField"/>
    <DappFormFieldsContracts 
      v-if="!isEdit || (missingFields.includes('contract_addresses_mainnet') || missingFields.includes('poa_mainnet') || missingFields.includes('eos_mainnet'))"
      :is-edit="isEdit"
      :eth-is-missing="missingFields.includes('contract_addresses_mainnet')"
      :poa-is-missing="missingFields.includes('poa_mainnet')"
      :eos-is-missing="missingFields.includes('eos_mainnet')"
      :platform="fields.platform"
      :contracts="fields.contracts"
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
      :poa-testnet="fields.contracts.poaTestnet.address"
      :poa-testnet-errors="errors.poaTestnet"
      :eos-mainnet="fields.contracts.eosMainnet.address"
      :eos-mainnet-errors="errors.eosMainnet"
      @updateContract="updateContract"
      @updateErrors="updateErrors"/>
    <DappFormFieldsStatus
      v-if="!isEdit || missingFields.includes('status')"
      :status="fields.status"
      @updateStatus="updateStatus"/>
    <DappFormFieldsSocial 
      v-if="!isEdit || missingFields.includes('github') || missingFields.includes('twitter') || missingFields.includes('reddit') || missingFields.includes('blog') || missingFields.includes('facebook') || missingFields.includes('chat')"
      :is-edit="isEdit"
      :github-is-missing="missingFields.includes('github')"
      :twitter-is-missing="missingFields.includes('twitter')"
      :reddit-is-missing="missingFields.includes('reddit')"
      :blog-is-missing="missingFields.includes('blog')"
      :facebook-is-missing="missingFields.includes('facebook')"
      :chat-is-missing="missingFields.includes('chat')"/>
    <DappFormFieldsCategory v-if="!isEdit || missingFields.includes('category')"/>
    <DappFormFieldsTags v-if="!isEdit || missingFields.includes('tags')"/>
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
      required: true
    },
    existingDapp: {
      type: String,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    isEdit: {
      default: false,
      type: Boolean
    },
    suggestions: {
      type: Array,
      default: function() {
        return []
      }
    },
    warnings: {
      type: Object,
      required: true
    }
  },
  computed: {
    missingFields() {
      const fields = []
      let i = 0
      while (i < this.suggestions.length) {
        fields.push(this.suggestions[i].attribute)
        i++
      }
      return fields
    }
  },
  methods: {
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
    updateStatus(value) {
      this.$emit('updateStatus', value)
    },
    updateWarnings(warnings) {
      this.$emit('updateWarnings', warnings)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.list {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 0 auto;
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
    &.--has-errors {
      border-color: $color--error;
    }
  }

  /deep/ .required {
    display: inline-block;
    padding-left: 2px;
    color: $color--error;
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

  /deep/ .text-input,
  /deep/ .text-area {
    border: none;
    padding: 30px 50px 30px 20px;
    width: 100%;
    box-shadow: 0 0 20px rgba($color--black, 0.05);
    background: rgba(lighten($color--gray, 100%), 0.9);
    transition: background 0.2s ease;
    &:focus {
      background: none;
      background: rgba(250, 250, 250, 0.7);
    }
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
  }

  /deep/ .remaining-characters {
    position: absolute;
    display: block;
    right: 20px;
    top: 30px;
    font-size: 12px;
  }

  /deep/ .help {
    padding: 10px 20px;
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
  }

  /deep/ .error-list,
  /deep/ .warning-list {
    padding: 10px 20px;
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
