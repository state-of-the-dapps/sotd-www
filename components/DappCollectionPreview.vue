<template>
  <div class="component-DappCollectionPreview">
    <div class="wrapper">
      <h3 class="title-3">Collection name</h3>
      <DappCards/>
    </div>
  </div>
</template>

<script>
import DappCards from '~/components/DappCards'

export default {
  components: {
    DappCards
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.wrapper {
  @include margin-wrapper-main;
  border-top: 1px solid rgba($color--black, .15)
}

.title-3 {
  font-size: 1.1rem;
  font-weight: 300;
  margin-top: 2.25rem;
}
</style>

