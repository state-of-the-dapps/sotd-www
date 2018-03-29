<template>
  <transition name="fade">
    <div class="container -location-selection" v-if="isActive" v-on-clickaway="hide">
      <div class="selection">
        <div class="location">
          <input id="locationSearch" class="text-input" type="text" v-model="locationSearchQuery" @input="fetchLocations" placeholder="Search for a city">
          <p v-if="locationSearchQuery.length < 3" class="location-instructions">Enter at least 3 letters to search</p>
          <p v-if="locationSearchQuery.length >= 3 && locations.length === 0 && locationsAreLoading === false" class="location-instructions">No locations were found. Check your city spelling, or try adding a state, province, or country.</p>
          <ul class="location-list">
            <li v-for="(option, index) in locations" :key="index" class="location-item" :class="selectedLocation === option.text ? '--is-selected' : ''" @click="selectLocation(option)" v-html="option.text"></li>
          </ul>
          <p v-if="locationsAreLoading" class="loader-wrapper">
            <button class="loader"></button>
          </p>
        </div>
        <div class="radius">
          <h4 class="radius-heading">Within 
            <span class="radius-units">
              <span class="radius-unit" :class="selectedRadiusUnit === 'miles' ? '--is-selected' : ''" @click="selectRadiusUnit('miles')">Mi</span> 
              <span class="radius-unit" :class="selectedRadiusUnit === 'km' ? '--is-selected' : ''" @click="selectRadiusUnit('km')">Km</span>
            </span>
          </h4>
          <ul class="radius-list">
            <li v-for="(option, index) in radiusOptions" :key="index" class="radius-item" :class="selectedRadius === option ? '--is-selected' : ''" @click="selectRadius(option)">{{ option }} {{ selectedRadiusUnit }}</li>
            <li class="radius-item" @click="selectRadius(0)" :class="selectedRadius === 0 ? '--is-selected' : ''">Any distance</li>
          </ul>
        </div>
      </div>
      <div class="actions">
        <button class="done" @click="hide">Done</button>
      </div>
    </div>
  </transition>
</template>

<script>
  import axios from '~/helpers/axios'
  import { directive as onClickaway } from 'vue-clickaway'

  let searchTimer

  export default {
    props: {
      isActive: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    computed: {
      selectedRadius () {
        return this.$store.getters['events/list/locationRadiusQuery']
      },
      selectedRadiusUnit () {
        return this.$store.getters['events/list/locationRadiusUnitQuery']
      },
      selectedLocation () {
        return this.$store.getters['events/list/locationQuery']
      }
    },
    data () {
      return {
        radiusOptions: [
          50,
          100,
          200,
          500
        ],
        locations: [],
        locationsAreLoading: false,
        locationSearchQuery: ''
      }
    },
    directives: {
      onClickaway: onClickaway
    },
    methods: {
      fetchLocations () {
        clearTimeout(searchTimer)
        if (this.locationSearchQuery.length > 2) {
          this.locations = []
          this.locationsAreLoading = true
          searchTimer = setTimeout(() => {
            axios
              .post('https://places-dsn.algolia.net/1/places/query', {
                query: this.locationSearchQuery,
                type: 'city',
                hitsPerPage: 5
              })
              .then(response => {
                const data = response.data
                const items = data.hits || []
                if (items.length > 0) {
                  const formattedItems = []
                  for (let i = 0; i < items.length; i++) {
                    var text = ''
                    text += items[i]._highlightResult.locale_names.default[0].value + ', '
                    text += items[i]._highlightResult.administrative[0].value + ', '
                    text += items[i]._highlightResult.country.default.value
                    formattedItems.push({
                      lat: items[i]._geoloc.lat,
                      lon: items[i]._geoloc.lng,
                      text: text
                    })
                  }
                  this.locations = formattedItems
                }
                this.locationsAreLoading = false
                this.$mixpanel.track('Locations - Search', { query: this.locationSearchQuery, resultsCount: items.length, component: 'Event list' })
              })
          }, 750)
        } else {
          this.locations = []
          this.locationsAreLoading = false
        }
      },
      hide () {
        this.$emit('hide')
      },
      selectRadius (value) {
        this.$store.dispatch('events/list/setLocationRadiusQuery', value)
        this.$store.dispatch('events/list/fetchItems')
      },
      selectRadiusUnit (value) {
        this.$store.dispatch('events/list/setLocationRadiusUnitQuery', value)
        this.$store.dispatch('events/list/fetchItems')
      },
      selectLocation (value) {
        this.$store.dispatch('events/list/setLocationQuery', value)
        this.$store.dispatch('events/list/fetchItems')
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
      background: $color--gray;
      padding: 10px;
      box-shadow: 0 17px 70px rgba($color--black,.2);
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
    background: rgba($color--black, 1);
    box-shadow: 0 17px 70px rgba($color--black, 0.3);
    color: $color--gray;
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

  .radius {
    padding-left: 10px;
  }

  .radius-heading {
    margin-top: 0;
    margin-bottom: .35rem;
    font-size: .8rem;
    text-transform: uppercase;
  }

  .radius-units {
    margin-left: 5px;
  }

  .radius-unit {
    font-weight: 600;
    display: inline-block;
    padding: 2px 3px;
    font-size: .8rem;
    cursor: pointer;
    &.--is-selected {
      background: $color--black;
      color: $color--gray;
    }
    &:hover {
      text-decoration: underline;
    }
  }

  .radius-item {
    font-size: .8rem;
    font-weight: 600;
    padding: 4px 3px 4px 0;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    &.--is-selected {
      padding: 4px 3px;
      margin-left: -3px;
      background: $color--black;
      color: $color--gray;
    }
  }

  .selection {
    display: flex;
  }

  .loader {
    width: 15px;
    height: 15px;
  }

  .location {
    width: 190px;
    flex-grow: 1;
    padding-right: 10px;
    border-right: 1px solid $color--black;
  }

  .location-instructions {
    font-size: .85rem;
    padding: 0 5px;
  }

  .location-list {
    margin-top: 10px;
  }

  .location-item {
    padding: 5px;
    font-size: .9rem;
    cursor: pointer;
    &:nth-child(odd) {
      background: rgba($color--black,.075);
    }
    &.--is-selected {
      background: $color--black;
      color: $color--gray;
    }
    &:hover {
      text-decoration: underline;
    }
  }

  .loader-wrapper {
    margin-top: 1.25rem;
  }

  .text-input {
    border: 1px solid rgba($color--black, .2);
    padding: 5px;
    width: 100%;
    box-shadow: 0 0 20px rgba($color--black,.05);
    background: lighten($color--gray,100%);
    transition: background .2s ease;
    &:focus + .label,  &.--is-filled + .label {
      top: -11px;
      opacity: .65;
    }
  }
</style>
