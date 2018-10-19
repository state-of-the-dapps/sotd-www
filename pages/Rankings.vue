<template>
  <LayoutMain>
    <div class="page-rankings">
      <div class="hero-wrapper">
        <h1 class="title-1">ÐApp Rankings</h1>
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
  },
  head () {
    return {
      title: 'State of the ÐApps — ÐApp List Ranked by Daily Active Users'
    }
  },
  scrollToTop: true
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
  padding: 3rem 0 2rem;
}

.page-rankings {
  padding-bottom: 50px;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
