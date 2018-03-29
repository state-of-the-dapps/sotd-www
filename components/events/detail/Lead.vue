<template>
  <div class="wrapper -component-events-detail-lead">
    <div class="wrapper -intro-cta">
      <Intro/>
      <Cta/>
    </div>
    <ul class="list -categories">
      <li v-for="(category, index) in item.categories" :key="index" class="item -categories" :class="'--' + category"></li>
    </ul>
  </div>
</template>

<script>
  import Cta from '~/components/events/detail/lead/Cta.vue'
  import Intro from '~/components/events/detail/lead/Intro.vue'

  export default {
    components: {
      Cta,
      Intro
    },
    computed: {
      item () {
        return this.$store.getters['events/detail/item']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-intro-cta {
    &.wrapper {
      max-width: 2000px;
      margin: 0 auto;
      padding: 30px 40px;
      position: relative;
      background: lighten($color--gray, 100%);
      @include tweakpoint('min-width', 600px) {
        display: flex;
        align-items: center;
        > :nth-child(1) {
          flex-grow: 1;
        }
        > :nth-child(2) {
          margin-right: 10px;
        }
      }
      @include tweakpoint('min-width', 600px) {
        > :nth-child(2) {
          margin-right: 0;
        }
      }
    }
  }

  .-categories {
    &.list {
      display: flex;
      height: 5px;
      background: $color--black;
      @include tweakpoint('min-width', 600px) {
        height: 8px;
      }      
    }
    &.item {
      height: 100%;
      flex-grow: 1;
      &.--ico {
        background: $color--event-ico;
      }
      &.--hackathon {
        background: $color--event-hackathon;
      }
      &.--summit {
        background: $color--event-summit;
      }
      &.--crowdsale {
        background: $color--event-crowdsale;
      }
      &.--conference {
        background: $color--event-conference;
      }
      &.--meetup {
        background: $color--event-meetup;
      }
      &.--release {
        background: $color--event-release;
      }
      &.--workshop {
        background: $color--event-workshop;
      }
    }
  }

  .-component-events-detail-lead {
    &.wrapper {
      background: lighten($color--gray, 100%);
    }
  }
</style>
