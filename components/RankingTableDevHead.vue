<template>
  <div class="component-ranking-table-dev-head">
    <span class="label">Github</span>
    <Help
      :bottom="true"
      text="The number of GitHub events that the project organization / repository generates. This includes code pushes, issues, pull requests, etc."/>
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
