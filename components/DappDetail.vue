<template>
  <div>
    <Lead/>
    <StatusSocial/>
    <MainInfo/>
    <Tools/>
    <DappFeedback/>
    <Related/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { trackDappView } from '~/helpers/mixpanel'
import DappFeedback from '~/components/DappFeedback'
import MainInfo from '~/components/dapps/detail/MainInfo.vue'
import Lead from '~/components/dapps/detail/Lead.vue'
import Related from '~/components/dapps/detail/Related.vue'
import StatusSocial from '~/components/dapps/detail/StatusSocial.vue'
import Tools from '~/components/dapps/detail/Tools.vue'

export default {
  components: {
    DappFeedback,
    MainInfo,
    Lead,
    Related,
    StatusSocial,
    Tools
  },
  computed: {
    ...mapGetters('dapps/detail', {
      dapp: 'item'
    })
  },
  mounted () {
    console.log(this.dapp)
    if (this.directView) {
      const sourceCollection = ''
      const sourceComponent = ''
      const sourcePath = ''
      const targetDapp = this.dapp.slug
      const action = trackDappView(sourceCollection, sourceComponent, sourcePath, targetDapp)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  props: {
    directView: {
      default: false
    }
  }
}
</script>
