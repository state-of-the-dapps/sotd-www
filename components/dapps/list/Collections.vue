<template>
  <section class="component--dapps-list-collections">
    <div class="container">
      <ul class="list">
        <nuxt-link v-for="(item, index) in items" :to="{ name: 'collections-slug', params: { slug: item.slug } }" tag="li" :key="index" class="item">
          {{ item.name }}
        </nuxt-link>
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
  @import '~assets/css/settings';

  .container {
    padding: 15px 10px;
  }
  .list {
    display: flex;
  }
  .item {
    flex: 1;
    margin: 0 10px;
    background: rgba($color--gallery, .2);
    padding: 0 10px;
    height: 75px;
    display: flex;
    align-items: center;
    box-shadow: 0 5px 25px 0 rgba($color--mine-shaft, .12);
  }
</style>
