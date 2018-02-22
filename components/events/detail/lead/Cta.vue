<template>
  <div v-if="item.siteUrls && item.siteUrls.website" class="wrapper -component-events-detail-lead-cta">
    <div>
      <a v-if="item.siteUrls.website" :href="item.siteUrls.website" @click="$mixpanel.track('Event - Site', { type: ['website'], url: item.siteUrls.website })" class="link -cta" target="_blank" :rel="'noopener noreferrer' + (item.nofollow ? ' nofollow' : '')">Visit Event Website</a>
    </div>
    <div>
      <!-- <span>Add to your calendar (<a class="link -calendar --ical" :href="item.calendarUrls.ical">iCal</a>, <a class="link -calendar --ics" :href="item.calendarUrls.ical">ICS</a>)</span> -->
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      item () {
        return this.$store.getters['events/detail/item']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-cta {
    &.link {
      position: relative;
      display: inline-block;
      margin: 10px 0 10px 6px;
      text-decoration: none;
      padding: 15px 25px;
      color: $color--gallery;
      background: $color--mine-shaft;
      box-shadow: 0 17px 70px rgba($color--mine-shaft,.4);
      @include tweakpoint('min-width', $tweakpoint--default) {
        padding: 20px 40px;
        font-size: 1.1rem;
      }
    }
  }

  .-component-events-detail-lead-cta {
    &.wrapper {
      text-align: center;
    }
  }
</style>
