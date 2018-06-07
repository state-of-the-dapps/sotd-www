<template>
<div class="component-DappCollectionList">
  <h3 class="title-3">
    <nuxt-link class="link" :to="{ name: 'collections-slug', params: { slug: collection.slug } }" @click.native="trackCollectionView(collection.slug)">{{ collection.name }} <span class="cta">View all <SvgIconChevron :width="8" :height="8" direction="right" /></span></nuxt-link>
  </h3>
  <DappCardList :dapps="dapps" :sourceCollection="collection.slug" />
</div>
</template>

<script>
import { trackCollectionView } from '~/helpers/mixpanel'
import axios from '~/helpers/axios'
import DappCardList from './DappCardList'
import SvgIconChevron from './SvgIconChevron'

export default {
  components: {
    DappCardList,
    SvgIconChevron
  },
  data () {
    return {
      dapps: []
    }
  },
  methods: {
    trackCollectionView (slug) {
      const sourceComponent = 'DappCollectionList'
      const sourcePath = this.$route.path
      const targetCollection = slug
      const action = trackCollectionView(sourceComponent, sourcePath, targetCollection)
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

