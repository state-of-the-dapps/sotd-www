<template>
  <div class="component--collections-detail-items">
    <DappItems v-if="model == 'dapps'"
      :items="items"
      :itemCount="itemCount"
    />
  </div>
</template>

<script>
import DappItems from '~/components/dapps/list/Items.vue'

export default {
  components: {
    DappItems
  },
  computed: {
    itemCount () {
      return this.items.length
    }
  },
  props: [
    'items',
    'model'
  ]
}
</script>

<style lang="scss" scoped>
  .component--collections-detail-items {
    margin-bottom: 5rem;
  }
</style>
