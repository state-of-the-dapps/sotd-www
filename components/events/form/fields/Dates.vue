<template>
  <div class="wrapper -component-events-form-fields-dates">
    <div class="wrapper -dates">
      <img class="icon -dates" src="~/assets/images/icons/calendar.png" width="16">
      <span class="text -dates">
        <span v-if="startDate">[start date]</span>
        <span v-else>Date <span class="required">(required)</span></span>
      </span>
      <CalendarPopup/>
    </div>
    <div class="wrapper -dates" :class="!startDate ? '--is-inactive' : ''">
      <img class="icon -dates" src="~/assets/images/icons/calendar.png" width="16">
      <span class="text -dates">
        <span v-if="endDate">[end date]</span>
        <span v-else>End date</span>
      </span>
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
        margin-right: 10px;
      } 
      &.--is-inactive {
        opacity: .5;
      }
    }
    &.icon {
      margin-right: 10px;
    }
  }
</style>
