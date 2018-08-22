<template>
<div class="component-DappCollectionList">
  <h3 class="title-3">
    <nuxt-link class="link" :to="{ name: 'collections-slug', params: { slug: collection.slug } }" @click.native="trackCollectionView(collection.slug)">{{ collection.name }} <span class="cta">View all <SvgIconChevron :width="8" :height="8" direction="right" /></span></nuxt-link>
  </h3>
  <media :query="{minWidth: 1250}">
    <DappCardList :dapps="dapps.slice(0,4)" :sourceCollection="collection.slug" />
  </media>
  <media :query="{maxWidth: 1250}">
    <DappCardList :dapps="dapps" :sourceCollection="collection.slug" />
  </media>
</div>
</template>

<script>
import { trackCollectionView } from '~/helpers/mixpanel'
import axios from '~/helpers/axios'
import Media from 'vue-media'
import DappCardList from './DappCardList'
import SvgIconChevron from './SvgIconChevron'

export default {
  components: {
    DappCardList,
    Media,
    SvgIconChevron
  },
  data () {
    return {
      dapps: [],
      sourcePath: this.$route.path
    }
  },
  methods: {
    trackCollectionView (slug) {
      const sourceComponent = 'DappCollectionList'
      const targetCollection = slug
      const action = trackCollectionView(sourceComponent, this.sourcePath, targetCollection)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  mounted () {
    axios
      .get('collections/' + this.collection.slug)
      .then(response => {
        const collection = response.data
        const dapps = collection.items
        this.dapps = dapps.slice(0, 6)
      })
  },
  props: {
    collection: {
      required: true,
      type: Object
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappCollectionList {
  border-top: 1px solid rgba($color--black, .15);
  padding-bottom: 20px;
}

.cta {
  display: inline-block;
  font-family: 'Overpass';
  font-size: 1rem;
  letter-spacing: -.25px;
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
  margin-bottom: .2rem;
  letter-spacing: -.5px;
}
</style>

