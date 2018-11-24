<template>
  <transition name="fade">
    <div 
      v-on-clickaway="hide" 
      v-if="isActive" 
      :class="'-' + type" 
      class="wrapper -component-shared-datepicker" 
      @click.stop="">
      <ul class="list -month">
        <li 
          class="item -month --prev" 
          @click="changeMonth(-1)">
          <img 
            class="image -month --prev" 
            src="~/assets/images/arrows/back.png" 
            width="10" >
        </li>
        <li class="item -month --current">
          <span class="date -month">{{ startOfMonthDate | formatDate('MMMM YYYY') }}</span>
        </li>
        <li 
          class="item -month --next" 
          @click="changeMonth(1)">
          <img 
            class="image -month --next" 
            src="~/assets/images/arrows/next.png" 
            width="10" >
        </li>
      </ul>
      <ul class="list -day-label">
        <li 
          v-for="(day, index) in daysOfTheWeek" 
          :key="index" 
          class="item -day-label">
          <span>{{ day }}</span>
        </li>
      </ul>
      <ul class="list -day">
        <li 
          v-for="n in daysBeforeFirstDay" 
          :key="n" 
          class="item -day is-not-active"/>
        <li 
          v-for="(day, index) in days" 
          :key="day.date" 
          :class="{ 'is-today': isToday(day.date), 'is-selected': isSelected(day.date) }" 
          class="item -day" 
          @click="selectDate(day.date)">
          <span class="num -day">{{ index + 1 }}</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'
import addDays from 'date-fns/add_days'
import addMonths from 'date-fns/add_months'
import formatDate from 'date-fns/format'
import getDay from 'date-fns/get_day'
import getDaysInMonth from 'date-fns/get_days_in_month'
import startOfMonth from 'date-fns/start_of_month'
import { daysOfTheWeek } from '~/helpers/constants'

export default {
  directives: {
    onClickaway: onClickaway
  },
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    parent: {
      type: String,
      required: true
    },
    selectedDate: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      days: [],
      daysOfTheWeek,
      daysBeforeFirstDay: '',
      startOfMonthDate: '',
      today: ''
    }
  },
  mounted() {
    this.initializeCalendar()
  },
  methods: {
    hide() {
      this.$emit('hide')
    },
    changeMonth(num) {
      this.startOfMonthDate = addMonths(this.startOfMonthDate, num)
      this.setupMonth()
    },
    initializeCalendar() {
      this.today = formatDate(Date.now(), 'YYYY-MM-DD')
      this.startOfMonthDate = this.selectedDate
        ? formatDate(startOfMonth(this.selectedDate), 'YYYY-MM-DD')
        : formatDate(startOfMonth(Date.now()), 'YYYY-MM-DD')
      this.setupMonth()
    },
    isSelected(date) {
      return this.selectedDate === date
    },
    isToday(date) {
      return this.today === date
    },
    selectDate(date) {
      this.$mixpanel.track('Date picker - Select date', { parent: this.parent })
      this.$emit('selectDate', date)
    },
    setupMonth() {
      this.days = []
      this.daysBeforeFirstDay = getDay(this.startOfMonthDate)
      const daysInMonth = getDaysInMonth(this.startOfMonthDate)
      let days = []
      let i = 0
      while (i < daysInMonth) {
        let currentDate = formatDate(
          addDays(this.startOfMonthDate, i),
          'YYYY-MM-DD'
        )
        days.push({
          date: currentDate
        })
        i++
      }
      this.days = days
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';
.-component-shared-datepicker {
  &.wrapper {
    position: absolute;
    // wrapper top/left/bottom/right positioning should be declared in the parent component
    background: url('~assets/images/bg.jpg') center center;
    background-size: 100px 100px;
    box-shadow: 0 0 20px rgba($color--black, 0.1);
    padding: 20px;
    cursor: initial;
    width: 275px;
  }
}

.-day {
  &.list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    filter: drop-shadow(0 0 10px rgba($color--black, 0.05));
  }
  &.item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    width: calc(14.28571429% - 1px);
    box-sizing: content-box;
    height: 33px;
    background: lighten($color--gray, 20%);
    border-right: 1px solid rgba($color--black, 0.1);
    border-top: 1px solid rgba($color--black, 0.1);
    user-select: none;
    cursor: pointer;
    &:nth-child(-n + 7) {
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
      color: $color--gray;
      &:before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background: $color--black;
      }
      &:hover {
        text-decoration: none;
      }
    }
  }
  &.num {
    position: relative;
    z-index: 2;
    font-size: 0.9rem;
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
    font-size: 0.75rem;
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
    box-shadow: 0 0 5px rgba($color--black, 0.02);
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
    line-height: 1.1;
    padding: 8px 0;
    width: 14.28571429%;
    font-size: 0.9rem;
    text-align: center;
    background: $color--black;
    color: $color--gray;
    text-transform: uppercase;
    user-select: none;
    cursor: pointer;
    &.--current {
      color: $color--black;
      background: lighten($color--gray, 20%);
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
