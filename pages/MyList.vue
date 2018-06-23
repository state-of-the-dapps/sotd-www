<template>
  <LayoutMain>
    <div class="page-my-list">
      <div class="wrapper">
        <h1 class="title-1">My List</h1>
        <p class="description">Keep track of your personal list of ÐApps.</p>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    LayoutMain
  },
  head () {
    return {
      title: 'State of the ÐApps — Your Personal List of Favorite ÐApps'
    }
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

.wrapper {
  @include margin-wrapper-main;
  padding: 4rem 0 3rem 0;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
