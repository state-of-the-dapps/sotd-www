<template>
  <div>
    <Search/>
    <CountBrowse/>
    <Cards/>
    <Pager/>
    <nuxt-child/>
  </div>
</template>

<script>
  import Cards from '~/components/dapps/list/Cards.vue'
  import CountBrowse from '~/components/dapps/list/CountBrowse.vue'
  import Pager from '~/components/dapps/list/Pager.vue'
  import Search from '~/components/dapps/list/Search.vue'

  export default {
    components: {
      Cards,
      CountBrowse,
      Pager,
      Search
    },
    computed: {
      categoryQuery () {
        return this.$store.getters['dapps/list/categoryQuery']
      },
      dappCount () {
        return this.$store.getters['statDappCount']
      },
      tagsQuery () {
        return this.$store.getters['dapps/list/tagsQuery']
      }
    },
    mounted () {
      this.$store.dispatch('dapps/list/setFriendlyQuery', this.$route.params)
      this.$store.dispatch('dapps/list/setFriendlyUrl')
      this.$store.dispatch('dapps/list/fetchItems')
    },
    watch: {
      'tagsQuery': function () {
        this.$store.dispatch('dapps/list/setFriendlyUrl')
      },
      'categoryQuery': function () {
        this.$store.dispatch('dapps/list/setFriendlyUrl')
      }
    },
    head () {
      return {
        title: 'State of the ÐApps — ' + this.dappCount + ' Projects Built on Ethereum'
      }
    },
    scrollToTop: false
  }
</script>
