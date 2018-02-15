<template>
  <section class="wrapper -calendar">
    <div class="wrapper-inner -calendar">
      <ul class="list -month">
        <li class="item -month --prev" @click="changeMonth(-1)">
          <img class="image -month --prev" src="~/assets/images/arrows/back.png" width="12" />
        </li>
        <li class="item -month --current">
          <span class="date -month">{{ startOfMonthDate | formatDate('MMMM YYYY') }}</span>
        </li>
        <li class="item -month --next" @click="changeMonth(1)">
          <img class="image -month --next" src="~/assets/images/arrows/next.png" width="12" />
        </li>
      </ul>
      <ul class="list -day-label">
        <li v-for="(day, index) in daysOfTheWeek" :key="index" class="item -day-label">
          <span>{{ day }}</span>
        </li>
      </ul>
      <ul class="list -day">
        <li v-for="n in daysBeforeFirstDay" :key="n" class="item -day is-not-active"></li>
        <li v-for="(day, index) in days" :key="day.date" @click="selectDate(day.date)" class="item -day" :class="{ 'is-today': isToday(day.date), 'is-selected': isSelected(day.date) }">
          <span class="num -day">{{ index + 1 }}</span>
          <transition name="fade">
            <ul class="list -categories" v-if="day.categories && day.categories.length > 0">
              <li v-for="(category, index) in day.categories" :key="index" class="item -categories" :class="'--' + category"></li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  /* import axios from '~/helpers/axios' */
  import addDays from 'date-fns/add_days'
  import addMonths from 'date-fns/add_months'
  import formatDate from 'date-fns/format'
  import getDay from 'date-fns/get_day'
  import getDaysInMonth from 'date-fns/get_days_in_month'
  import startOfMonth from 'date-fns/start_of_month'
  import { daysOfTheWeek } from '~/helpers/constants'

  let setDayCategoriesTimer

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
      eventsFullQuery () {
        return this.$store.getters['events/list/fullQuery']
      },
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
        this.$store.dispatch('events/list/fetchItems')
      },
      setDayCategories () {
        /*
        axios
          .get('events/calendar', {
            params: this.eventsFullQuery
          })
          .then(response => {
            const data = response.data
            const items = data.items
            const days = this.days
            if (items.length > 0) {
              const daysWithCategories = days.map(day => {
                let itemWithCategories = items.find(function (obj) { return obj.date === day.date })
                if (itemWithCategories !== undefined) {
                  day.categories = itemWithCategories.categories
                } else {
                  day.categories = []
                }
                return day
              })
              this.days = daysWithCategories
            }
          })
          .catch((error) => {
            console.log(error)
          })
        */
      },
      setupMonth () {
        clearTimeout(setDayCategoriesTimer)
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
        setDayCategoriesTimer = setTimeout(() => {
          this.setDayCategories()
        }, 750)
      }
    },
    mounted () {
      this.initializeCalendar()
    },
    watch: {
      eventsFullQuery: {
        handler: function () {
          clearTimeout(setDayCategoriesTimer)
          setDayCategoriesTimer = setTimeout(() => {
            this.setDayCategories()
          }, 200)
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-calendar {
    &.wrapper {
      width: 100%;
      max-width: 350px;
      margin: 0 auto 20px;
      position: sticky;
      top: 19px;
      @include tweakpoint('min-width', $tweakpoint--default) {
        width: 350px;
      }
    }
    &.wrapper-inner {
      user-select: none;
      @include tweakpoint('min-width', $tweakpoint--default) {
        padding: 0 10px;
      }
    }
  }

  .-categories {
    &.list {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 4px;
      display: flex;
    }
    &.item {
      flex: 1;
      height: 100%;
      &.--ico {
        background: $color--event-crimson;
      }
      &.--hackathon {
        background: $color--event-orange;
      }
      &.--summit {
        background: $color--event-yellow;
      }
      &.--crowdsale {
        background: $color--event-green;
      }
      &.--conference {
        background: $color--event-aquamarine;
      }
      &.--meetup {
        background: $color--event-blue;
      }
      &.--release {
        background: $color--event-burple;
      },
      &.--workshop {
        background: $color--event-purple;
      }
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
      position: relative;
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
        position: relative;
        color: $color--gallery;
        &:before {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          background: $color--mine-shaft;
        }
        &:hover {
          text-decoration: none;
        }
      }
    }
    &.num {
      position: relative;
      z-index: 2;
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
    &.date {
      display: inline-block;
      position: relative;
      top: 1px;
    }
    &.list {
      display: flex;
      box-shadow: 0 0 5px rgba($color--mine-shaft,.02);
    }
    &.image {
      position: relative;
      top: 1px;
      &.--next {
        left: 0px;
      }
      &.--prev {
        right: 1px;
      }
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
        flex-grow: 1;
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
