<template>
  <div class="wrapper -component-events-detail-maininfo">
    <ul class="list -main">
      <li class="item -main --description">
        <p>{{ item.description }}</p>
      </li>
      <li v-if="item.highlights && item.highlights.length" class="item -main --schedule">
        <h2 class="heading -main">Schedule highlights</h2>
        <ul class="list -schedule">
          <li v-for="(highlight, index) in item.highlights" :key="index" class="item -schedule">{{ highlight }}</li>
        </ul>
      </li>
      <li v-if="item.sponsors && item.sponsors.length" class="item -main">
        <h3 class="sub-heading -main">Sponsored by</h3>
        <span v-for="(sponsor, index) in item.sponsors" :key="index">{{ sponsor }} <span v-if="index + 1 < item.sponsors.length"> / </span></span>
      </li>
    </ul>
    <ul class="list -sidebar">
      <li v-if="item.location && item.location.lat && item.location.lon && item.location.text" class="item -sidebar">
        <div class="wrapper -map">
          <img class="image -map" :src="'https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/' + item.location.lon + ',' + item.location.lat + ',5.67,0.00,0.00/440x400@2x?access_token=' + mapboxKey">
          <img class="pin -map" src="~/assets/images/icons/pin.png" width="20">
        </div>
        <span>{{ item.location.text }}</span>
      </li>
      <li class="item -sidebar">
        <h3 class="sub-heading -sidebar">Organized by</h3>
        <span>{{ item.organizer }}</span>
      </li>
      <li class="item -sidebar">
        <h3 class="sub-heading -sidebar">Languages</h3>
        <span v-for="(language, index) in item.languages" :key="index">{{ language }}<span v-if="index + 1 < item.languages.length">, </span></span>
      </li>
      <li class="item -sidebar">
        <h3 class="sub-heading -sidebar">Registration info</h3>
        <span>{{ item.registrationInfo }}</span>
      </li>
      <li v-if="tags && tags.length > 0" class="item -sidebar">
        <h3 class="sub-heading -sidebar">Tags</h3>
        <ul class="list -tags">
          <li v-for="(tag, index) in tags" :key="index" class="item -tags"><a class="sub-tag" @click="findEventsByTag(tag)">#{{ tag }}</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mapboxKey: process.env.mapboxKey
      }
    },
    computed: {
      friendlyUrl () {
        return this.$store.getters['events/list/friendlyUrl']
      },
      item () {
        return this.$store.getters['events/detail/item']
      },
      tags () {
        var tags
        tags = this.item.tags || []
        return this.$options.filters.removeEmptyArrayItems(tags)
      }
    },
    methods: {
      findEventsByTag (tag) {
        this.$store.dispatch('events/list/setActiveItemIndex', -1)
        this.$store.dispatch('events/list/resetQuery')
        this.$store.dispatch('tags/selectItem', tag)
        this.$store.dispatch('events/list/addTagToQuery', tag)
        this.$store.dispatch('events/list/fetchItems')
        this.$store.dispatch('events/list/setFriendlyUrl')
        this.$router.push(this.friendlyUrl, function () {
          document.getElementById('__nuxt').scrollIntoView()
        })
        this.$mixpanel.track('Event - Tag', { name: tag, slug: this.item.slug })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-component-events-detail-maininfo {
    &.wrapper {
      padding: 20px;
      max-width: 2000px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      @include tweakpoint('min-width', $tweakpoint--default) {
        flex-direction: row-reverse;
        padding-left: 160px;
        padding-right: 160px;
      }
    }
  }

  .-main {
    &.list {
      flex: 1;
    }
    &.heading {
      font-weight: 300;
      font-size: 1.4rem;
      margin: 0;
    }
    &.item {
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 0 20px rgba($color--mine-shaft, .1);
      &.--description {
        background: lighten($color--alabaster, 100%);
      }
      &.--schedule {
        background: lighten($color--alabaster, 100%);        
      }
      p {
        margin-top: 0;
        font-size: 1.2rem;
        line-height: 1.4;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    &.sub-heading {
      margin-top: 0;
      margin-bottom: .25rem;
      font-size: 1.15rem;
    }
  }

  .-schedule {
    &.list {
      margin-top: .5rem;
    }
    &.item {
      padding: .75rem 0;
      border-bottom: 1px solid rgba($color--mine-shaft, .1);
      position: relative;
      padding-left: 15px;
      &:last-child {
        border-bottom: none;
      }
      &:before {
        position: absolute;
        top: 50%;
        margin-top: -2px;
        left: 0;
        content: '';
        width: 5px;
        height: 5px;
        background: $color--mine-shaft;
        border-radius: 50%;
      }
    }
  }

  .-sidebar {
    &.list {
      @include tweakpoint('min-width', $tweakpoint--default) {
        width: 250px;
        margin-right: 20px;
      }
    }
    &.item {
      padding: 15px;
      margin-bottom: 20px;
      background: rgba($color--alabaster, .25);
      box-shadow: 0 0 20px rgba($color--mine-shaft, .1);
    }
    &.sub-heading {
      font-size: 1.15rem;
      margin: 0;
      margin-bottom: .25rem;
    }
  }

  .-map {
    &.image {
      max-width: 100%;
    }
    &.wrapper {
      position: relative;
      margin-bottom: 5px;
    }
    &.pin {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -10px;
      margin-top: -20px;
    }
  }

  .-tags {
    &.item {
      display: inline-block;
      padding: 1px 6px 1px 0;
    }
  }
</style>
