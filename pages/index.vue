<template>
  <div>
    <Search/>
<<<<<<< HEAD
    <CountRefine/>
    <Items/>
=======
    <CountBrowse/>
    <Cards/>
>>>>>>> master
    <Pager/>
    <nuxt-child/>
  </div>
</template>

<script>
<<<<<<< HEAD
  import CountRefine from '~/components/projects/list/CountRefine.vue'
  import Items from '~/components/projects/list/Items.vue'
  import Pager from '~/components/projects/list/Pager.vue'
  import Search from '~/components/projects/list/Search.vue'

  export default {
    components: {
      CountRefine,
      Items,
=======
  import Cards from '~/components/dapps/list/Cards.vue'
  import CountBrowse from '~/components/dapps/list/CountBrowse.vue'
  import Pager from '~/components/dapps/list/Pager.vue'
  import Search from '~/components/dapps/list/Search.vue'

  export default {
    components: {
      Cards,
      CountBrowse,
>>>>>>> master
      Pager,
      Search
    },
    computed: {
<<<<<<< HEAD
      tabQuery () {
        return this.$store.getters['projects/list/tabQuery']
      },
      statProjectCount () {
        return this.$store.getters['statProjectCount']
      },
      tagsQuery () {
        return this.$store.getters['projects/list/tagsQuery']
      }
    },
    mounted () {
      this.$store.dispatch('projects/list/setFriendlyQuery', this.$route.params)
      this.$store.dispatch('projects/list/setFriendlyUrl')
      this.$store.dispatch('projects/list/fetchItems')
    },
    watch: {
      'tagsQuery': function () {
        this.$store.dispatch('projects/list/setFriendlyUrl')
      },
      'tabQuery': function () {
        this.$store.dispatch('projects/list/setFriendlyUrl')
=======
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
>>>>>>> master
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
