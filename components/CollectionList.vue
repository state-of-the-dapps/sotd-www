<template>
  <div class="component-CollectionList">
    <DappCollectionList 
      v-for="(collection, index) in collections" 
      :collection="collection" 
      :key="index"/>
  </div>
</template>

<script>
import DappCollectionList from './DappCollectionList'
import SvgIconCollection from './SvgIconCollection'

export default {
  components: {
    DappCollectionList,
    SvgIconCollection
  },
  data() {
    return {
      collections: []
    }
  },
  mounted() {
    this.$axios.get('collections/list/featured').then(response => {
      const collections = response.data
      this.collections = collections
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-CollectionList {
  @include margin-wrapper-main;
}

.component-SvgIconCollection {
  margin-right: 7px;
}

.title-2 {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
