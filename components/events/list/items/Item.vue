<template>
  <transition name="fade" mode="out-in">
    <nuxt-link @click.native="setIndex(item, index)" tag="li" :to="{ name: 'events-slug-popup', params: { slug: item.slug } }" class="item -component-events-list-items-item" :key="item.slug">
      <div class="wrapper -main">
        <div class="wrapper -date">
          <div class="month-year -date">{{ item.date | formatDate('MMM YYYY') }}</div>
          <div class="day -date">{{ item.date | formatDate('D') }}</div>
        </div>
        <div class="wrapper -body">
          <h2 class="heading -body">{{ item.name }}</h2>
          <h3 v-if="item.locationText" class="sub-heading -body">
            in <span class="location -body">{{ item.locationText }}</span> <br/>organized by <span class="name -body">{{ item.organizer }}</span>
          </h3>
          <p class="teaser -body">{{ item.teaser }}</p>
        </div>
      </div>
      <ul v-if="item.categories && item.categories.length > 0" class="list -categories">
        <li v-for="(category, index) in item.categories" :key="index" class="item -categories" :class="'--' + category">{{ category | formatEventCategory | capitalize }}</li>
      </ul>
    </li>
    </nuxt-link>
  </transition>
</template>

<script>
  export default {
    props: ['item', 'index'],
    methods: {
      setIndex (item, index) {
        this.$store.dispatch('events/detail/setViewMethod', 'popup')
        this.$store.dispatch('events/list/setActiveItemIndex', index)
      }
    }
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
      @include tweakpoint('min-width', $tweakpoint--default) {
        flex-grow: 1;
        text-align: left;
        padding-left: 30px;
      }     
    }
    &.heading {
      margin: 0;
    }
    &.location {
      font-weight: 600;
    }
    &.name {
      font-weight: 600;
    }
    &.sub-heading {
      font-weight: 300;
      margin: 0;
      font-size: 1rem;
      line-height: 1.3;
    }
  }

  .-categories {
    &.list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin: 20px -20px -20px -20px;
      @include tweakpoint('min-width', $tweakpoint--default) {
        flex-direction: row;
      }
    }
    &.item {
      flex: 1;
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
      }
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
      font-size: .775rem;
      font-weight: 600;
      background: darken($color--gallery, 10%);
      text-transform: uppercase;
    }
    &.wrapper {
      min-width: 75px;
      width: 75px;
      height: 75px;
      margin: 0 auto 20px;
      background: $color--gallery;
      @include tweakpoint('min-width', $tweakpoint--default) {
        display: flex;
        flex-direction: column;
        margin: 0;
      }
    }
  }

  .-component-events-list-items-item {
    &.item {
      background: lighten($color--gallery, 100%);
      box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
      margin-bottom: 20px;
      padding: 20px;
      position: relative;
      overflow: auto;
      transition: transform .3s ease, opacity .3s ease;
      cursor: pointer;
      &:hover {
        transform: translateX(-4px);
      }
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
