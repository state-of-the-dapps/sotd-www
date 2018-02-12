<template>
  <div class="item -component-events-form-fields-location">
    <div class="wrapper -location" @click="toggleDropdown">
      <img src="~/assets/images/icons/pin.png" width="16" class="pin -location"> <span v-if="location" class="link -location">{{ location.text | escapeHtmlTags }}</span><span v-else>Location <span class="required">(required)</span></span>
    </div>
    <transition name="fade">
      <div v-if="dropdownIsActive" v-on-clickaway="toggleDropdown" class="wrapper -dropdown">
        <input class="search-input -dropdown" type="text" v-model="locationSearchQuery" @input="fetchLocations" placeholder="Search for a city">
        <p v-if="locationSearchQuery.length < 3" class="location-instructions -dropdown">Enter at least 3 letters to search</p>
        <p v-if="locationSearchQuery.length >= 3 && locations.length === 0 && locationsAreLoading === false" class="location-instructions -dropdown">No locations were found. Check your city spelling, or try adding a state, province, or country.</p>
        <ul class="location-list -dropdown">
          <li v-for="(option, index) in locations" :key="index" class="location-item -dropdown" @click="selectLocation(option)" v-html="option.text"></li>
        </ul>
        <p v-if="locationsAreLoading" class="loader-wrapper -dropdown">
          <button class="loader -dropdown"></button>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
  import axios from '~/helpers/axios'
  import { directive as onClickaway } from 'vue-clickaway'
  import { dispatchErrors } from '~/helpers/mixins'

  let searchTimer

  export default {
    data () {
      return {
        dropdownIsActive: false,
        locations: [],
        locationsAreLoading: false,
        locationSearchQuery: ''
      }
    },
    computed: {
      location () {
        return this.$store.getters['events/form/location']
      }
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
                hitsPerPage: 10
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
                this.$mixpanel.track('Locations - Search', { query: this.locationSearchQuery, resultsCount: items.length, component: 'Event form' })
              })
          }, 750)
        } else {
          this.locations = []
          this.locationsAreLoading = false
        }
      },
      selectLocation (value) {
        const field = {
          name: 'location',
          value: {
            lat: value.lat,
            lon: value.lon,
            text: value.text
          }
        }
        const errors = {
          field: 'location',
          data: []
        }
        this.$store.dispatch('events/form/setField', field)
        this.dispatchErrors(errors, 'events')
        this.toggleDropdown()
      },
      toggleDropdown () {
        this.locations = []
        this.locationsAreLoading = false
        this.locationSearchQuery = ''
        this.dropdownIsActive = !this.dropdownIsActive
      }
    },
    directives: {
      onClickaway: onClickaway
    },
    mixins: [dispatchErrors]
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  .-component-events-form-fields-location {
    &.item {
      border: 1px solid transparent;
      position: relative;
    }
  }
  .-dropdown {
    &.wrapper {
      position: absolute;
      top: 60px;
      left: 0;
      z-index: 5;
      width: 100%;
      height: 200px;
      box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
      background: lighten($color--gallery, 100%);
      padding: 10px;
    }
    &.location-instructions {
      font-size: .85rem;
      padding: 0 5px;
    }
    &.search-input {
      border: 1px solid rgba(51,51,51,.2);
      padding: 5px;
      width: 100%;
      box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
      background: lighten($color--gallery, 100%);
      transition: background .2s ease;
    }
    &.location-list {
      overflow-y: scroll;
      margin-top: 10px;
      max-height: 140px;
    }
    &.location-item {
      padding: 5px;
      font-size: .9rem;
      cursor: pointer;
      &:nth-child(odd) {
        background: rgba($color--mine-shaft,.075);
      }
      &.--is-selected {
        background: $color--mine-shaft;
        color: $color--gallery;
      }
      &:hover {
        text-decoration: underline;
      }
    }
    &.loader-wrapper {
      margin-top: 1.25rem;
    }
  }
  .-location {
    &.wrapper {
      font-size: .95rem;
      z-index: 6;
      position: relative;
      cursor: pointer;
      border: none;
      padding: 0 50px 0 20px;
      width: 100%;
      height: 60px;
      box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
      background: rgba(lighten($color--gallery, 100%),.9);
      display: flex;
      align-items: center;
    }
    &.pin {
      margin-right: 10px;
    }
    &.link {
      text-decoration: underline;
    }
  }
</style>
