<template>
  <LayoutMain>
    <div 
      class="page-dapps-detail" 
      itemscope 
      itemtype="http://schema.org/Product">
      <DappDetail 
        :dapp="dapp" 
        :direct="direct"/>
    </div>
  </LayoutMain>
</template>

<script>
import { mapGetters } from 'vuex'
import DappDetail from '~/components/DappDetail'
import * as constants from '~/helpers/constants'
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    DappDetail,
    LayoutMain
  },
  data() {
    return {
      dapp: constants.dappSchema,
      direct: false
    }
  },
  computed: {
    ...mapGetters(['pageModal'])
  },
  asyncData({ store, params, error, app, redirect }) {
    return app.$axios.get('dapps/' + params.slug).then(response => {
      const data = response.data
      const status = response.status
      const dapp = data.item
      if (!Object.keys(dapp).length > 0) {
        error({ statusCode: 404 })
        return
      }
      if (dapp.slug && dapp.slug !== params.slug) {
        const redirectPath =
          `/dapps/${dapp.slug}` || constants.dappFallbackRedirectPath
        redirect(301, redirectPath)
        return
      }
      return {
        dapp
      }
    })
  },
  head() {
    return {
      title: this.dapp.name + ' — ' + this.dapp.teaser || 'State of the ÐApps',
      meta: [
        { hid: 'description', name: 'description', content: this.dapp.teaser },
        { hid: 'image', property: 'og:image', content: this.dapp.productImage }
      ]
    }
  }
}
</script>
