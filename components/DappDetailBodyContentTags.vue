<template>
  <div class="component-DappDetailBodyContentBadges">
    <div class="wrapper">
      <h4 class="subtitle">Tags</h4>
      <ul class="tag-list">
        <li 
          v-for="(tag, index) in formattedTags" 
          :key="index" 
          class="tag-item">
          <a 
            class="tag-link" 
            @click="findDappsByTag(tag)">{{ tag }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { trackDappTag } from '~/helpers/mixpanel'

export default {
  props: {
    slug: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: true
    }
  },
  computed: {
    formattedTags() {
      var tags
      tags = this.tags || []
      return this.$options.filters.removeEmptyArrayItems(tags)
    }
  },
  methods: {
    findDappsByTag(tag) {
      this.trackDappTag(tag)
      this.$store.dispatch('dapps/search/resetQuery')
      this.$store.dispatch('tags/selectItem', tag)
      this.$store.dispatch('dapps/search/addTagToQuery', tag)
      this.$store.dispatch('dapps/search/fetchItems')
      this.$store.dispatch('dapps/search/setFriendlyUrl').then(response => {
        document.getElementById('__nuxt').scrollIntoView()
      })
    },
    trackDappTag(name) {
      const action = trackDappTag(name, this.slug)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.subtitle {
  font-weight: 300;
  margin-bottom: 0.75rem;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
  justify-content: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.tag-link {
  text-decoration: none;
  display: block;
  padding: 5px 8px;
  margin: 4px;
  background: lighten($color--gray, 2%);
  border-radius: 4px;
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
