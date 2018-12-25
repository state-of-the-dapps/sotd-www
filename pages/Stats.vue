<template>
  <div class="page-stats">
    <div class="hero-wrapper">
      <h1 class="title-1">ÐApp Statistics</h1>
      <p class="description">Stats are updated daily. Check back often to see the progress and development of the ÐApp ecosystem.</p>
      <Stats
        :stat-categories="stats.categories"
        :stat-dapp-contract-count="stats.dappContractCount"
        :stat-dapp-count="statDappCount"
        :stat-dapp-dau="stats.dappDau"
        :stat-dapp-tx24-hr="stats.dappTx24Hr"
        :stat-platforms="stats.platforms"
        :stat-statuses="stats.statuses"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Stats from '~/components/Stats'

export default {
  components: {
    Stats
  },
  data() {
    return {
      stats: {}
    }
  },
  asyncData({ app }) {
    return app.$axios.get('stats').then(response => {
      const data = response.data
      return { stats: data }
    })
  },
  computed: {
    ...mapGetters(['statDappCount'])
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
