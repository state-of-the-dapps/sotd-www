<template>
  <div class="component-DappDetail">
    <DappDetailBody :direct="direct"/>
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
  },
  props: ['direct']
}
</script>
