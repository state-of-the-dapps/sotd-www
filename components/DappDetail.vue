<template>
  <div>
    <Lead/>
    <StatusSocial/>
    <MainInfo/>
    <div class="container">
      <Tools/>
      <DappFeedback/>
    </div>
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

<style lang="scss" scoped>
@import '~assets/css/settings';

.container {
  @include tweakpoint('min-width', 1100px) {
    padding-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    padding-left: 160px;
    padding-right: 160px;
    &:first-child {
      flex-grow: 1;
    }
  }
  @include tweakpoint('min-width', 1250px) {
    justify-content: flex-start;
  }
}
</style>
