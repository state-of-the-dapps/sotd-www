<template>
<div class="component-DappDetailBodyContent">
  <div class="wrapper">
    <div class="main">
      <DappAlert v-if="dapp.alert" :alert="dapp.alert"/>
      <DappDetailBodyContentImage v-if="dapp.productImage" :productImage="dapp.productImage"/>
      <DappDetailBodyContentDescription v-if="dapp.description" :description="dapp.description"/>
      <media :query="{maxWidth: 1000}">
        <div>
          <DappDetailBodyContentCtas :dapp="dapp"/>
        </div>
      </media>
      <DappDetailBodyContentModules :dapp="dapp"/>
    </div>
    <div class="actions-related">
      <media :query="{minWidth: 1000}">
        <div>
          <DappDetailBodyContentCtas :dapp="dapp"/>
        </div>
      </media>
      <DappDetailBodyContentRecommend
        :slug="dapp.slug"
        :rating="dapp.stats.star_rating"
        :votes="dapp.stats.votes"
        :positive="dapp.stats.positive"
        :neutral="dapp.stats.netural"
        :negative="dapp.stats.negative"/>
      <DappDetailBodyContentRank v-if="dapp.rank" :rank="dapp.rank"/>
      <DappProfile v-if="dapp.profileScore" :profile-score="dapp.profileScore"/>
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
import DappAlert from './DappAlert'
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
import DappProfile from './DappProfile'

export default {
  components: {
    DappAlert,
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
    DappProfile,
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
