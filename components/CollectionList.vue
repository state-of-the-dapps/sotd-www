<template>
  <div class="CollectionList">
    <DappCollectionList 
      v-for="(collection, index) in collections" 
      :collection="collection" 
      :key="index"/>
  </div>
</template>

<script>
import DappCollectionList from './DappCollectionList'
import IconCollection from './IconCollection'

export default {
  components: {
    DappCollectionList,
    IconCollection
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
.CollectionList {
  @include margin-wrapper-main;
}

.IconCollection {
  margin-right: 7px;
}

.title-2 {
  @include title-2;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
