<template>
  <div class="component-DappsFeaturedList">
    <div class="wrapper">
      <h2 class="title-2"><SvgIconFeatured/>Featured ÐApps <a href="#" class="view-all">View all <SvgIconChevron :width="8" :height="8" direction="right" /></a></h2>
      <div class="featured-list-wrapper">
        <ul class="featured-list">
          <DappsFeaturedListItem v-for="(dapp, index) in dapps" 
            :key="index"
            :dapp="dapp"
            :index="index"
          />
        </ul>
      </div>
      <div class="linkexchange">Linkexchange</div>
    </div>
  </div>
</template>

<script>
import axios from '~/helpers/axios'
import DappsFeaturedListItem from '~/components/DappsFeaturedListItem'
import SvgIconChevron from '~/components/SvgIconChevron'
import SvgIconFeatured from '~/components/SvgIconFeatured'

export default {
  components: {
    DappsFeaturedListItem,
    SvgIconChevron,
    SvgIconFeatured
  },
  data () {
    return {
      scrollIndex: 0,
      dapps: []
    }
  },
  mounted () {
    axios
      .get('collections/featured')
      .then(response => {
        const collection = response.data
        const dapps = collection.items
        this.dapps = dapps.slice(0, 3)
      })
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappsFeaturedList {
  margin-bottom: 30px;
}

.component-SvgIconFeatured {
  margin-right: 7px;
}

.featured-list-wrapper {
  overflow: hidden;
  position: relative;
  margin-left: -10px;
  margin-right: -10px;
}

.featured-list {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
    display: none;
  }
}

.featured-list-spacer {
  width: 10px;
}

.view-all {
  position: relative;
  bottom: 4px;
  display: inline-block;
  font-family: 'Overpass';
  font-size: 1rem;
  letter-spacing: -.25px;
  margin-left: 12px;
  text-decoration: none;
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
}
</style>

