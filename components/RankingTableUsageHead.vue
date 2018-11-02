<template>
  <div class="component-ranking-table-profile-head">
    <span class="label">User activity (30d)</span>
    <Help
      :reversed="true"
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

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-ranking-table-profile-head {
  text-align: right;
}
</style>
