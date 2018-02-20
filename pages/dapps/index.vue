<template>
  <div>
    <Search/>
    <CountRefine/>
    <Items/>
    <Pager/>
    <nuxt-child/>
  </div>
</template>

<script>
  import CountRefine from '~/components/dapps/list/CountRefine.vue'
  import Items from '~/components/dapps/list/Items.vue'
  import Pager from '~/components/dapps/list/Pager.vue'
  import Search from '~/components/dapps/list/Search.vue'

  export default {
    components: {
      CountRefine,
      Items,
      Pager,
      Search
    },
    computed: {
      tabQuery () {
        return this.$store.getters['dapps/list/tabQuery']
      },
      statDappCount () {
        return this.$store.getters['statDappCount']
      },
      tagQuery () {
        return this.$store.getters['dapps/list/tagQuery']
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'dapps')
      this.$store.dispatch('dapps/list/setFriendlyQuery', this.$route.params)
      this.$store.dispatch('dapps/list/setFriendlyUrl')
      this.$store.dispatch('dapps/list/fetchItems')
    },
    watch: {
      'tagQuery': function () {
        this.$store.dispatch('dapps/list/setFriendlyUrl')
      },
      'tabQuery': function () {
        this.$store.dispatch('dapps/list/setFriendlyUrl')
      }
    },
    head () {
      return {
        title: 'State of the ÐApps — ' + this.statDappCount + ' Projects Built on Ethereum'
      }
    },
    scrollToTop: false
  }
</script>
