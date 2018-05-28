<template>
  <LayoutMain>
    <div class="page-dapps-detail">
      <DappDetail :dapp="dapp" :direct="direct"/>
    </div>
  </LayoutMain>
</template>

<script>
import axios from '~/helpers/axios'
import DappDetail from '~/components/DappDetail'
import * as constants from '~/helpers/constants'
import LayoutMain from '~/components/LayoutMain'

export default {
  data () {
    return {
      dapp: constants.dappSchema,
      direct: false
    }
  },
  asyncData ({ store, params, error }) {
    return axios
      .get('dapps/' + params.slug)
      .then(response => {
        const data = response.data
        const dapp = data.item
        if (!Object.keys(dapp).length > 0) {
          error({ statusCode: 404 })
        }
        return {
          dapp
        }
      })
  },
  head () {
    return {
      title: this.dapp.name + ' — State of the ÐApps',
      meta: [
        { hid: 'description', name: 'description', content: this.dapp.teaser }
      ]
    }
  },
  components: {
    DappDetail,
    LayoutMain
  }
}
</script>

