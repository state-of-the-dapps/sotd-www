<template>
  <div class="wrapper -component-events-form-fields-dates">
    <div class="wrapper -dates">
      <img class="icon -dates" src="~/assets/images/icons/calendar.png" width="16">
      <span class="text -dates">
        <span v-if="start" class="date -dates">{{ start | formatDate('MMM D, YYYY') }}</span>
        <span v-else>Event date <span class="required">(required)</span></span>
      </span>
      <DatePicker/>
    </div>
    <div class="wrapper -dates" :class="!start ? '--is-inactive' : ''">
      <img class="icon -dates" src="~/assets/images/icons/calendar.png" width="16">
      <span class="text -dates">
        <span v-if="end" class="date -dates">{{ end | formatDate('MMM D, YYYY') }}</span>
        <span v-else>End date</span>
      </span>
      <DatePicker/>
    </div>
  </div>
</template>

<script>
  import DatePicker from '~/components/shared/DatePicker.vue'

  export default {
    components: {
      DatePicker
    },
    computed: {
      end () {
        return this.$store.getters['events/form/dateEnd']
      },
      start () {
        return this.$store.getters['events/form/dateStart']
      }
    }
  }
</script>

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
    &.date {
      text-decoration: underline;
    }
    &.wrapper {
      position: relative;
      cursor: pointer;
      box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
      background: rgba(lighten($color--gallery, 100%),.9);
      display: flex;
      align-items: center;
      height: 60px;
      width: 50%;
      padding: 0 20px;
      font-size: .95rem;
      &:nth-child(1) {
        margin-right: 10px;
      } 
      &.--is-inactive {
        cursor: initial;
        opacity: .5;
      }
    }
    &.icon {
      margin-right: 10px;
      position: relative;
      top: -1px;
    }
  }
</style>
