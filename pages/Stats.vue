<template>
  <LayoutMain>
    <div class="page-stats">
      <div class="hero-wrapper">
        <h1 class="title-1">ÐApp Statistics</h1>
        <p class="description">Stats are updated daily. Check back often to see the progress and development of the ÐApp ecosystem.</p>
        <Stats/>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import LayoutMain from '~/components/LayoutMain'
import Stats from '~/components/Stats'

export default {
  components: {
    LayoutMain,
    Stats
  },
  head() {
    return {
      title: 'State of the ÐApps — ÐApp Statistics',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Total ÐApps, Daily Active Users, ÐApps by Category and more...'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin: 0.5rem auto 4rem auto;
  text-align: center;
  max-width: 400px;
}

.hero-wrapper {
  @include margin-wrapper-main;
  padding: 3rem 0 2rem;
}

.page-stats {
  padding-bottom: 50px;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
