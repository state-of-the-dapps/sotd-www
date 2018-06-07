<template>
  <LayoutMain>
    <div>
      <Search/>
      <CountRefine/>
      <div class="dapp-wrapper">
        <DappCardList :dapps="dapps" />
      </div>
      <Pager/>
    </div>
  </LayoutMain>
</template>

<script>
  import CountRefine from '~/components/dapps/list/CountRefine.vue'
  import Collections from '~/components/dapps/list/Collections.vue'
  import DappCardList from '~/components/DappCardList'
  import LayoutMain from '~/components/LayoutMain'
  import Pager from '~/components/dapps/list/Pager.vue'
  import Search from '~/components/dapps/list/Search.vue'

  export default {
    components: {
      Collections,
      CountRefine,
      DappCardList,
      LayoutMain,
      Pager,
      Search
    },
    computed: {
      dapps () {
        return this.$store.getters['dapps/list/items']
      },
      dappCount () {
        return this.$store.getters['dapps/list/itemCount']
      },
      tabQuery () {
        return this.$store.getters['dapps/list/tabQuery']
      },
      statDappCount () {
        return this.$store.getters['statDappCount']
      },
      tagQuery () {
        return this.$store.getters['dapps/list/tagQuery']
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'dapps')
      this.$store.dispatch('dapps/list/setFriendlyQuery', this.$route.params)
      if (this.dappCount < 1) {
        this.$store.dispatch('dapps/list/fetchItems')
      }
    },
    head () {
      return {
        title: 'State of the ÐApps — ' + this.statDappCount.toLocaleString() + ' Projects Built on Ethereum'
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.dapp-wrapper {
  @include margin-wrapper-main;
}
</style>
