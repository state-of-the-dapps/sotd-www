<template>
  <div>
    <FindSection/>
    <ResultsBrowseSection/>
    <CardsSection/>
    <ResultsEndSection/>
    <nuxt-child/>
  </div>
</template>

<script>
  import CardsSection from '~/components/sections/list/Cards.vue'
  import FindSection from '~/components/sections/list/Find.vue'
  import ResultsBrowseSection from '~/components/sections/list/ResultsBrowse.vue'
  import ResultsEndSection from '~/components/sections/list/ResultsEnd.vue'

  export default {
    components: {
      CardsSection,
      FindSection,
      ResultsBrowseSection,
      ResultsEndSection
    },
    computed: {
      categoryQuery () {
        return this.$store.getters['dapps/categoryQuery']
      },
      dappCount () {
        return this.$store.getters['dappCount']
      },
      tagsQuery () {
        return this.$store.getters['dapps/tagsQuery']
      }
    },
    mounted () {
      this.$store.dispatch('dapps/setFriendlyQuery', this.$route.params)
      this.$store.dispatch('dapps/setFriendlyUrl')
      this.$store.dispatch('dapps/findItems')
    },
    watch: {
      'tagsQuery': function () {
        this.$store.dispatch('dapps/setFriendlyUrl')
      },
      'categoryQuery': function () {
        this.$store.dispatch('dapps/setFriendlyUrl')
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
