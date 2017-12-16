<template>
  <div>
    <Lead/>
    <StatusSocial/>
    <MainInfo/>
    <Tools/>
    <Related/>
  </div>
</template>

<script>
  import axios from '~/helpers/axios'
  import MainInfo from '~/components/projects/detail/MainInfo.vue'
  import Lead from '~/components/projects/detail/Lead.vue'
  import Related from '~/components/projects/detail/Related.vue'
  import StatusSocial from '~/components/projects/detail/StatusSocial.vue'
  import Tools from '~/components/projects/detail/Tools.vue'

  export default {
    components: {
      MainInfo,
      Lead,
      Related,
      StatusSocial,
      Tools
    },
    computed: {
      item () {
        return this.$store.getters['projects/detail/item']
      },
      viewMethod () {
        return this.$store.getters['projects/detail/viewMethod']
      }
    },
    destroyed () {
      this.$store.dispatch('projects/detail/resetItem')
    },
    fetch ({ store, params, redirect, isServer, error }) {
      if (isServer) {
        return axios
          .get('projects/' + params.slug)
          .then(response => {
            const payload = response.data.payload
            const item = payload.item
            store.dispatch('projects/detail/setItem', item)
            if (!Object.keys(item).length > 0) {
              error({ statusCode: 404 })
            }
          })
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'projects')
      if (this.viewMethod === 'popup') {
        axios
          .get('projects/' + this.$route.params.slug)
          .then(response => {
            this.$store.dispatch('projects/detail/setItem', response.data)
          })
      }
      this.$mixpanel.track('Project - View', {
        targetProject: this.$route.params.slug,
        method: this.viewMethod
      })
      this.$store.dispatch('projects/detail/resetViewMethod')
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
