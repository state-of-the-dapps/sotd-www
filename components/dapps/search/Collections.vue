<template>
  <section 
    v-if="items.length" 
    class="component--dapps-list-collections">
    <div class="container">
      <div class="heading-wrapper">
        <h2 class="heading">Featured ÐApp Collections</h2>
        <p class="description">Start exploring decentralized applications with these collections</p>
      </div>
      <ul class="list">
        <nuxt-link 
          v-for="(item, index) in items" 
          :to="{ name: 'collections-slug', params: { slug: item.slug } }" 
          :key="index" 
          tag="li" 
          class="item" 
          @click.native="trackCollection(item)">
          <img 
            v-if="item.slug in collectionIcons" 
            :src="require('~/assets/images/icons/collection-' + collectionIcons[item.slug] + '.png')" 
            class="image">{{ item.name }}
        </nuxt-link>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      collectionIcons: {
        'best-of-metamask': 'metamask',
        'collectibles-hypetrain': 'collectibles-hypetrain',
        featured: 'featured',
        hottest: 'hottest',
        'mobile-friendly': 'mobile',
        'recently-added': 'recently-added',
        cryptogaming: 'cryptogaming',
        finance: 'finance',
        'top-weekly-users': 'top-weekly-users',
        'top-weekly-value': 'top-weekly-value'
      }
    }
  },
  computed: {
    ...mapGetters('collections/featured', ['items'])
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    ...mapActions('collections/featured', ['fetchItems']),
    trackCollection(collection) {
      this.$mixpanel.track('Collections - View', {
        collection: collection.name,
        collectionSlug: collection.slug,
        slug: 'home',
        method: 'featured'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.heading-wrapper {
  padding: 10px;
  padding-top: 0;
}

.description {
  margin-top: 0;
}

.heading {
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 5px;
}
.container {
  padding: 15px 10px;
}
.list {
  display: flex;
  flex-direction: column;
  @include tweakpoint('min-width', $tweakpoint--default) {
    flex-direction: row;
  }
}
.item {
  flex: 1;
  margin: 0 10px;
  background: rgba(white, 0.25);
  padding: 0 7px;
  height: 75px;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 25px 0 rgba($color--black, 0.12);
  overflow: hidden;
  font-size: 1.075rem;
  &:hover {
    cursor: pointer;
  }
}
.image {
  height: 61px;
  margin-right: 10px;
}
</style>
