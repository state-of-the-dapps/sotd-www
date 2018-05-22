<template>
  <div class="page-dapps-detail">
    <DappDetail :direct="true"/>
  </div>
</template>

<script>
import DappDetail from '~/components/DappDetail'

export default {
  components: {
    DappDetail
  }
}
</script>
