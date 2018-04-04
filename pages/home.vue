<template>
  <div class="page-home">
    <HomeHero/>
    <HomeEventList/>
    <DappsFeaturedList/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DappsFeaturedList from '~/components/DappsFeaturedList'
import HomeEventList from '~/components/HomeEventList'
import HomeHero from '~/components/HomeHero'

export default {
  components: {
    DappsFeaturedList,
    HomeEventList,
    HomeHero
  },
  computed: {
    ...mapGetters([
      'statDappCount'
    ])
  },
  head () {
    return {
      title: 'State of the ÐApps — ' + this.statDappCount + ' Projects Built on Ethereum'
    }
  },
  layout: 'home'
}
</script>
