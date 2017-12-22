<template>
  <transition name="fade">
    <div class="container -location-selection" v-on-clickaway="hide">
      <div class="selection">
        <div class="location">
          <input class="text-input" type="text" placeholder="Type in your city">
          <ul class="location-list">
            <li v-for="(option, index) in locationOptions" :key="index" class="location-item" @click="selectDistance(option)">{{ option }}</li>
          </ul>
        </div>
        <div class="distance">
          <h4 class="distance-heading">Within <span class="distance-units"><span class="distance-unit --is-selected" @click="selectDistanceUnit('miles')">Mi</span> <span class="distance-unit" @click="selectDistanceUnit('km')">Km</span></span></h4>
          <ul class="distance-list">
            <li v-for="(option, index) in distanceOptions" :key="index" class="distance-item" @click="selectDistance(option)">{{ option }} miles</li>
            <li class="distance-item" @click="selectDistance(null)">Any distance</li>
          </ul>
        </div>
      </div>
      <div class="actions">
        <button class="done">Done</button>
      </div>
    </div>
  </transition>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    data () {
      return {
        distanceOptions: [
          50,
          100,
          200,
          500
        ],
        locationOptions: [
          'London, UK',
          'London NJ, USA',
          'London MN, USA',
          'London AZ, USA'
        ]
      }
    },
    destroyed () {
      // reset tags and hide when a new route is activated (v-on-clickaway doesn't fire on route change)
      this.hide()
    },
    directives: {
      onClickaway: onClickaway
    },
    methods: {
      hide () {
        this.$store.dispatch('events/hideLocationSelection')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .actions {
    text-align: center;
  }

  .container {
    &.-location-selection {
      position: absolute;
      background: $color--gallery;
      padding: 10px;
      box-shadow: 0 17px 70px rgba($color--mine-shaft,.2);
      width: 300px;
      top: 65px;
      right: 10px;
      overflow: hidden;
      z-index: 10;
      @include tweakpoint('min-width', $tweakpoint--default) {
        top: 85px;
        right: 20px;
      }
    }
  }

  .done {
    display: block;
    cursor: pointer;
    margin: 0 auto;
    width: 100%;
    margin-top: 10px;
    border: none;
    background: rgba($color--mine-shaft, 1);
    box-shadow: 0 17px 70px rgba($color--mine-shaft, 0.3);
    color: $color--gallery;
    font-size: .9rem;
    font-weight: 600;
    padding: 6px;
    position: relative;
    transition: all .5s ease;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-left: 0;
      margin-right: 0;
    }
    &:active {
      top: 1px;
    }
  }

  .distance {
    border-left: 1px solid $color--mine-shaft;
    padding-left: 10px;
    margin-left: 10px;
  }

  .distance-heading {
    margin-top: 0;
    margin-bottom: .35rem;
    font-size: .8rem;
    text-transform: uppercase;
  }

  .distance-units {
    margin-left: 5px;
  }

  .distance-unit {
    font-weight: 600;
    display: inline-block;
    padding: 2px 3px;
    font-size: .8rem;
    cursor: pointer;
    &.--is-selected {
      background: $color--mine-shaft;
      color: $color--gallery;
    }
  }

  .distance-item {
    font-size: .8rem;
    font-weight: 600;
    padding: 4px 3px 4px 0;
    cursor: pointer;
    &.--is-selected {
      padding: 4px 3px;
      margin-left: -3px;
      background: $color--mine-shaft;
      color: $color--gallery;
    }
  }

  .selection {
    display: flex;
  }

  .location {
    flex: 1;
  }

  .location-list {
    margin-top: 10px;
  }

  .location-item {
    padding: 5px;
    font-size: .9rem;
    &:nth-child(odd) {
      background: rgba($color--mine-shaft,.075)
    }
    &.--is-selected {
      background: $color--mine-shaft;
      color: $color--gallery;
    }
  }

  .text-input {
    border: 1px solid rgba($color--mine-shaft, .2);
    padding: 5px;
    width: 100%;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
    background: lighten($color--gallery,100%);
    transition: background .2s ease;
    &:focus + .label,  &.--is-filled + .label {
      top: -11px;
      opacity: .65;
    }
  }
</style>
