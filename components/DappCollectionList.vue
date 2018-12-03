<template>
  <div class="component-DappCollectionList">
    <h3 class="title-3">
      <nuxt-link 
        :to="{ name: 'collections-slug', params: { slug: collection.slug } }" 
        class="link" 
        @click.native="trackCollectionView(collection.slug)">{{ collection.name }} <span class="cta">View all <SvgIconChevron 
          :width="8" 
          :height="8" 
          direction="right" /></span></nuxt-link>
    </h3>
    <media :query="{minWidth: 1250}">
      <DappCardList 
        :dapps="dapps.slice(0,4)" 
        :source-collection="collection.slug" />
    </media>
    <media :query="{maxWidth: 1250}">
      <DappCardList 
        :dapps="dapps" 
        :source-collection="collection.slug" />
    </media>
  </div>
</template>

<script>
import { trackCollectionView } from '~/helpers/mixpanel'
import Media from 'vue-media'
import DappCardList from './DappCardList'
import SvgIconChevron from './SvgIconChevron'

export default {
  components: {
    DappCardList,
    Media,
    SvgIconChevron
  },
  props: {
    collection: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      dapps: [],
      sourcePath: this.$route.path
    }
  },
  mounted() {
    this.$axios.get('collections/' + this.collection.slug).then(response => {
      const collection = response.data
      const dapps = collection.items
      this.dapps = dapps.slice(0, 6)
    })
  },
  methods: {
    trackCollectionView(slug) {
      const sourceComponent = 'DappCollectionList'
      const targetCollection = slug
      const action = trackCollectionView(
        sourceComponent,
        this.sourcePath,
        targetCollection
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappCollectionList {
  border-top: 1px solid rgba($color--black, 0.15);
  padding-bottom: 20px;
}

.cta {
  display: inline-block;
  font-family: 'Overpass';
  font-size: 1rem;
  letter-spacing: -0.25px;
  margin-left: 10px;
  text-decoration: none;
  font-weight: 300;
}

.link {
  text-decoration: none;
}

.title-3 {
  font-size: 1.35rem;
  font-weight: 600;
  margin-top: 2.2rem;
  margin-bottom: 0.2rem;
  letter-spacing: -0.5px;
}
</style>
