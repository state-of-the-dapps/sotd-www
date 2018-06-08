<template>
  <LayoutMain>
    <div class="page-ranking">
      <div class="hero-wrapper">
        <h1 class="title-1">ÐApp Ranking</h1>
        <p class="description">Check out the hottest ÐApps on the market. Rank them by active users or weekly transaction volume.</p>
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
  margin: .5rem auto 0 auto;
  text-align: center;
  max-width: 400px;
}

.hero-wrapper {
  @include margin-wrapper-main;
  padding: 4rem 0 3rem 0;
}

.page-ranking {
  padding-bottom: 50px;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
