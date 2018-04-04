<template>
  <div class="page-home">
    <HomeHero/>
    <HomeEventList/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeEventList from '~/components/HomeEventList'
import HomeHero from '~/components/HomeHero'

export default {
  components: {
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
