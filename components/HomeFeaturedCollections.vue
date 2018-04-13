<template>
<div class="component-HomeFeaturedCollections">
  <h2 class="title-2"><SvgIconCollection/>Collections</h2>
  <DappCollectionList v-for="(collection, index) in collections" :collection="collection" :key="index"/>
</div>
</template>

<script>
import axios from '~/helpers/axios'
import DappCollectionList from './DappCollectionList'
import SvgIconCollection from './SvgIconCollection'

export default {
  components: {
    DappCollectionList,
    SvgIconCollection
  },
  data () {
    return {
      collections: []
    }
  },
  mounted () {
    axios
      .get('collections/list/featured')
      .then(response => {
        const collections = response.data
        this.collections = collections.slice(1)
      })
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-HomeFeaturedCollections {
  @include margin-wrapper-main;
}

.component-SvgIconCollection {
  margin-right: 7px;
}

.title-2 {
  margin-top: .5rem;
  margin-bottom: 1rem;
}
</style>
