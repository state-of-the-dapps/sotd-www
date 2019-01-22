<template>
  <div class="RankingTableUsageHead">
    <span class="label">{{ $t('rankingColumns.user_activity_30d') }}</span>
    <BaseHelp
      :reversed="true"
      :bottom="true"
      :text="$t('userActivity30dHelp')"/>
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
