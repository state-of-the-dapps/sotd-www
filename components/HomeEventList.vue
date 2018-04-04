<template>
  <div class="component-HomeEventList">
    <div class="wrapper">
      <div class="heading"><SvgIconCalendar/> <strong>Upcoming events</strong></div>
      <div class="event-list-wrapper">
        <span class="event-list">
          <strong>Mar 2</strong> &ndash; Some event &nbsp; &nbsp; &nbsp; &nbsp; 
          <strong>Mar 2</strong> &ndash; Some event &nbsp; &nbsp; &nbsp; &nbsp;
          <strong>Mar 2</strong> &ndash; Some event &nbsp; &nbsp; &nbsp; &nbsp;
          <strong>Mar 2</strong> &ndash; Some event &nbsp; &nbsp; &nbsp; &nbsp;
          <strong>Mar 2</strong> &ndash; Some event &nbsp; &nbsp; &nbsp; &nbsp;
          <strong>Mar 2</strong> &ndash; Some event &nbsp; &nbsp; &nbsp; &nbsp;
          <strong>Mar 2</strong> &ndash; Some event &nbsp; &nbsp; &nbsp; &nbsp;
          <strong>Mar 2</strong> &ndash; Some event &nbsp; &nbsp; &nbsp; &nbsp;
          <strong>Mar 2</strong> &ndash; Some event &nbsp; &nbsp; &nbsp; &nbsp;
          <strong>Mar 2</strong> &ndash; Some event &nbsp; &nbsp; &nbsp; &nbsp;
        </span>
      </div>
      <ul class="button-list">
        <li class="button-item"><nuxt-link class="button-link" :to="{ name: 'events' }">Upcoming events</nuxt-link></li>
        <li class="button-item"><nuxt-link class="button-link -submit" :to="{ name: 'events-new' }">Submit an event</nuxt-link></li>
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

.component-HomeEventList {
  margin-top: 10px;
  margin-bottom: 10px;
  white-space: nowrap;
  border-bottom: 1px solid rgba($color--black, .15);
  padding-bottom: 10px;
}

.component-SvgIconCalendar {
  position: relative;
  top: 0px;
  margin-right: 7px;
}

.button-item {
  width: 50%;
  text-align: center;
  margin: 0 5px;
  @include tweakpoint('min-width', 480px) {
    width: 40%;
    max-width: 164px;
  }
  @include tweakpoint('min-width', 834px) {
    width: 50%;
    margin: 0;
  }
}

.button-list {
  display: flex;
  margin: 0 -5px;
  @include tweakpoint('min-width', 834px) {
    margin: 0;
    padding-left: 15px;
  }
}

.button-link {
  display: block;
  padding: 7px 15px;
  text-decoration: none;
  background: $color--black;
  border: 1px solid $color--black;
  color: $color--white;
  &.-submit {
    color: $color--black;
    background: transparent;
    @include tweakpoint('min-width', 834px) {
      margin-left: 10px;
    }
  }
}

.event-item {
  flex: 0 0 auto;
  margin-right: 25px;
}

.event-list {
  padding: 15px 0;
  display: inline-block;
  padding-left: 100%;
  animation: scroll-left 60s linear infinite;
}

.event-list-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
  @include tweakpoint('min-width', 834px) {
    border-left: 1px solid rgba($color--black, .3);
    border-right: 1px solid rgba($color--black, .3);
  }  
}

.event-list::-webkit-scrollbar {
  display: none;
}

.heading {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.wrapper {
  @include margin-wrapper-main;
  margin-top: 10px;
  margin-bottom: 10px;
  @include tweakpoint('min-width', 834px) {
    display: flex;
    align-items: center;
  }
}

@keyframes scroll-left {
  0% { 
    transform: translateX(0%); 
  }
  100% { 
    transform: translateX(-100%); 
  }
}
</style>
