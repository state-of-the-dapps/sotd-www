<template>
  <div class="PageStats">
    <div class="hero-wrapper">
      <PageHeading :title="$t('Stats.title')"/>
      <p class="description">{{ $t('Stats.description') }}</p>
      <p class="button-wrapper">
        <BaseButton
          :text="$t('Stats.askUs')"
          @clickButton="openIntercom"/>
      </p>
      <Stats
        :growth-data="growth"
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
import { openIntercom } from '@/helpers/mixins'
import BaseButton from '@/components/BaseButton'
import PageHeading from '@/components/PageHeading'
import Stats from '@/components/Stats'

export default {
  components: {
    BaseButton,
    PageHeading,
    Stats
  },
  mixins: [openIntercom],
  data() {
    return {
      growth: [],
      stats: {}
    }
  },
  asyncData({ app, params, error }) {
    let statsDefault = app.$axios.get('stats')
    let statsGrowth = app.$axios.get('stats/growth', {
      params: {
        category: params.category,
        platform: params.platform
      }
    })
    return Promise.all([statsDefault, statsGrowth])
      .then(([resStatsDefault, resStatsGrowth]) => {
        return {
          stats: resStatsDefault.data,
          growth: resStatsGrowth.data
        }
      })
      .catch(e => {
        error({ statusCode: 404 })
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
.PageStats {
  padding-bottom: 50px;
}

.button-wrapper {
  text-align: center;
}

.description {
  margin: 0.5rem auto 0 auto;
  text-align: center;
  max-width: 400px;
}

.hero-wrapper {
  @include margin-wrapper-main;
  padding: 0 0 2rem;
}
</style>
