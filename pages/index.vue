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
      statProjectCount () {
        return this.$store.getters['statProjectCount']
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
      'tabQuery': function () {
        this.$store.dispatch('dapps/list/setFriendlyUrl')
      }
    },
    head () {
      return {
        title: 'State of the ÐApps — ' + this.statProjectCount + ' Projects Built on Ethereum'
      }
    },
    scrollToTop: false
  }
</script>
