<template>
  <div class="component-ranking-table-mau-head">
    <span class="label">Users (30d)</span>
    <Help
      :bottom="true"
      text="Monthly Active Users, or MAU (unique source addresses in transactions to ÐApp contracts)"/>
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
