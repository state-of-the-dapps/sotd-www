<template>
  <section class="component--dapps-list-collections">
    <div class="container">
      <ul class="list">
        <li v-for="(item, index) in items" :key="index" class="item">
          <nuxt-link :to="{ name: 'collections-slug', params: { slug: item.slug } }" class="link">
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('collections/featured', [
      'items'
    ])
  },
  mounted () {
    this.fetchItems()
  },
  methods: {
    ...mapActions('collections/featured', [
      'fetchItems'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .list {
    display: flex;
  }
  .item {
    flex: 1;
  }
  .link {
    display: block;
    text-align: center;
  }
</style>
