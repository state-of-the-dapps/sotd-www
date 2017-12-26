<template>
  <section class="component -calendar">
    <div class="wrapper -calendar">
      <ul class="list -toolbar">
        <li class="item -toolbar"><span>Select today</span></li>
        <li class="item -toolbar"><span>Clear selection</span></li>
      </ul>
      <ul class="list -month">
        <li class="item -month --prev"><span>Nov</span></li>
        <li class="item -month --current"><span>December 2017</span></li>
        <li class="item -month --next"><span>Jan</span></li>
      </ul>
      <ul class="list -day-label">
        <li class="item -day-label"><span>Sun</span></li>
        <li class="item -day-label"><span>Mon</span></li>
        <li class="item -day-label"><span>Tue</span></li>
        <li class="item -day-label"><span>Wed</span></li>
        <li class="item -day-label"><span>Thu</span></li>
        <li class="item -day-label"><span>Fri</span></li>
        <li class="item -day-label"><span>Sat</span></li>
      </ul>
      <ul class="list -day">
        <li class="item -day is-not-active"></li>
        <li class="item -day is-not-active"></li>
        <li class="item -day is-not-active"></li>        
        <li class="item -day"><span>1</span></li>
        <li class="item -day"><span>2</span></li>
        <li class="item -day"><span>3</span></li>
        <li class="item -day is-today"><span>4</span></li>
        <li class="item -day"><span>5</span></li>
        <li class="item -day"><span>6</span></li>
        <li class="item -day"><span>7</span></li>
        <li class="item -day"><span>8</span></li>
        <li class="item -day"><span>9</span></li>
        <li class="item -day"><span>10</span></li>
        <li class="item -day"><span>11</span></li>
        <li class="item -day"><span>12</span></li>
        <li class="item -day"><span>13</span></li>
        <li class="item -day"><span>14</span></li>
        <li class="item -day"><span>15</span></li>
        <li class="item -day"><span>16</span></li>
        <li class="item -day"><span>17</span></li>
        <li class="item -day"><span>18</span></li>
      </ul>
    </div>
  </section>
</template>

<script>
  // import formatDate from 'date-fns/format'
  // import startOfMonth from 'date-fns/start_of_month'

  export default {
    data () {
      return {
        selectedMonth: '',
        selectedMonthNext: '',
        selectedMonthPrev: '',
        selectedMonthYear: '',
        selectedMonthDays: '',
        today: ''
      }
    },
    computed: {
      dateStartQuery () {
        return this.$store.getters['events/list/dateStartQuery']
      }
    },
    methods: {
      setCalendar (month, year) {
        const dateStartQuery = this.dateStartQuery
        console.log(dateStartQuery)
        // selected month
        // selected next month
        // selected prev month
        // selected year
        // today
      }
    },
    mounted () {
      this.setCalendar()
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
      &.is-not-active {
        background: none;
        border-color: transparent;
      }
      &.is-today {
        font-weight: 700;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .-day-label {
    &.list {
      display: flex;
      align-items: center;
      padding: 15px 0 5px;
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
      padding: 10px 11px;
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
        &:hover {
          text-decoration: none;
        }
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .-toolbar {
    &.list {
      display: flex;
      margin-bottom: 10px;
    }
    &.item {
      font-size: .9rem;
      width: 50%;
      cursor: pointer;
      &:last-child {
        text-align: right;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
