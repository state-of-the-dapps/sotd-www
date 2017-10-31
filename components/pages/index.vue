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
      dappCount () {
        return this.$store.getters['dappCount']
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
