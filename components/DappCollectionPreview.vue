<template>
  <div class="component-DappCollectionPreview">
    <div class="wrapper">
      <h3 class="title-3">{{ collection.name }} <nuxt-link :to="{ name: 'collections-slug', params: { slug: collection.slug } }" class="view-all">View all <SvgIconChevron :width="8" :height="8" direction="right" /></nuxt-link></h3>
      <DappCards :dapps="dapps" />
    </div>
  </div>
</template>

<script>
import axios from '~/helpers/axios'
import DappCards from '~/components/DappCards'
import SvgIconChevron from '~/components/SvgIconChevron'

export default {
  components: {
    DappCards,
    SvgIconChevron
  },
  data () {
    return {
      dapps: []
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

.view-all {
  display: inline-block;
  font-family: 'Overpass';
  font-size: 1rem;
  letter-spacing: -.25px;
  margin-left: 12px;
  text-decoration: none;
  font-weight: 300;
}

.wrapper {
  @include margin-wrapper-main;
  border-top: 1px solid rgba($color--black, .15)
}

.title-3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-top: 2.25rem;
}
</style>

