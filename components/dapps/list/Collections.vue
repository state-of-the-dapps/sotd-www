<template>
    <section class="section">
        <div class="container">
            <ul class="collection-list">
                <li v-for="(item, index) in items" :key="index">{{ item.name }}</li>
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
