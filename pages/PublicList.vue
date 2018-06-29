<template>
  <LayoutMain>
    <div class="page-public-list">
      <div class="heading-wrapper">
        <h1 class="title-1">{{ name || 'Whoops, there\'s no list here' }}</h1>
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
      name: ''
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
  asyncData ({ params, error }) {
    return axios
      .get('lists/' + params.list_url)
      .then(response => {
        const data = response.data
        const dapps = data.dapps
        const name = data.name
        return {
          dapps,
          name
        }
      })
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin: .5rem auto 0 auto;
  text-align: center;
  max-width: 700px;
}

.instructions-image {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: block;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba($color--black, .15);
}

.wrapper, .heading-wrapper {
  @include margin-wrapper-main;
}

.heading-wrapper {
  padding: 3rem 0 3rem 0;
}

.page-public-list {
  margin-bottom: 50px;
}

.notice {
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba($color--black, .1);
  line-height: 1.4;
  font-size: 1rem;
  text-align: center;
  max-width: 700px;
  margin: 25px auto 35px;
  padding: 10px;
  background: lighten($color--white, 100%);
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
