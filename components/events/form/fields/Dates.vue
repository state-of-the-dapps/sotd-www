<template>
  <div class="wrapper -component-events-form-fields-dates">
    <div class="wrapper -dates" @click="toggleDatePicker('start')">
      <img class="icon -dates" src="~/assets/images/icons/calendar.png" width="16">
      <span class="text -dates">
        <span v-if="start"><span class="date -dates">{{ start | formatDate('MMM D, YYYY') }}</span></span>
        <span v-else>Date <span class="required">(required)</span></span>
      </span>
      <DatePicker 
        type="start"
        parent="event-form"
        :isActive="startIsActive" 
        :selectedDate="start"
        @hide="toggleDatePicker('start')" 
        @selectDate="selectStartDate"
      />
    </div>
    <div class="wrapper -dates" :class="!start ? '--is-inactive' : ''" @click="toggleDatePicker('end')">
      <img class="icon -dates" src="~/assets/images/icons/calendar.png" width="16">
      <span class="text -dates">
        <span v-if="end"><span>To&nbsp; </span> <span class="date -dates">{{ end | formatDate('MMM D, YYYY') }}</span><img @click.stop="clearEndDate" class="clear -dates" src="~/assets/images/close/small.png" width="9" alt="Clear"></span>
        <span v-else>End date</span>
      </span>
      <DatePicker 
        type="end"
        parent="event-form"
        :isActive="endIsActive" 
        :selectedDate="end"
        @hide="toggleDatePicker('end')" 
        @selectDate="selectEndDate" 
      />
    </div>
  </div>
</template>

<script>
  import differenceInDays from 'date-fns/difference_in_days'
  import DatePicker from '~/components/shared/DatePicker.vue'
  import { dispatchErrors } from '~/helpers/mixins'

  export default {
    data () {
      return {
        endIsActive: false,
        startIsActive: false
      }
    },
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
    },
    methods: {
      clearEndDate () {
        this.$store.dispatch('events/form/clearEndDate')
        this.endIsActive = false
      },
      selectStartDate (value) {
        const daysBetweenStartEnd = differenceInDays(this.end, value)
        if (!(daysBetweenStartEnd < 0)) {
          const field = {
            name: 'start',
            value: value
          }
          const errors = {
            field: 'dates',
            data: []
          }
          this.$store.dispatch('events/form/setDate', field)
          this.dispatchErrors(errors, 'events')
        }
      },
      selectEndDate (value) {
        const daysBetweenStartEnd = differenceInDays(value, this.start)
        if (!(daysBetweenStartEnd < 0)) {
          const field = {
            name: 'end',
            value: value
          }
          this.$store.dispatch('events/form/setDate', field)
        }
      },
      toggleDatePicker (picker) {
        if (picker === 'start') {
          this.startIsActive = !this.startIsActive
        }
        if (this.start && picker === 'end') {
          this.endIsActive = !this.endIsActive
        }
      }
    },
    mixins: [dispatchErrors]
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
    .-component-shared-datepicker {
      &.wrapper {
        bottom: 60px;
        left: 0;
        z-index: 15;
        &.-end {
          left: auto;
          right: 0;
        }
      }
    }
  }

  .-dates {
    &.clear {
      position: absolute;
      right: -16px;
      top: 2px;
    }
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
    &.date-text {
      text-decoration: none;
    }
    &.text {
      position: relative;
    }
  }
</style>
