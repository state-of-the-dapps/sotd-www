<template>
  <div class="RankingTableUsageHead">
    <span class="label">{{ $t('rankingColumns.user_activity_30d') }}</span>
    <Help
      :reversed="true"
      :bottom="true"
      :text="$t('userActivity30dHelp')"/>
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
