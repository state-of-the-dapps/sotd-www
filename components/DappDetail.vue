<template>
  <div class="component-DappDetail">
    <DappDetailBody :dapp="dapp" :direct="direct"/>
    <DappDetailRelatedDapps :dapp="dapp"/>
  </div>
</template>

<script>
import DappDetailBody from './DappDetailBody'
import DappDetailRelatedDapps from './DappDetailRelatedDapps'

export default {
  components: {
    DappDetailBody,
    DappDetailRelatedDapps
  },
  props: {
    dapp: {
      required: true
    },
    direct: {
      default: false
    }
  }
}
</script>
