<template>
  <div class="component-HomeEventList">
    <div class="wrapper">
      <div class="heading"><SvgIconCalendar/> <strong>Upcoming events</strong></div>
      <ul class="event-list">
        <li class="event-item"><a href="#" class="event-link"><strong>Mar 2</strong> &ndash; Some event</a></li>

      </ul>
    </div>
  </div>
</template>

<script>
import SvgIconCalendar from '~/components/SvgIconCalendar'

export default {
  components: {
    SvgIconCalendar
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-SvgIconCalendar {
  position: relative;
  top: -2px;
  margin-right: 7px;
}

.event-link {
  text-decoration: none;
}

.heading {
  display: flex;
  align-items: center;
}

.wrapper {
  @include margin-wrapper-main;
  margin-top: 10px;
  margin-bottom: 10px;
  > div, > ul {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
