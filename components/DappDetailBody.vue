<template>
  <div class="component-DappDetailBody">
    <div class="wrapper -live">
      <DappDetailBodyHeading
        :direct="direct"
        :name="dapp.name"
        :status="dapp.status"
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
      required: true
    },
    direct: {
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
  margin: 20px auto 60px auto;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba($color--black, .1);
  border-bottom: 10px solid $color--black;
  &.-live {
    border-color: $color--dapp-live;
  }
}
</style>
