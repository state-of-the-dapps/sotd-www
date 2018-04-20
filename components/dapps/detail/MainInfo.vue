<template>
  <section class="section -main-info">
    <div class="container">
      <ul class="list">
        <li v-if="item.authors && item.authors.length > 0" class="item -author">
          <h3 class="sub-heading">Author<span v-if="item.authors.length > 1">s</span></h3>
          <p class="sub-body"><span v-for="(author, index) in item.authors" :key="index">{{ author }}<span v-if="index !== item.authors.length - 1">, </span></span></p>
        </li>
        <li class="item -description">
          <div class="body">
            <img v-if="item.logoUrl" class="logo" :src="item.logoUrl"><p v-for="(paragraph, index) in description" :key="index">{{ paragraph }}</p>
          </div>
        </li>
      </ul>
      <ul class="sub-list">
        <li v-if="item.contracts && item.contracts.length > 0" class="sub-item">
          <h3 class="sub-heading">Contract address<span v-if="item.contracts.length > 1">es</span></h3>
          <ul class="sub-body">
            <Contract v-for="(contract, index) in item.contracts" :contract="contract" :dapp="item" :key="index" />
          </ul>
        </li>
        <li v-if="item.license" class="sub-item">
          <h3 class="sub-heading">Software license</h3>
          <p class="sub-body">{{ item.license }}</p>
        </li>
        <li v-if="item.created" class="sub-item">
          <h3 class="sub-heading">Submitted</h3>
          <p class="sub-body">{{ item.created | formatDate('MMM Do, YYYY') }}</p>
        </li>
        <li v-if="item.lastUpdated" class="sub-item">
          <h3 class="sub-heading">Last updated</h3>
          <p class="sub-body">{{ item.lastUpdated | formatDate('MMM Do, YYYY') }}</p>
        </li>
        <li v-if="tags && tags.length > 0" class="sub-item">
          <h3 class="sub-heading">Tags</h3>
          <p class="sub-body"><a class="sub-tag" v-for="(tag, index) in tags" :key="index" @click="findDappsByTag(tag)">#{{ tag }}</a></p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import Contract from '~/components/dapps/detail/mainInfo/Contract.vue'

  export default {
    computed: {
      friendlyUrl () {
        return this.$store.getters['dapps/list/friendlyUrl']
      },
      item () {
        return this.$store.getters['dapps/detail/item']
      },
      description () {
        const value = this.item.description || []
        const formattedValue = value.split('\n\n')
        return formattedValue
      },
      tags () {
        var tags
        tags = this.item.tags || []
        return this.$options.filters.removeEmptyArrayItems(tags)
      }
    },
    components: {
      Contract
    },
    methods: {
      findDappsByTag (tag) {
        this.$store.dispatch('dapps/list/resetQuery')
        this.$store.dispatch('tags/selectItem', tag)
        this.$store.dispatch('dapps/list/addTagToQuery', tag)
        this.$store.dispatch('dapps/list/fetchItems')
        this.$store.dispatch('dapps/list/setFriendlyUrl').then((response) => {
          document.getElementById('__nuxt').scrollIntoView()
          this.$mixpanel.track('DApp - Tag', { name: tag, slug: this.item.slug })
        })
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


  .container {
    padding-top: 20px;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding-left: 160px;
      padding-right: 160px;
    }
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
    background: $color--white;
    box-shadow: 0 0 20px rgba($color--black,.1);
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

  .logo {
    max-width: 160px;
    max-height: 160px;
    background: darken($color--white, 6%);
    padding: 15px;
    float: right;
    margin-left: 20px;
    margin-bottom: 20px;
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
    background: rgba($color--white, .2);
    margin-bottom: 20px;
    box-shadow: 0 0 20px rgba($color--black,.1);
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
