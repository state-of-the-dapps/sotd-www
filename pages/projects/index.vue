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
  import CountRefine from '~/components/projects/list/CountRefine.vue'
  import Items from '~/components/projects/list/Items.vue'
  import Pager from '~/components/projects/list/Pager.vue'
  import Search from '~/components/projects/list/Search.vue'

  export default {
    components: {
      CountRefine,
      Items,
      Pager,
      Search
    },
    computed: {
      tabQuery () {
        return this.$store.getters['projects/list/tabQuery']
      },
      statProjectCount () {
        return this.$store.getters['statProjectCount']
      },
      tagQuery () {
        return this.$store.getters['projects/list/tagQuery']
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'projects')
      this.$store.dispatch('projects/list/setFriendlyQuery', this.$route.params)
      this.$store.dispatch('projects/list/setFriendlyUrl')
      this.$store.dispatch('projects/list/fetchItems')
    },
    watch: {
      'tagQuery': function () {
        this.$store.dispatch('projects/list/setFriendlyUrl')
      },
      'tabQuery': function () {
        this.$store.dispatch('projects/list/setFriendlyUrl')
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
