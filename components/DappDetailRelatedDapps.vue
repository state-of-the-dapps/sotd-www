<template>
  <div class="component-DappDetailRelatedDapps">
    <div class="wrapper">
      <div class="wrapper-inner">
        <h2 class="title-2">{{ $t(namespace('title')) }}</h2>
        <DappCardList :dapps="dapps"/>
      </div>
    </div>
  </div>
</template>

<script>
import DappCardList from './DappCardList'

export default {
  components: {
    DappCardList
  },
  props: {
    dapps: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.title-2 {
  @include title-2;
  font-size: 2rem;
  margin-top: 0;
}

.wrapper-inner {
  max-width: 1200px;
  margin: 20px auto 60px auto;
}

.wrapper {
  @include margin-wrapper-main;
}
</style>
