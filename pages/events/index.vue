<template>
  <div>
    <Search/>
    <div class="results-filters">
      <div class="results">
        <CountRefine/>
        <Items/>
      </div>
      <div class="filters">
        <Calendar/>
      </div>
    </div>
    <Pager/>
    <nuxt-child/>
  </div>
</template>

<script>
  import Calendar from '~/components/events/list/Calendar.vue'
  import CountRefine from '~/components/events/list/CountRefine.vue'
  import Items from '~/components/events/list/Items.vue'
  import Pager from '~/components/events/list/Pager.vue'
  import Search from '~/components/events/list/Search.vue'

  export default {
    components: {
      Calendar,
      CountRefine,
      Items,
      Pager,
      Search
    },
    computed: {
      tabQuery () {
        return this.$store.getters['events/list/tabQuery']
      },
      eventCount () {
        return this.$store.getters['statEventCount']
      },
      tagQuery () {
        return this.$store.getters['events/list/tagQuery']
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'events')
      // this.$store.dispatch('events/list/setFriendlyQuery', this.$route.params)
      // this.$store.dispatch('events/list/setFriendlyUrl')
      // this.$store.dispatch('events/list/fetchItems')
    },
    watch: {
      'tagQuery': function () {
        this.$store.dispatch('events/list/setFriendlyUrl')
      },
      'tabQuery': function () {
        this.$store.dispatch('events/list/setFriendlyUrl')
      }
    },
    head () {
      return {
        title: 'State of the ÐApps — ' + this.eventCount + ' upcoming events'
      }
    },
    scrollToTop: false
  }
</script>
