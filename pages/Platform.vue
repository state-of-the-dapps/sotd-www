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
        h1.hero-title Ethereum
        p.hero-description Ethereum is a global, open-source platform for decentralized applications. On Ethereum, you can write code that controls digital value, runs exactly as programmed, and is accessible anywhere in the world.
  .content-wrapper
    .main-wrapper
      .ranking-wrapper
        h2.ranking-title.section-title
          span Rankings
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
        h2.rankings-title.section-title
          span Stats
</template>

<script>
import { rankingColumns } from '~/helpers/constants'
import { getDapps } from '~/helpers/api'
import BaseMenu from '@/components/BaseMenu'
import RankingTable from '@/components/RankingTable'

export default {
  components: {
    BaseMenu,
    RankingTable
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
    padding-bottom: 3rem;
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
    margin: 1.5rem 0 0.75rem 0;
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
    /deep/ .col-platform {
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
    @include tweakpoint('min-width', 900px) {
      width: 350px;
      padding-left: 30px;
    }
  }
}
</style>
