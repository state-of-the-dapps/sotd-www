<template>
  <LayoutMain>
    <div class="page-rankings">
      <div class="filter-wrapper">
        <DappListFilter
          :important="true"
          :options="categoryOptions"
          :selected="category"
          all-text="All categories"
          filter="Category"
          title="Choose a category"
          @select="filterCategory"/>
        <DappListFilter
          :options="platformOptions"
          :selected="platform"
          all-text="All platforms"
          filter="Platform"
          title="Choose a platform"
          @select="filterPlatform"/>
      </div> 
      <RankingTable/>
    </div>
  </LayoutMain>
</template>

<script>
import { platformList } from '~/helpers/constants'
import { getCategories } from '~/helpers/api'
import DappListFilter from '~/components/DappListFilter'
import LayoutMain from '~/components/LayoutMain'
import RankingTable from '~/components/RankingTable'

export default {
  components: {
    DappListFilter,
    LayoutMain,
    RankingTable
  },
  data () {
    return {
      dappPlatforms: platformList,
      dappCategories: [],
      sourcePath: this.$route.path
    }
  },
  computed: {
    categoryOptions () {
      const options = this.dappCategories.map(x => {
        const optionObj = {
          text: x.name,
          selection: x.slug
        }
        return optionObj
      })
      return options
    },
    platformOptions () {
      const options = this.dappPlatforms.map(x => {
        const optionObj = {
          text: x,
          selection: x.toLowerCase()
        }
        return optionObj
      })
      return options
    }
  },
  head () {
    return {
      title: 'State of the ÐApps — Ranking the Best Ethereum, EOS, and POA ÐApps'
    }
  },
  scrollToTop: true
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.filter-wrapper {
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-rankings {
  padding-top: 25px;
  padding-bottom: 50px;
}
</style>
