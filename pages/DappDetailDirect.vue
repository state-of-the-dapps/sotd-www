<template>
  <div class="page-dapps-detail">
    <DappDetail :direct="true"/>
  </div>
</template>

<script>
import { setDappDetailPage } from '~/helpers/mixins'
import DappDetail from '~/components/DappDetail'

export default {
  components: {
    DappDetail
  },
  mixins: [setDappDetailPage]
}
</script>
