<template>
  <LayoutMain>
    <div class="page-list">
      <div class="hero-wrapper">
        <h1 class="title-1">ÐApp List</h1>
        <p class="description">Check out the hottest ÐApps on the market</p>
      </div>
      <DappList/>
    </div>
  </LayoutMain>
</template>

<script>
import DappList from '~/components/DappList'
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    DappList,
    LayoutMain
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin-top: .5rem;
  text-align: center;
}

.hero-wrapper {
  @include margin-wrapper-main;
  padding: 4rem 0 3rem 0;
}

.page-list {
  padding-bottom: 50px;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
