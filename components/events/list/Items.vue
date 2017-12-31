<template>
  <section class="wrapper -events">
    <div class="wrapper -events">
      <ul class="list -events">
        <Item v-for="(item, index) in items" :key="index" :item="item" />
      </ul>
    </div>
  </section>
</template>

<script>
import Item from '~/components/events/list/items/Item.vue'

export default {
  components: {
    Item
  },
  computed: {
    items () {
      return this.$store.getters['events/list/items']
    }
  }
}
</script>

<style lang="scss" scoped>
  .-events {
    .list {
      margin: 25px 0;
    }
  }
</style>
