<template>
  <div>
    <ul class="list">
      <li v-if="item.author" class="item -author">
        <h3 class="sub-heading">Author<span v-if="item.additionalAuthors">s</span></h3>
        <p class="sub-body">{{ item.author }}<span v-if="item.additionalAuthors">, {{ item.additionalAuthors }}</span></p>
      </li>
      <li class="item -description">
        <p class="body">{{ item.description }}</p>
      </li>
    </ul>
    <ul class="sub-list">
      <li v-if="item.contracts.length > 0" class="sub-item">
        <h3 class="sub-heading">Contract address<span v-if="this.contracts.length > 1">es</span></h3>
        <p>
          <span v-for="(contract, index) in item.contracts" class="sub-body"><a @click="$mixpanel.track('DApp - Contract', { address: contract.address, network: contract.name })" :href="'https://'
            + (key === 'mainnet' ? '' : key + '.')
            + 'etherscan.io/address/'
            + contract.address"
          target="_blank">{{ contract.name | capitalize }}</a><span v-if="index !== items.length - 1">, </span></span>
        </p>
      </li>
      <li v-if="item.license" class="sub-item">
        <h3 class="sub-heading">Software license</h3>
        <p class="sub-body">{{ item.license }}</p>
      </li>
      <li v-if="item.created" class="sub-item">
        <h3 class="sub-heading">Created</h3>
        <p class="sub-body">{{ item.created }}</p>
      </li>
      <li v-if="item.lastUpdated" class="sub-item">
        <h3 class="sub-heading">Last updated</h3>
        <p class="sub-body">{{ item.lastUpdated }}</p>
      </li>
      <li v-if="tags && tags.length > 0" class="sub-item">
        <h3 class="sub-heading">Tags</h3>
        <p class="sub-body"><a class="sub-tag" v-for="tag in tags" @click="findDappsByTag(tag)">#{{ tag }}</a></p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      friendlyUrl () {
        return this.$store.getters['dapps/friendlyUrl']
      },
      item () {
        return this.$store.getters['dapp/active']
      },
      tags () {
        var tags
        tags = this.item.tags || []
        return this.$options.filters.removeEmptyItems(tags)
      }
    },
    methods: {
      findDappsByTag (tag) {
        this.$store.dispatch('dapps/setActiveItemIndex', -1)
        this.$store.dispatch('dapps/resetQuery')
        this.$store.dispatch('tags/select', tag)
        this.$store.dispatch('dapps/addTagsQuery', tag)
        this.$store.dispatch('dapps/findItems')
        this.$store.dispatch('dapps/setFriendlyUrl')
        this.$router.push(this.friendlyUrl, function () {
          document.getElementById('__nuxt').scrollIntoView()
        })
        this.$mixpanel.track('DApp - Tag', { name: tag, slug: this.item.slug })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .body {
    margin: 0;
    font-size: 1.2rem;
    line-height: 1.4;
    max-width: 700px;
  }

  .heading {
    margin: 0;
    font-size: 1.25rem;
  }

  .image {
    max-width: 100%;
    width: 100%;
    display: block;
  }

  .item {
    width: 100%;
    background: $color--alabaster;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    overflow: hidden;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
    padding: 20px;
    &.-image {
      border-radius: 4px;
      padding: 0;
    }
    &.-description {
      order: -1;
    }
    @include tweakpoint('min-width', $tweakpoint--default) {
      &.-author {
        width: calc(33.33% - 20px);
      }
      &.-description {
        width: calc(66.66% - 20px);
      }
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }

  .sub-body {
    margin: 0;
    word-wrap: break-word;
  }

  .sub-heading {
    font-size: 1.2rem;
    margin: 0;
    margin-bottom: .25rem;
  }

  .sub-item {
    width: 100%;
    margin: 0 10px;
    overflow: hidden;
    padding: 20px;
    background: rgba($color--alabaster, .2);
    margin-bottom: 20px;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    @include tweakpoint('min-width', $tweakpoint--default) {
      width: calc(33.33% - 20px);
    }
  }

  .sub-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }

  .sub-tag {
    display: inline-block;
    padding: 1px 6px 1px 0px;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
