<template>
  <DappDetail/>
</template>

<script>
import { setDappPage } from '~/helpers/mixins'
import DappDetail from '~/components/DappDetail'

export default {
  components: {
    DappDetail
  },
  mixins: [setDappPage]
}
</script>
