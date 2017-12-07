<template>
  <div>
    <Search/>
    <div class="results-filters">
      <div class="results">
        <CountBrowse/>
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
  import CountBrowse from '~/components/events/list/CountBrowse.vue'
  import Items from '~/components/events/list/Items.vue'
  import Pager from '~/components/events/list/Pager.vue'
  import Search from '~/components/events/list/Search.vue'

  export default {
    components: {
      Calendar,
      CountBrowse,
      Items,
      Pager,
      Search
    },
    computed: {
      categoryQuery () {
        return this.$store.getters['events/list/categoryQuery']
      },
      eventCount () {
        return this.$store.getters['statEventsCount']
      },
      tagsQuery () {
        return this.$store.getters['events/list/tagsQuery']
      }
    },
    mounted () {
      // this.$store.dispatch('events/list/setFriendlyQuery', this.$route.params)
      // this.$store.dispatch('events/list/setFriendlyUrl')
      // this.$store.dispatch('events/list/fetchItems')
    },
    watch: {
      'tagsQuery': function () {
        this.$store.dispatch('events/list/setFriendlyUrl')
      },
      'categoryQuery': function () {
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
