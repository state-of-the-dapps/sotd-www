<template>
  <div class="component-ranking-table-profile-head">
    <span class="dapp-name-head">Usage (30d)</span>
    <Help
      :bottom="true"
      text="Users (unique source addresses in transactions to ÐApp contracts) over the past 30 days"/>
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
