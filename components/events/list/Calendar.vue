<template>
  <section class="component -calendar">
    <div class="wrapper -calendar">
      <ul class="list -month">
        <li class="item -month --prev" @click="changeMonth(-1)"><span>{{ startOfMonthDate | addMonths(-1) | formatDate('MMM') }}</span></li>
        <li class="item -month --current"><span>{{ startOfMonthDate | formatDate('MMMM YYYY') }}</span></li>
        <li class="item -month --next" @click="changeMonth(1)"><span>{{ startOfMonthDate | addMonths(1) | formatDate('MMM') }}</span></li>
      </ul>
      <ul class="list -day-label">
        <li v-for="(day, index) in daysOfTheWeek" :key="index" class="item -day-label"><span>{{ day }}</span></li>
      </ul>
      <ul class="list -day">
        <li v-for="n in daysBeforeFirstDay" :key="n" class="item -day is-not-active"></li>
        <li v-for="(day, index) in days" :key="day | formatDate('YYYY-MM-DD')" @click="selectDate(day.date)" class="item -day" :class="{ 'is-today': isToday(day.date), 'is-selected': isSelected(day.date) }">
          <span>{{ index + 1 }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import addDays from 'date-fns/add_days'
  import addMonths from 'date-fns/add_months'
  import formatDate from 'date-fns/format'
  import getDay from 'date-fns/get_day'
  import getDaysInMonth from 'date-fns/get_days_in_month'
  import startOfMonth from 'date-fns/start_of_month'
  import { daysOfTheWeek } from '~/helpers/constants'

  export default {
    data () {
      return {
        days: [],
        daysOfTheWeek,
        daysBeforeFirstDay: '',
        startOfMonthDate: '',
        today: ''
      }
    },
    computed: {
      selectedDate () {
        return this.$store.getters['events/list/dateStartQuery']
      }
    },
    methods: {
      changeMonth (num) {
        this.startOfMonthDate = addMonths(this.startOfMonthDate, num)
        this.setupMonth()
      },
      initializeCalendar () {
        this.today = formatDate(Date.now(), 'YYYY-MM-DD')
        this.startOfMonthDate = formatDate(startOfMonth(this.selectedDate), 'YYYY-MM-DD')
        this.setupMonth()
      },
      isSelected (date) {
        return this.selectedDate === date
      },
      isToday (date) {
        return this.today === date
      },
      selectDate (date) {
        this.$store.dispatch('events/list/setDateStartQuery', date)
      },
      setupMonth () {
        this.days = []
        this.daysBeforeFirstDay = getDay(this.startOfMonthDate)
        const daysInMonth = getDaysInMonth(this.startOfMonthDate)
        let days = []
        let i = 0
        while (i < daysInMonth) {
          let currentDate = formatDate(addDays(this.startOfMonthDate, i), 'YYYY-MM-DD')
          days.push(
            {
              date: currentDate
            }
          )
          i++
        }
        this.days = days
      }
    },
    mounted () {
      this.initializeCalendar()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-calendar {
    &.component {
      max-width: 350px;
      margin: 0 auto 20px;
    }
    &.wrapper {
      padding: 0 10px;
      user-select: none;
    }
  }

  .-day {
    &.list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      filter: drop-shadow(0 0 10px rgba($color--mine-shaft,.05));
    }
    &.item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      width: calc(14.28571429% - 1px);
      box-sizing: content-box;
      height: 47px;
      background: lighten($color--gallery, 20%);
      border-right: 1px solid rgba($color--mine-shaft, .1);
      border-top: 1px solid rgba($color--mine-shaft, .1);
      cursor: pointer;
      &:nth-child(-n+7) {
        border-top: none;
      }
      &:last-child {
        border-right: none;
      }
      &:nth-child(7n + 7) {
        border-right: none;
      }
      &:hover {
        text-decoration: underline;
      }
      &.is-not-active {
        background: none;
        border-color: transparent;
      }
      &.is-today {
        font-weight: 700;
      }
      &.is-selected {
        background: $color--mine-shaft;
        color: $color--gallery;
        margin-left: -1px;
        padding-right: 1px;
        &:nth-child(7n + 1) {
          margin-left: 0;
          padding-right: 0;
        }
        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  .-day-label {
    &.list {
      display: flex;
      align-items: center;
      padding: 10px 0;
    }
    &.item {
      width: 14.28571429%;
      text-align: center;
      font-size: .75rem;
      text-transform: uppercase;
    }
  }

  .-month {
    &.list {
      display: flex;
      box-shadow: 0 0 5px rgba($color--mine-shaft,.02);
    }
    &.item {
      line-height: 1;
      padding: 10px 0;
      width: 14.28571429%;
      font-size: 1.05rem;
      text-align: center;
      background: $color--mine-shaft;
      color: $color--gallery;
      text-transform: uppercase;
      cursor: pointer;
      &.--current {
        color: $color--mine-shaft;
        background: lighten($color--gallery, 20%);
        flex: 1;
        cursor: initial;
        &:hover {
          text-decoration: none;
        }
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
