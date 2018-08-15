<template>
<div class="component-DappDetailBodyContent">
  <div class="wrapper">
    <div class="main">
      <DappDetailBodyContentImage v-if="dapp.productImage" :productImage="dapp.productImage"/>
      <DappDetailBodyContentDescription v-if="dapp.description" :description="dapp.description"/>
      <media :query="{maxWidth: 1000}">
        <div>
          <DappDetailBodyContentCtas :dapp="dapp"/>
          <DappDetailBodyContentRecommend :slug="dapp.slug"/>
        </div>
      </media>
      <DappDetailBodyContentModules :dapp="dapp"/>
    </div>
    <div class="actions-related">
      <media :query="{minWidth: 1000}">
        <div>
          <DappDetailBodyContentCtas :dapp="dapp"/>
          <DappDetailBodyContentRecommend :slug="dapp.slug"/>
        </div>
      </media>
      <DappDetailBodyContentRank v-if="dapp.rank" :rank="dapp.rank"/>
      <DappDetailBodyContentBadges v-if="dapp.badges && dapp.badges.length" :badges="dapp.badges"/>
      <DappDetailBodyContentCategories v-if="dapp.categories && dapp.categories.length" :slug="dapp.slug" :categories="dapp.categories"/>
      <DappDetailBodyContentTags v-if="dapp.tags && dapp.tags.length" :slug="dapp.slug" :tags="dapp.tags"/>
      <DappDetailBodyContentTools :name="dapp.name" :slug="dapp.slug"/>
      <DappDetailBodyContentMeta :name="dapp.name" :slug="dapp.slug"/>
    </div>
  </div>
</div>
</template>

<script>
import Media from 'vue-media'
import DappDetailBodyContentBadges from './DappDetailBodyContentBadges'
import DappDetailBodyContentCategories from './DappDetailBodyContentCategories'
import DappDetailBodyContentCtas from './DappDetailBodyContentCtas'
import DappDetailBodyContentDescription from './DappDetailBodyContentDescription'
import DappDetailBodyContentImage from './DappDetailBodyContentImage'
import DappDetailBodyContentMeta from './DappDetailBodyContentMeta'
import DappDetailBodyContentModules from './DappDetailBodyContentModules'
import DappDetailBodyContentRank from './DappDetailBodyContentRank'
import DappDetailBodyContentRecommend from './DappDetailBodyContentRecommend'
import DappDetailBodyContentTags from './DappDetailBodyContentTags'
import DappDetailBodyContentTools from './DappDetailBodyContentTools'

export default {
  components: {
    DappDetailBodyContentBadges,
    DappDetailBodyContentCategories,
    DappDetailBodyContentCtas,
    DappDetailBodyContentDescription,
    DappDetailBodyContentImage,
    DappDetailBodyContentMeta,
    DappDetailBodyContentModules,
    DappDetailBodyContentRank,
    DappDetailBodyContentRecommend,
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
