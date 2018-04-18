<template>
  <div>
    <Lead/>
    <StatusSocial/>
    <MainInfo/>
    <Tools/>
    <DappFeedback :dapp="dapp"/>
    <Related/>
  </div>
</template>

<script>
  import { setDappPage } from '~/helpers/mixins'
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
    mixins: [setDappPage]
  }
</script>
