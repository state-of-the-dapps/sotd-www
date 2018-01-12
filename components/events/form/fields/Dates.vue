<template>
  <div class="wrapper -component-events-form-fields-dates">
    <div class="wrapper -dates">
      <img class="icon -dates" src=""><span class="text -dates">Start date <span class="required">(required)</span></span>
      <CalendarPopup/>
    </div>
    <div class="wrapper -dates">
      End date
      <CalendarPopup/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-component-events-form-fields-dates {
    &.wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      border: 1px solid transparent;
    }
  }

  .-dates {
    &.wrapper {
      box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
      background: rgba(lighten($color--gallery, 100%),.9);
      display: flex;
      align-items: center;
      height: 60px;
      width: 50%;
      padding: 0 20px;
      &:nth-child(1) {
        margin-right: 20px;
      } 
    }
  }
</style>
