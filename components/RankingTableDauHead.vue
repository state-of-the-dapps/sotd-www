<template>
  <div class="component-ranking-table-dau-head">
    <span class="label">Users (24hr)</span>
    <Help 
      :bottom="true"
      text="Daily Active Users, or DAU (unique source addresses in transactions to ÐApp contracts)"/>
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
