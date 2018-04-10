<template>
<div class="component-HomeEventList">
  <div class="wrapper">
    <div class="heading"><SvgIconCalendar/> <strong>Upcoming events</strong></div>
    <div class="event-list-wrapper">
      <span class="event-list">
        <span v-for="(event, index) in events" :key="index"><strong>{{ event.date | formatDate('MMM D') }}</strong> &ndash; {{ event.name }} &nbsp; &nbsp; &nbsp; &nbsp;</span> 
      </span>
    </div>
    <ul class="button-list">
      <li class="button-item"><nuxt-link class="button-link" :to="{ name: 'events' }" @click.native="trackHomeEventCta('view')">View all events</nuxt-link></li>
      <li class="button-item"><nuxt-link class="button-link -submit" :to="{ name: 'events-new' }" @click.native="trackHomeEventCta('submit')">Submit an event</nuxt-link></li>
    </ul>
  </div>
</div>
</template>

<script>
import { trackHomeEventCta } from '~/helpers/mixpanel'
import axios from '~/helpers/axios'
import formatDate from 'date-fns/format'
import SvgIconCalendar from './SvgIconCalendar'

export default {
  components: {
    SvgIconCalendar
  },
  data () {
    return {
      events: []
    }
  },
  methods: {
    trackHomeEventCta (targetCta) {
      const action = trackHomeEventCta(targetCta)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  mounted () {
    const limit = 10
    const dateStart = formatDate(Date.now(), 'YYYY-MM-DD')
    axios.get('events', {
      params: {
        dateStart,
        limit
      }
    })
    .then(response => {
      const data = response.data
      const items = data.items
      this.events = items
    })
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-HomeEventList {
  margin-top: 30px;
  white-space: nowrap;
  border-bottom: 1px solid rgba($color--black, .15);
  padding-bottom: 30px;
  @include tweakpoint('min-width', 834px) {
    margin-top: 10px;
    padding-bottom: 10px;
  }
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
    padding-left: 20px;
    width: 300px;
  }
}

.button-link {
  display: flex;
  justify-content: center;
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

$duration: 35s;

.event-list {
  padding: 15px 0;
  display: inline-block;
  padding-left: 100%;
    -webkit-animation-iteration-count: infinite; 
            animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
   -webkit-animation-name: ticker;
           animation-name: ticker;
    -webkit-animation-duration: $duration;
            animation-duration: $duration;
}

.event-list-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
  margin: 0 -10px;
  @include tweakpoint('min-width', 640px) {
    margin: 0 -20px;
  }
  @include tweakpoint('min-width', 834px) {
    margin: 0;
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
  margin-right: 20px;
}

.wrapper {
  @include margin-wrapper-main;
  @include tweakpoint('min-width', 834px) {
    display: flex;
    align-items: center;
  }
}

@keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
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
