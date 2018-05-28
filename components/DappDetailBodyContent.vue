<template>
<div class="component-DappDetailBodyContent">
  <div class="wrapper">
    <div class="main">
      <DappDetailBodyContentImage v-if="dapp.productImage" :productImage="dapp.productImage"/>
      <DappDetailBodyContentDescription v-if="dapp.description" :description="dapp.description"/>
      <media :query="{maxWidth: 1000}">
        <div>
          <DappDetailBodyContentSites :dapp="dapp"/>
          <DappDetailBodyContentRecommend/>
        </div>
      </media>
      <DappDetailBodyContentModules :dapp="dapp"/>
    </div>
    <div class="actions-related">
      <media :query="{minWidth: 1000}">
        <div>
          <DappDetailBodyContentSites :dapp="dapp"/>
          <DappDetailBodyContentRecommend/>
        </div>
      </media>
      <DappDetailBodyContentBadges v-if="dapp.badges.length" :badges="dapp.badges"/>
      <DappDetailBodyContentTags v-if="dapp.tags.length" :tags="dapp.tags"/>
      <DappDetailBodyContentTools/>
    </div>
  </div>
</div>
</template>

<script>
import Media from 'vue-media'
import DappDetailBodyContentBadges from './DappDetailBodyContentBadges'
import DappDetailBodyContentDescription from './DappDetailBodyContentDescription'
import DappDetailBodyContentImage from './DappDetailBodyContentImage'
import DappDetailBodyContentModules from './DappDetailBodyContentModules'
import DappDetailBodyContentRecommend from './DappDetailBodyContentRecommend'
import DappDetailBodyContentSites from './DappDetailBodyContentSites'
import DappDetailBodyContentTags from './DappDetailBodyContentTags'
import DappDetailBodyContentTools from './DappDetailBodyContentTools'

export default {
  components: {
    DappDetailBodyContentBadges,
    DappDetailBodyContentDescription,
    DappDetailBodyContentImage,
    DappDetailBodyContentModules,
    DappDetailBodyContentRecommend,
    DappDetailBodyContentSites,
    DappDetailBodyContentTags,
    DappDetailBodyContentTools,
    Media
  },
  props: {
    dapp: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.wrapper {
  margin-bottom: 20px;
  @include tweakpoint('min-width', 1000px) {
    margin-bottom: 0;
    display: flex;
    padding: 75px;
  }
  @include tweakpoint('min-width', 1200px) {
    display: flex;
    padding: 75px 100px;
  }
}

.main {
  @include tweakpoint('min-width', 1000px) {
    flex: 1;
    padding-right: 10px;
  }  
}

.actions-related {
  @include tweakpoint('min-width', 1000px) {
    width: 190px;
    padding-left: 10px;
  }  
}
</style>
