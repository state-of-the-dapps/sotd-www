<template>
  <div class="page-home">
    <HomeHero/>
    <HomeEventList/>
    <DappFeaturedList/>
    <div class="wrapper">
      <h2 class="title-2"><SvgIconCollection/>Collections</h2>
    </div>
    <DappCollectionPreview v-for="(collection, index) in collections" :collection="collection" :key="index"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '~/helpers/axios'
import DappCollectionPreview from '~/components/DappCollectionPreview'
import DappFeaturedList from '~/components/DappFeaturedList'
import HomeEventList from '~/components/HomeEventList'
import HomeHero from '~/components/HomeHero'
import SvgIconCollection from '~/components/SvgIconCollection'

export default {
  components: {
    DappCollectionPreview,
    DappFeaturedList,
    HomeEventList,
    HomeHero,
    SvgIconCollection
  },
  computed: {
    ...mapGetters([
      'statDappCount'
    ])
  },
  data () {
    return {
      collections: []
    }
  },
  head () {
    return {
      title: 'State of the ÐApps — ' + this.statDappCount + ' Projects Built on Ethereum'
    }
  },
  mounted () {
    axios
      .get('collections/list/featured')
      .then(response => {
        const collections = response.data
        this.collections = collections
      })
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-SvgIconCollection {
  margin-right: 7px;
}

.wrapper {
  @include margin-wrapper-main;
}

.title-2 {
  margin-top: .5rem;
  margin-bottom: 1rem;
}
</style>
