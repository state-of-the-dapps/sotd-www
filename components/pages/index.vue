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
    mounted () {
      this.$store.watch(() => this.tagsQuery, tagsQuery => {
        // console.log('Tags watch ran')
        // window.history.replaceState({}, '', 'todo')
      })
      this.$store.watch(() => this.categoryQuery, categoryQuery => {
        // console.log('Category watch ran')
        // window.history.replaceState({}, '', 'todo')
      })
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
    head () {
      return {
        title: 'State of the ÐApps — ' + this.dappCount + ' Projects Built on Ethereum'
      }
    },
    scrollToTop: false
  }
</script>
