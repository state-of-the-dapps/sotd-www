<template>
  <LayoutMain>
    <div>
      <Lead 
        :description="collection.description"
        :curator="collection.curator"
        :link-text="collection.link.text"
        :link-url="collection.link.url"
        :name="collection.name"
      />
      <div class="dapp-wrapper">
        <DappCardList :dapps="collection.items"/>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutMain from '~/components/LayoutMain'
import Lead from '~/components/collections/detail/Lead'
import DappCardList from '~/components/DappCardList'

export default {
  components: {
    DappCardList,
    LayoutMain,
    Lead
  },
  computed: {
    ...mapGetters('collections/detail', ['collection'])
  },
  fetch({ store, params, error, app }) {
    store.dispatch('setSiteSection', 'collections')
    return app.$axios.get('collections/' + params.slug).then(response => {
      const collection = response.data
      if (!Object.keys(collection).length > 0) {
        error({ statusCode: 404 })
      } else {
        store.dispatch('collections/detail/setCollection', collection)
      }
    })
  },
  head() {
    return {
      title: this.collection.name + ' — State of the ÐApps',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.collection.description
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.dapp-wrapper {
  @include margin-wrapper-main;
}
</style>
