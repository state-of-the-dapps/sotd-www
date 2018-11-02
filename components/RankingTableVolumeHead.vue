<template>
  <div class="component-ranking-table-volume-head">
    <span class="label">Volume (7d)</span>
    <Help
      :bottom="true"
      text="Transaction volume to ÐApp contracts"/>
  </div>
</template>

<script>
import Help from './Help'

export default {
  components: {
    Help
  }
}
</script>
