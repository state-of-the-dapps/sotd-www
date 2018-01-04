<template>
  <div class="wrapper -component-events-detail-maininfo">
    <ul class="list -main">
      <li class="item -main --description">Description</li>
      <li class="item -main --schedule">Summary schedule</li>
      <li class="item -main">DApps featured in this event</li>
      <li class="item -main">Tags</li>
    </ul>
    <ul class="list -sidebar">
      <li class="item -sidebar">Map</li>
      <li class="item -sidebar">Organized by</li>
      <li class="item -sidebar">Registration</li>
      <li class="item -sidebar">Sponsors</li>
    </ul>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-component-events-detail-maininfo {
    &.wrapper {
      padding: 20px;
      max-width: 2000px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      @include tweakpoint('min-width', $tweakpoint--default) {
        flex-direction: row-reverse;
        padding-left: 160px;
        padding-right: 160px;
      }
    }
  }

  .-main {
    &.list {
      flex-grow: 1;
    }
    &.item {
      margin-bottom: 20px;
    }
  }

  .-sidebar {
    &.list {
      @include tweakpoint('min-width', $tweakpoint--default) {
        width: 250px;
        margin-right: 20px;
      }
    }
    &.item {
      margin-bottom: 20px;
    }
  }
</style>
