<template>
  <div class="component-DappDetailBody">
    <div class="wrapper -live">
      <DappDetailBodyHeading :direct="direct"/>
      <DappDetailBodyContent/>
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
  props: ['direct']
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
  margin: 20px auto;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba($color--black, .1);
  border-bottom: 10px solid $color--black;
  &.-live {
    border-color: $color--dapp-live;
  }
}
</style>

