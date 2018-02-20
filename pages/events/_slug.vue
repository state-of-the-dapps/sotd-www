<template>
  <div>
    <Lead/>
    <CategoriesSocial/>
    <MainInfo/>
    <Tools/>
  </div>
</template>

<script>
  import axios from '~/helpers/axios'
  import MainInfo from '~/components/events/detail/MainInfo.vue'
  import Lead from '~/components/events/detail/Lead.vue'
  import CategoriesSocial from '~/components/events/detail/CategoriesSocial.vue'
  import Tools from '~/components/events/detail/Tools.vue'

  export default {
    components: {
      MainInfo,
      Lead,
      CategoriesSocial,
      Tools
    },
    computed: {
      item () {
        return this.$store.getters['events/detail/item']
      },
      viewMethod () {
        return this.$store.getters['events/detail/viewMethod']
      }
    },
    destroyed () {
      this.$store.dispatch('events/detail/resetItem')
    },
    fetch ({ store, params, redirect, isServer, error }) {
      if (isServer) {
        return axios
          .get('events/' + params.slug)
          .then(response => {
            const data = response.data
            const item = data.item
            store.dispatch('events/detail/setItem', item)
            if (!Object.keys(item).length > 0) {
              error({ statusCode: 404 })
            }
          })
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'events')
      if (this.viewMethod === 'popup') {
        axios
          .get('events/' + this.$route.params.slug)
          .then(response => {
            this.$store.dispatch('events/detail/setItem', response.data)
          })
      }
      this.$mixpanel.track('Event - View', {
        targetDapp: this.$route.params.slug,
        method: this.viewMethod
      })
      this.$store.dispatch('events/detail/resetViewMethod')
    },
    head () {
      return {
        title: this.item.name + ' — State of the ÐApps',
        meta: [
          { hid: 'description', name: 'description', content: this.item.teaser }
        ]
      }
    }
  }
</script>
