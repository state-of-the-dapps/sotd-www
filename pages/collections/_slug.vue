<template>
  <div>
    <Lead 
      :description="collection.description"
      :curator="collection.curator"
      :linkUrl="collection.link.url"
      :linkText="collection.link.text"
      :name="collection.name"
    />
    <Items v-if="collection.items.length" 
      :items="collection.items"
      :model="collection.model"
    />
    <nuxt-child/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '~/helpers/axios'

import Lead from '~/components/collections/detail/lead'
import Items from '~/components/collections/detail/items'

export default {
  components: {
    Lead,
    Items
  },
  computed: {
    ...mapGetters('collections/detail', [
      'collection'
    ])
  },
  fetch ({ store, params, error }) {
    store.dispatch('setSiteSection', '')
    return axios
      .get('collections/' + params.slug)
      .then(response => {
        const collection = response.data
        if (!Object.keys(collection).length > 0) {
          error({ statusCode: 404 })
        } else {
          store.dispatch('collections/detail/setCollection', collection)
        }
      })
  },
  head () {
    return {
      title: this.collection.name + ' — State of the ÐApps',
      meta: [
        { hid: 'description', name: 'description', content: this.collection.description }
      ]
    }
  }
}
</script>
