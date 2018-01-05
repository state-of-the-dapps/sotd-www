<template>
  <div class="wrapper -component-events-detail-maininfo">
    <ul class="list -main">
      <li class="item -main --description">
        <p>Description</p>
      </li>
      <li class="item -main --schedule">
        <h2 class="heading -main">Schedule highlights</h2>
      </li>
      <li class="item -main">
        <h3 class="sub-heading -main">DApps featured in this event</h3>
      </li>
      <li class="item -main">
        <h3 class="sub-heading -main">Tags</h3>
      </li>
    </ul>
    <ul class="list -sidebar">
      <li class="item -sidebar">
        <h3 class="sub-heading -sidebar">Location</h3>
      </li>
      <li class="item -sidebar">
        <h3 class="sub-heading -sidebar">Organizer</h3>
      </li>
      <li class="item -sidebar">
        <h3 class="sub-heading -sidebar">Registration</h3>
      </li>
      <li class="item -sidebar">
        <h3 class="sub-heading -sidebar">Sponsors</h3>
      </li>
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
      flex: 1;
    }
    &.heading {
      font-weight: 300;
      font-size: 1.4rem;
      margin: 0;
    }
    &.item {
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 0 20px rgba($color--mine-shaft, .1);
      &.--description {
        background: lighten($color--alabaster, 100%);
      }
      &.--schedule {
        background: lighten($color--alabaster, 100%);        
      }
      p {
        margin-top: 0;
        font-size: 1.2rem;
        line-height: 1.4;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    &.sub-heading {
      margin: 0;
      font-size: 1.15rem;
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
      padding: 15px;
      margin-bottom: 20px;
      background: rgba($color--alabaster, .25);
      box-shadow: 0 0 20px rgba($color--mine-shaft, .1);
    }
    &.sub-heading {
      font-size: 1.15rem;
      margin: 0;
      margin-bottom: .25rem;
    }
  }
</style>
