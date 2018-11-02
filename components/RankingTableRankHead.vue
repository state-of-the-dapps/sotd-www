<template>
  <div class="component-ranking-table-rank-head">
    <span class="label">#</span>
    <Help
      :bottom="true"
      :reversed="true"
      text="The default rank is based on DAU, or Daily Active Users (unique source addresses in transactions to ÐApp contracts)"/>
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
