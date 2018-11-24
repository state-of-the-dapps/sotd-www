<template>
  <div class="component-DappDetailBody">
    <div 
      :class="dapp.categories.length ? '-' + dapp.categories[0] : ''" 
      class="wrapper">
      <DappDetailBodyHeading
        :direct="direct"
        :icon-url="dapp.iconUrl"
        :name="dapp.name"
        :category="dapp.categories.length ? dapp.categories[0] : ''"
        :teaser="dapp.teaser"/>
      <DappDetailBodyContent :dapp="dapp" />
    </div>
  </div>
</template>

<script>
import DappDetailBodyContent from './DappDetailBodyContent'
import DappDetailBodyHeading from './DappDetailBodyHeading'

export default {
  components: {
    DappDetailBodyContent,
    DappDetailBodyHeading
  },
  props: {
    dapp: {
      type: Object,
      required: true
    },
    direct: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappDetailBody {
  @include margin-wrapper-main;
}

.wrapper {
  background: lighten($color--white, 100%);
  max-width: 1200px;
  margin: 20px auto 40px auto;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba($color--black, 0.1);
  border-bottom: 10px solid $color--black;
  @include category-border-colors;
}
</style>
