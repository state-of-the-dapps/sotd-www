<template>
  <div class="component-ranking-table-profile-head">
    <span class="label">Profile</span>
    <Help
      :bottom="true"
      text="How complete the profile of the ÐApp is"/>
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
