<template>
  <transition name="fade">
    <li class="item -events">
      <ul class="list -badges">
        Badges
      </ul>
      <div class="wrapper -main">
        <div class="wrapper -date">
          <div class="day -date">{{ item.date | formatDate('D') }}</div>
          <div class="month-year -date">{{ item.date | formatDate('MMM YYYY') }}</div>
        </div>
        <div class="wrapper -body">
          <h2 class="heading -body">{{ item.name }}</h2>
          <h3 class="sub-heading -body">
            in <span class="location -body">{{ item.location }}</span> <br/>added by <span class="name -body">{{ item.organizer }}</span>
          </h3>
          <p class="teaser -body">{{ item.teaser }}</p>
        </div>
      </div>
      <ul v-if="item.categories && item.categories.length > 0" class="list -categories">
        <li v-for="(category, index) in item.categories" :key="index" class="item -categories" :class="'--' + category">{{ category | formatEventCategory | capitalize }}</li>
      </ul>
    </li>
  </transition>
</template>

<script>
  export default {
    props: ['item']
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-badges {
    &.list {
      position: absolute;
      top: -2px;
      right: 10px;
    }
  }

  .-body {
    &.wrapper {
      padding: 0 20px;
      text-align: center;
    }
  }

  .-categories {
    &.list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      @include tweakpoint('min-width', $tweakpoint--default) {
        flex-direction: row;
      }
    }
    &.item {
      flex-grow: 1;
      height: 100%;
      text-align: center;
      padding: 8px;
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

  .-date {
    &.day {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 58px;
      font-size: 1.5rem;
    }
    &.month-year {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 17px;
      width: 100%;
      font-size: .75rem;
      font-weight: 600;
      background: darken($color--gallery, 5%);
      text-transform: uppercase;
    }
    &.wrapper {
      width: 75px;
      height: 75px;
      margin: 20px auto;
      background: $color--gallery;
    }
  }

  .-events {
    &.item {
      background: lighten($color--gallery, 100%);
      box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
      margin-bottom: 20px;
      padding: 20px;
      position: relative;
      overflow: auto;
    }
  }

  .-main {
    &.wrapper {
      @include tweakpoint('min-width', $tweakpoint--default) {
        display: flex;
      }
    }
  }
</style>
