<template>
  <div class="component-SecondaryCta">
    <SecondaryCtaMailingList/>
    <SecondaryCtaMetamask/>
    <SecondaryCtaScatter/>
  </div>
</template>

<script>
import SecondaryCtaMailingList from './SecondaryCtaMailingList'
import SecondaryCtaMetamask from './SecondaryCtaMetamask'
import SecondaryCtaScatter from './SecondaryCtaScatter'

export default {
  components: {
    SecondaryCtaMailingList,
    SecondaryCtaMetamask,
    SecondaryCtaScatter
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-SecondaryCta {
  background-image: $gradient--main-1;
  color: lighten($color--white, 100%);
  overflow: hidden;
  text-align: center;
  margin-top: 10px;
  @include tweakpoint('min-width', 575px) {
    background-image: $gradient--main-2;
  }
}
</style>
