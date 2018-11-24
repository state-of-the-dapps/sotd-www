<template>
  <div class="component-DappDetail">
    <DappDetailBody 
      :dapp="dapp" 
      :direct="direct"/>
    <DappDetailRelatedDapps 
      v-if="dapp.relatedDapps.length" 
      :dapps="dapp.relatedDapps"/>
  </div>
</template>

<script>
import { trackDappView } from '~/helpers/mixpanel'
import DappDetailBody from './DappDetailBody'
import DappDetailRelatedDapps from './DappDetailRelatedDapps'

export default {
  components: {
    DappDetailBody,
    DappDetailRelatedDapps
  },
  props: {
    dapp: {
      type: Object,
      required: true
    },
    direct: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.direct) {
      const sourceCollection = ''
      const sourceComponent = ''
      const sourcePath = ''
      const targetDapp = this.dapp.slug
      const action = trackDappView(
        sourceCollection,
        sourceComponent,
        sourcePath,
        targetDapp
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>
