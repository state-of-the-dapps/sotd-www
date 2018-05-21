<template>
  <div class="component-DappDetailBody">
    <DappDetailBodyHeading/>
    <DappDetailBodyContent/>
  </div>
</template>

<script>
import DappDetailBodyContent from './DappDetailBodyContent'
import DappDetailBodyHeading from './DappDetailBodyHeading'

export default {
  components: {
    DappDetailBodyContent,
    DappDetailBodyHeading
  }
}
</script>
