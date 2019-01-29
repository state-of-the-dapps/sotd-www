<template>
  <div class="RankingTableProfileHead">
    <span class="label">Profile</span>
    <BaseHelp
      :bottom="true"
      text="How complete the profile of the DApp is"/>
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
