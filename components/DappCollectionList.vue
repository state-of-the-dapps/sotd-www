<template>
  <div class="DappCollectionList">
    <h3 class="title-3">
      <nuxt-link 
        :to="localePath({ name: 'collection-detail', params: { slug: collection.slug } })" 
        class="link" 
        @click.native="trackCollectionView(collection.slug)"><span>{{ $t(`collections.${collection.name.replace(/\s/g,'-')}`) }}</span> <span class="cta">{{ $t('cta.viewAll') }} <IconChevron 
          :width="8" 
          :height="8" 
          direction="right" /></span></nuxt-link>
    </h3>
    <media :query="{minWidth: 1250}">
      <DappCardList 
        :dapps="dapps" 
        :source-collection="collection.slug" />
    </media>
    <media :query="{maxWidth: 1250}">
      <DappCardList 
        :dapps="dapps.slice(0,6)" 
        :source-collection="collection.slug" />
    </media>
  </div>
</template>

<script>
import { trackCollectionView } from '~/helpers/mixpanel'
import { homeCollectionSlots } from '~/helpers/constants'
import Media from 'vue-media'
import DappCardList from './DappCardList'
import IconChevron from './IconChevron'

export default {
  components: {
    DappCardList,
    Media,
    IconChevron
  },
  props: {
    collection: {
      type: Object,
      required: true,
      default: () => ({
        items: []
      })
    }
  },
  data() {
    return {
      dapps: [],
      sourcePath: this.$route.path
    }
  },
  mounted() {
    this.$axios
      .get(
        'collections/' + this.collection.slug + '?limit=' + homeCollectionSlots
      )
      .then(response => {
        const collection = response.data
        const dapps = collection.items
        this.dapps = dapps.slice(0, homeCollectionSlots)
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
.cta {
  @include font-text;
  font-size: 1rem;
  letter-spacing: -0.15px;
  margin-left: 10px;
  text-decoration: none;
  font-weight: normal;
  margin-top: 2px;
}

.link {
  @include font-display;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.6rem;
}

.title-3 {
  font-size: 1.35rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.2rem;
  letter-spacing: -0.5px;
}
</style>
