<template>
  <div class="RankingTableMauHead">
    <span class="label">Users (30d)</span>
    <BaseHelp
      :bottom="true"
      text="Monthly Active Users, or MAU (unique source addresses in transactions to DApp contracts)"/>
  </div>
</template>

<script>
import BaseHelp from './BaseHelp'

export default {
  components: {
    BaseHelp
  }
}
</script>
