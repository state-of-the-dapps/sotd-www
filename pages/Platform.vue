<template lang="pug">
.page
  .hero-outer
    .hero-inner
      .hero-menu
        BaseMenu(
          :is-home="true"
          color="white"
        )
      .hero-content
        h1.hero-title {{ platformName($route.params.platform) }} 
  .content-wrapper
    .main-wrapper
      .ranking-wrapper
        h2.ranking-title.section-title
          span {{ platformName($route.params.platform) }} Rankings
        .ranking-table
          RankingTable(
            :dapps="dapps"
            :is-sortable="false"
          )
        .ranking-button-wrapper
          nuxt-link.ranking-button(
            :to="localePath({name: 'rankings-platform', params: {platform: $route.params.platform}})"
          ) View the full rankings
    .sidebar-wrapper
      .stats-wrapper
        h2.stat-title.section-title
          span {{ platformName($route.params.platform) }} Stats
        .stat-wrapper(v-if="stats")
          ul.stat-list
            li.stat-item
              span.stat-label Total DApps
              span.stat-data #[strong {{ stats.dappCount.toLocaleString() || '-' }}]
            li.stat-item
              span.stat-label Daily active users
              span.stat-data #[strong {{ stats.dappDau | abbreviateNumber(2) || '-' }}]
            li.stat-item
              span.stat-label Transactions (24h)
              span.stat-data #[strong {{ stats.dappTx24Hr | abbreviateNumber(2) || '-' }}]
            li.stat-item
              span.stat-label USD Volume (24h)
              span.stat-data #[strong ${{ stats.dappVol24Hr | abbreviateNumber(2) || '-' }}]
            li.stat-item
              span.stat-label Number of contracts
              span.stat-data #[strong {{ stats.dappContractCount | abbreviateNumber(2) || '-' }}]
          .stat-button-wrapper
            nuxt-link.stat-button(
              :to="localePath({name: 'stats-platform', params: {platform: $route.params.platform}})"
            ) View more stats
          h3.stat-title.section-title-2 DApps per Category
          ul.stat-list
            li.stat-item(v-for="category in stats.categories")
              span.stat-label {{ category.category | capitalize }}
              span.stat-data 
                nuxt-link(
                  v-if="category.dappCount"
                  :to="localePath({name: 'rankings-platform-category', params: {platform: $route.params.platform, category: category.category}})"
                ) #[strong {{ category.dappCount | abbreviateNumber(2) }}]
                span(v-else) -
          .stat-button-wrapper
            nuxt-link.stat-button(
              :to="localePath({name: 'stats-platform', params: {platform: $route.params.platform}})"
            ) View more stats
</template>

<script>
import { platformMap, rankingColumns } from '@/helpers/constants'
import { getDapps } from '@/helpers/api'
import BaseMenu from '@/components/BaseMenu'
import RankingTable from '@/components/RankingTable'

export default {
  components: {
    BaseMenu,
    RankingTable
  },
  data() {
    return {
      stats: null
    }
  },
  async asyncData({ params, query, app }) {
    const urlParams = { ...params, ...query }
    if (!query.sort) {
      urlParams.sort = 'rank'
      urlParams.order = 'asc'
      urlParams.limit = 10
    }
    let dapps = []
    let pager
    urlParams.view = 'rankings'
    try {
      const data = await getDapps(app.$axios, urlParams, app.$sentry)
      dapps = data.items
      pager = data.pager
    } catch (e) {
      this.$sentry.captureException(e)
    } finally {
      return { dapps, pager }
    }
  },
  async mounted() {
    const stats = await this.$axios.$get('stats')
    const platforms = stats.platforms
    const platformStats = platforms.find(
      platform => platform.platform === this.$route.params.platform
    )
    this.stats = platformStats
  },
  methods: {
    platformName(platform) {
      const platforms = platformMap()
      const name = platforms[platform]
      return name ? name : ''
    }
  },
  layout: 'home'
}
</script>

<style lang="scss" scoped>
.content {
  &-wrapper {
    padding-top: 2rem;
    padding-bottom: 2rem;
    @include margin-wrapper-main;
    @include tweakpoint('min-width', 900px) {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.hero {
  &-description {
    font-size: 1.2rem;
    width: 100%;
    max-width: 500px;
    margin-top: 0.5rem;
    margin-bottom: 0;
    @include tweakpoint('min-width', 1000px) {
      text-align: center;
      margin: 0 auto;
    }
  }
  &-inner {
    padding-top: 7px;
    padding-bottom: 2rem;
    @include margin-wrapper-main;
    max-width: initial !important;
  }
  &-outer {
    color: white;
    background-image: linear-gradient(to bottom, #3a2a6a, #7254d0);
    /deep/ a {
      color: white;
    }
  }
  &-title {
    @include title-1;
    font-size: 3.5rem;
    line-height: 0.825;
    margin: 1.5rem 0 0 0;
    letter-spacing: 0;
    text-transform: none;
    @include tweakpoint('min-width', 1000px) {
      font-size: 4rem;
      margin-top: 30px;
      margin-bottom: 10px;
      text-align: center;
    }
  }
}
.main {
  &-wrapper {
    margin-bottom: 1rem;
    @include tweakpoint('min-width', 900px) {
      flex: 1;
    }
  }
}
.page {
  padding-bottom: 25px;
}
.ranking {
  &-button {
    @include button;
    &-wrapper {
      text-align: center;
      padding: 20px;
    }
  }
  &-table {
    /deep/ .wrapper,
    /deep/ .table {
      margin: 0 !important;
      max-width: 100%;
      width: 100%;
    }
    /deep/ .col-platform,
    /deep/ .col-dev {
      display: none !important;
    }
  }
}
.section {
  &-title {
    @include font-display;
    display: flex;
    align-items: center;
    font-size: 2rem;
    padding-bottom: 0.25rem;
    margin: 0;
    font-weight: 300;
    &.zh {
      font-weight: 400;
    }
  }
}
.sidebar {
  &-wrapper {
    margin: 0 auto;
    width: 100%;
    max-width: 350px;
    @include tweakpoint('min-width', 900px) {
      padding-left: 30px;
    }
  }
}
.stat {
  &-button {
    &-wrapper {
      text-align: right;
    }
  }
  &-item {
    border-top: 1px solid rgba($color--black, 0.2);
    padding: 0.5rem 0;
    display: flex;
    &:last-child {
      border-bottom: 1px solid rgba($color--black, 0.2);
    }
  }
  &-label {
    flex: 1;
  }
  &-list {
    margin: 1rem 0;
  }
}
</style>
