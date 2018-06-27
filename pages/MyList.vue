<template>
  <LayoutMain>
    <div class="page-my-list">
      <div class="heading-wrapper">
        <h1 class="title-1">My List</h1>
        <p class="description">Create a list of ÐApps to share with your friends or visit later.</p>
      </div>
      <div class="wrapper">
        <DappCardList :dapps="dapps"/>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import axios from '~/helpers/axios'
import DappCardList from '~/components/DappCardList'
import LayoutMain from '~/components/LayoutMain'

export default {
  data () {
    return {
      dapps: [],
      listToken: ''
    }
  },
  components: {
    DappCardList,
    LayoutMain
  },
  head () {
    return {
      title: 'State of the ÐApps — Share Your List of ÐApps'
    }
  },
  mounted () {
    axios
      .get('lists/' + this.listToken)
      .then(response => {
        const dapps = response.data.items
        this.dapps = dapps
      })
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

.wrapper, .heading-wrapper {
  @include margin-wrapper-main;
}

.heading-wrapper {
  padding: 4rem 0 3rem 0;
}

.page-my-list {
  margin-bottom: 50px;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
