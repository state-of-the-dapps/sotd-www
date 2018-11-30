<template>
  <div
    :class="isEdit ? 'is-edit' : ''"
    class="list">
    <Name v-if="!isEdit || missingFields.includes('name')"/>
    <Email v-if="!isEdit"/>
    <Teaser v-if="!isEdit || missingFields.includes('teaser')"/>
    <Description v-if="!isEdit || missingFields.includes('description')"/>
    <Website v-if="!isEdit || missingFields.includes('url')"/>
    <DappUrl v-if="!isEdit || missingFields.includes('dapp_url')"/>
    <Authors v-if="!isEdit || missingFields.includes('contact')"/>
    <License v-if="!isEdit || missingFields.includes('license')"/>
    <Logo v-if="!isEdit || missingFields.includes('logo_cache')"/>
    <Icon v-if="!isEdit || missingFields.includes('icon_cache')"/>
    <ProductImage v-if="!isEdit || missingFields.includes('product_image_cache')"/>
    <Platform v-if="!isEdit"/>
    <Contracts 
      v-if="!isEdit || (missingFields.includes('contract_addresses_mainnet') || missingFields.includes('poa_mainnet') || missingFields.includes('eos_mainnet'))"
      :is-edit="isEdit"
      :eth-is-missing="missingFields.includes('contract_addresses_mainnet')"
      :poa-is-missing="missingFields.includes('poa_mainnet')"
      :eos-is-missing="missingFields.includes('eos_mainnet')"/>
    <Status v-if="!isEdit || missingFields.includes('status')"/>
    <Social 
      v-if="!isEdit || missingFields.includes('github') || missingFields.includes('twitter') || missingFields.includes('reddit') || missingFields.includes('blog') || missingFields.includes('facebook') || missingFields.includes('chat')"
      :is-edit="isEdit"
      :github-is-missing="missingFields.includes('github')"
      :twitter-is-missing="missingFields.includes('twitter')"
      :reddit-is-missing="missingFields.includes('reddit')"
      :blog-is-missing="missingFields.includes('blog')"
      :facebook-is-missing="missingFields.includes('facebook')"
      :chat-is-missing="missingFields.includes('chat')"/>
    <Category v-if="!isEdit || missingFields.includes('category')"/>
    <Tags v-if="!isEdit || missingFields.includes('tags')"/>
  </div>
</template>

<script>
import Authors from '~/components/dapps/form/fields/Authors.vue'
import Category from '~/components/dapps/form/fields/Category.vue'
import Contracts from '~/components/dapps/form/fields/Contracts.vue'
import DappUrl from '~/components/dapps/form/fields/DappUrl.vue'
import Description from '~/components/dapps/form/fields/Description.vue'
import Email from '~/components/dapps/form/fields/Email.vue'
import Icon from '~/components/dapps/form/fields/Icon.vue'
import License from '~/components/dapps/form/fields/License.vue'
import Logo from '~/components/dapps/form/fields/Logo.vue'
import Name from '~/components/dapps/form/fields/Name.vue'
import Platform from '~/components/dapps/form/fields/Platform.vue'
import ProductImage from '~/components/dapps/form/fields/ProductImage.vue'
import Social from '~/components/dapps/form/fields/Social.vue'
import Status from '~/components/dapps/form/fields/Status.vue'
import Tags from '~/components/dapps/form/fields/Tags.vue'
import Teaser from '~/components/dapps/form/fields/Teaser.vue'
import Website from '~/components/dapps/form/fields/Website.vue'

export default {
  components: {
    Authors,
    Category,
    Contracts,
    DappUrl,
    Description,
    Email,
    Icon,
    License,
    Logo,
    Name,
    Platform,
    ProductImage,
    Social,
    Status,
    Tags,
    Teaser,
    Website
  },
  props: {
    isEdit: {
      default: false,
      type: Boolean
    },
    suggestions: {
      type: Array,
      default: function() {
        return []
      }
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
