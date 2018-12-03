<template>
  <LayoutMain>
    <div class="page-public-list">
      <div class="heading-wrapper">
        <h1 class="title-1">{{ name }}</h1>
        <p class="description">A list of ÐApps made by a member of the community. You can <nuxt-link :to="{name: 'my-list'}">make your own list </nuxt-link> too!</p>
      </div>
      <div class="wrapper">
        <DappCardList :dapps="dapps"/>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import { trackPublicListView } from '~/helpers/mixpanel'
import DappCardList from '~/components/DappCardList'
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    DappCardList,
    LayoutMain
  },
  data() {
    return {
      dapps: [],
      name: '',
      sourcePath: this.$route.path,
      listUrl: ''
    }
  },
  head() {
    return {
      title: 'State of the ÐApps — ' + this.name + ' | A List of ÐApps',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A list of ÐApps made by a member of the community. You can make your own list too!'
        }
      ]
    }
  },
  asyncData({ params, error, app }) {
    return app.$axios.get('lists/' + params.list_url).then(response => {
      const data = response.data
      const dapps = data.dapps
      const name = data.name
      const listUrl = data.listUrl
      if (!dapps) {
        error({ statusCode: 404 })
      }
      return {
        dapps,
        listUrl,
        name
      }
    })
  },
  mounted() {
    const action = trackPublicListView(this.listUrl, this.sourcePath)
    this.$mixpanel.track(action.name, action.data)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin: 0.5rem auto 0 auto;
  text-align: center;
  max-width: 700px;
}

.instructions-image {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: block;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba($color--black, 0.15);
}

.wrapper,
.heading-wrapper {
  @include margin-wrapper-main;
}

.heading-wrapper {
  padding: 4rem 0 3rem 0;
}

.page-public-list {
  margin-bottom: 50px;
}

.notice {
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba($color--black, 0.1);
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
