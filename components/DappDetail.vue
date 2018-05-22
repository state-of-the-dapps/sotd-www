<template>
  <div class="component-DappDetail">
    <DappDetailBody/>
    <DappDetailRelatedDapps/>
  </div>
</template>

<script>
import DappDetailBody from './DappDetailBody'
import DappDetailRelatedDapps from './DappDetailRelatedDapps'

export default {
  components: {
    DappDetailBody,
    DappDetailRelatedDapps
  }
}
</script>
