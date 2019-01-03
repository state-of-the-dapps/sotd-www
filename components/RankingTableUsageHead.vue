<template>
  <div class="component-ranking-table-usage-head">
    <span class="label">{{ $t('userActivity30d') }}</span>
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
